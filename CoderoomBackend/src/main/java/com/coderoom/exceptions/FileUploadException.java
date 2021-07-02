package com.coderoom.exceptions;

/**
 * created: 25-04-2021 - 15:48
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class FileUploadException extends RuntimeException {

    private final String message;

    public FileUploadException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
