package com.coderoom.exceptions;

/**
 * created: 05-05-2021 - 18:24
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class LanguageNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return "Language not found";
    }

}
