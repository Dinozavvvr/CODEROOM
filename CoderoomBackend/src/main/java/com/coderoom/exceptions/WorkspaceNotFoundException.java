package com.coderoom.exceptions;

/**
 * created: 06-05-2021 - 17:15
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class WorkspaceNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return "workspace not found";
    }

}
