package com.coderoom.services.users;

import com.coderoom.dto.user.SearchUserDto;
import com.coderoom.dto.user.UserDto;
import com.coderoom.exceptions.NotEnoughAuthoritiesToBanException;
import com.coderoom.exceptions.UserAlreadyActiveException;
import com.coderoom.exceptions.UserAlreadyBannedException;
import com.coderoom.exceptions.UserNotFoundException;
import com.coderoom.models.user.User;
import com.coderoom.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * created: 02-04-2021 - 16:48
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<UserDto> getAllUsers() {
        return UserDto.from(usersRepository.findAll());
    }

    @Override
    public List<UserDto> getAllBannedUsers() {
        return UserDto.from(usersRepository.findAllByState(User.State.BANNED));
    }

    @Override
    public List<UserDto> getAllActiveUsers() {
        return UserDto.from(usersRepository.findAllByState(User.State.ACTIVE));
    }

    @Override
    public User getUserByNickname(String nickname) {
        return usersRepository.findByNickname(nickname).orElse(null);
    }

    @Override
    public UserDto banUserById(Long id) {
        User banUser = usersRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        if (banUser.isAdmin()) {
            throw new NotEnoughAuthoritiesToBanException();
        } else if (banUser.isBanned()) {
            throw new UserAlreadyBannedException();
        }

        banUser.setState(User.State.BANNED);
        usersRepository.save(banUser);
        return UserDto.from(banUser);
    }

    @Override
    public UserDto unbanUser(Long id) {
        User activeUser = usersRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        if (activeUser.isActive()) {
            throw new UserAlreadyActiveException();
        }

        activeUser.setState(User.State.ACTIVE);
        usersRepository.save(activeUser);
        return UserDto.from(activeUser);
    }

    @Override
    public void banAll() {
        List<User> users = usersRepository.findAll();
        users.forEach(user -> {
                    if (!user.isAdmin())
                        user.setState(User.State.BANNED);
                }
        );
        usersRepository.saveAll(users);
    }

    @Override
    public void unbanAll() {
        List<User> users = usersRepository.findAll();
        users.forEach(user -> user.setState(User.State.ACTIVE));
        usersRepository.saveAll(users);
    }

    @Override
    public List<SearchUserDto> searchUsersByNickname(String nickname,
                                                     Integer page,
                                                     Integer countOnPage) {
        Pageable pageRequest = PageRequest.of(page, countOnPage);
        return SearchUserDto.from(
                usersRepository.findAllByNicknameStartsWithIgnoreCaseOrderByNicknameAsc(nickname, pageRequest));
    }

    @Override
    public UserDto getUser(Long id) {
        Optional<User> user = usersRepository.findById(id);

        if (user.isEmpty() || !user.get().isActive()) {
            throw new UserNotFoundException();
        }

        return UserDto.from(user.get());
    }


}
