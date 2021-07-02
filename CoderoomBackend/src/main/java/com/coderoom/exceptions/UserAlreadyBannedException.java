package com.coderoom.exceptions;

/**
 * created: 10-04-2021 - 9:03
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class UserAlreadyBannedException extends RuntimeException {

    @Override
    public String getMessage() {
        return "user already banned";
    }

}
