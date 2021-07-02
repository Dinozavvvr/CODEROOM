package com.coderoom.services.auth;

import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.user.UserLogInDto;
import com.coderoom.models.user.User;
import com.coderoom.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * created: 02-04-2021 - 16:59
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class LogInServiceOldImpl implements LogInService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto logIn(UserLogInDto userDto) {
        User existsUser = usersRepository.findByNickname(userDto.getNickname())
                .orElseThrow(IllegalArgumentException::new);
        if (passwordEncoder.matches(userDto.getPassword(), existsUser.getPassword())) {
            return UserDto.from(existsUser);
        } else {
            return null;
        }
    }
}
