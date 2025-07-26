package com.usef.workshop.todo.controller.facade;

import com.usef.workshop.todo.exception.CategoryNotFoundException;
import com.usef.workshop.todo.exception.InvalidTaskException;
import com.usef.workshop.todo.exception.TaskAlreadyExist;
import com.usef.workshop.todo.exception.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * @author HP
 **/
@ControllerAdvice
public class TaskExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleTaskNotFound(TaskNotFoundException ex) {
        return buildResponse(ex.getMessage(), ex, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCategoryNotFound(CategoryNotFoundException ex) {
        return buildResponse(ex.getMessage(), ex, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidTaskException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidTask(InvalidTaskException ex) {
        return buildResponse(ex.getMessage(), ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleOther(Exception ex) {
        return buildResponse("Erreur interne du serveur", ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(TaskAlreadyExist.class)
    public ResponseEntity<ApiErrorResponse> handleTaskAlreadyExist(TaskAlreadyExist ex) {
        return buildResponse(ex.getMessage(), ex, HttpStatus.CONFLICT);
    }



    private ResponseEntity<ApiErrorResponse> buildResponse(String message, Exception ex, HttpStatus status) {
        return ResponseEntity.status(status).body(
                new ApiErrorResponse(message, ex.getClass().getSimpleName(), status.value())
        );
    }



    record ApiErrorResponse (
             String message,
             String error,
             int status
    ){}
}
