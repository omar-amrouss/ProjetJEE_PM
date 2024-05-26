package com.dev.DevApp.exceptions;

import org.springframework.http.HttpStatus;

public class UserException {

    private String message;
    private Throwable cause;
    private HttpStatus httpStatus;

    public UserException(String message, Throwable cause, HttpStatus httpStatus) {
        this.message = message;
        this.cause = cause;
        this.httpStatus = httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getCause() {
        return cause;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
