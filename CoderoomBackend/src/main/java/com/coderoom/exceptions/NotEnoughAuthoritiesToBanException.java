package com.coderoom.exceptions;

/**
 * created: 10-04-2021 - 9:00
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class NotEnoughAuthoritiesToBanException extends RuntimeException {

    @Override
    public String getMessage() {
        return "not enough rights to ban user";
    }

}
