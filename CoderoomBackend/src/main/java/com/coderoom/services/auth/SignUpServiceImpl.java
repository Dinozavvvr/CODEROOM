package com.coderoom.services.auth;

import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.user.UserSignUpDto;
import com.coderoom.models.user.AccountData;
import com.coderoom.models.user.Role;
import com.coderoom.models.user.User;
import com.coderoom.repositories.RoleRepository;
import com.coderoom.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * created: 02-04-2021 - 17:01
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Service
public class SignUpServiceImpl implements SignUpService {

    @Value("${data.profile.profile-image.default-image}")
    private String DEFAULT_PROFILE_IMAGE;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto signUp(UserSignUpDto userDto) {

        if (usersRepository.findByNickname(userDto.getNickname()).isPresent()) {
            return null;
        }

        Role role = roleRepository.findByName(Role.Roles.VIEWER)
                .orElseThrow(IllegalStateException::new);

        String encodePassword = passwordEncoder.encode(userDto.getPassword());
        User newUser = User.builder()
                .email(userDto.getEmail())
                .password(encodePassword)
                .nickname(userDto.getNickname())
                .name(userDto.getName())
                .roles(Collections.singletonList(role))
                .surname(userDto.getSurname())
                .status(User.Status.SIMPLE)
                .state(User.State.ACTIVE)
                .accountData(AccountData.builder()
                        .profileImage(DEFAULT_PROFILE_IMAGE)
                        .build())
                .build();

        role.getUsers().add(newUser);

        return UserDto.from(usersRepository.saveAndFlush(newUser));
    }
}
