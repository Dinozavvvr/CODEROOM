package com.coderoom.exceptions;

/**
 * created: 21-05-2021 - 22:23
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class WebWorkspaceNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return "web workspace not found";
    }

}
