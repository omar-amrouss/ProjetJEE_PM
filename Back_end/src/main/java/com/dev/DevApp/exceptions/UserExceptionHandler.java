package com.dev.DevApp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = {UserNotFoundException.class})

    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException userNotFoundException){
          UserException userException = new UserException(userNotFoundException.getMessage(),
                  userNotFoundException.getCause(),HttpStatus.NOT_FOUND);

          return new ResponseEntity<>(userException,HttpStatus.NOT_FOUND);


    }



}
