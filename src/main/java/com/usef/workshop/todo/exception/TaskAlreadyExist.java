package com.usef.workshop.todo.exception;

/**
 * @author HP
 **/
public class TaskAlreadyExist extends RuntimeException {
    public TaskAlreadyExist(String uuid) {
        super("Task with uuid "+ uuid +" is already exist .");
    }
}
