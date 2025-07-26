package com.usef.workshop.todo.exception;

/**
 * @author HP
 **/
public class InvalidTaskException extends RuntimeException{
    public InvalidTaskException(String message) {
        super(message);
    }
}
