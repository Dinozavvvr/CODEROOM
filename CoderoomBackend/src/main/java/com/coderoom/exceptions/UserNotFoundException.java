package com.coderoom.exceptions;

/**
 * created: 07-05-2021 - 22:13
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class UserNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return "user not found";
    }

}
