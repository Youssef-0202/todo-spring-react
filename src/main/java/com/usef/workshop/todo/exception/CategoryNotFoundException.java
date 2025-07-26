package com.usef.workshop.todo.exception;

/**
 * @author HP
 **/
public class CategoryNotFoundException extends RuntimeException{
    public CategoryNotFoundException(String name) {
        super("Category not found with name: " + name);
    }
}
