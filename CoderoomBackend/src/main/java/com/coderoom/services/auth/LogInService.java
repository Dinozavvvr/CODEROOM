package com.coderoom.services.auth;

import com.coderoom.dto.user.UserDto;
import com.coderoom.dto.user.UserLogInDto;

/**
 * created: 02-04-2021 - 16:59
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */

public interface LogInService {
    UserDto logIn(UserLogInDto userDto);
}
