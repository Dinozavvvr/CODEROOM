package com.coderoom.exceptions;

/**
 * created: 14-05-2021 - 19:26
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class RoomNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return "workspace not found";
    }

}
