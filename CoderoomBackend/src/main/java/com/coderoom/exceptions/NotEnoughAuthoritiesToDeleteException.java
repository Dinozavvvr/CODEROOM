package com.coderoom.exceptions;

/**
 * created: 10-04-2021 - 8:58
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class NotEnoughAuthoritiesToDeleteException extends RuntimeException {

    @Override
    public String getMessage() {
        return "not enough rights to delete user";
    }

}
