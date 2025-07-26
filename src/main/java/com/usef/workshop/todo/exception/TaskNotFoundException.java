package com.usef.workshop.todo.exception;

/**
 * @author HP
 **/
public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(String uuid) {
        super("Task not found with uuid: " + uuid);
    }
}
