package com.coderoom.services.auth;

import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.user.UserSignUpDto;

/**
 * created: 02-04-2021 - 17:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface SignUpService {
    UserDto signUp(UserSignUpDto userDto);
}
