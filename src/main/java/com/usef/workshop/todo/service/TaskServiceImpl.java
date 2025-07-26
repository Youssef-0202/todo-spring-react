package com.usef.workshop.todo.service;

import com.usef.workshop.todo.controller.dto.TaskDTO;
import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.exception.CategoryNotFoundException;
import com.usef.workshop.todo.exception.InvalidTaskException;
import com.usef.workshop.todo.exception.TaskNotFoundException;
import com.usef.workshop.todo.controller.mapper.TaskMapper;
import com.usef.workshop.todo.repo.CategoryRepository;
import com.usef.workshop.todo.repo.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * @author HP
 **/
@Slf4j
@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final TaskMapper taskMapper;


   @Override
    public List<Task> findAllOrderedByCreatedAt() {
        return taskRepository.findAllByOrderByCreatedAtAsc();
    }

    @Override
    public Task findByTitle(String title) {
        Task task = getTaskOrThrowByTitle(title);
        return task;
    }

    @Override
    public List<Task> searchByKeyword(String keyword) {
        return taskRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public Task findByUuid(String uuidString) {
        Task task = getTaskOrThrowByUuid(uuidString);
        return task;
    }

    @Override
    public void deleteByUuid(String uuidString){
        Task task = getTaskOrThrowByUuid(uuidString);
        taskRepository.delete(task);
    }

    @Override
    public Task updateByUuid(Task task){
        if (task.getCategory().getName() == null || task.getCategory().getName().isBlank()) {
            throw new InvalidTaskException("Category name is required.");
        }
        Task loadedTask = taskRepository.findByUuid(task.getUuid())
                .orElseThrow(() -> new TaskNotFoundException(task.getUuid().toString()));
        task.setId(loadedTask.getId());
        return taskRepository.save(task);
    }

    @Override
    public Task saveTask(Task task){
        Task saved = taskRepository.save(task) ;
        log.info("Creating new task with title: {}", task.getTitle());
        return saved;
    }

    @Override
    public List<Task> findByCategory(String categoryName) {
        return taskRepository.findByCategory_Name(categoryName);
    }


    private Task getTaskOrThrowByUuid(String uuidString) {
        UUID uuid = safeParseUuid(uuidString);
        return taskRepository.findByUuid(uuid)
                .orElseThrow(() -> {
                    log.warn("Task not found for uuid {}", uuidString);
                    return   new TaskNotFoundException(uuidString);
                });
    }

    private Task getTaskOrThrowByTitle(String title) {
        return taskRepository.findByTitle(title)
                .orElseThrow(() -> {
                    log.warn("Task not found for title {}", title);
                    return   new TaskNotFoundException(title);
                });
    }


    private UUID safeParseUuid(String uuidString) {
        try {
            return UUID.fromString(uuidString);
        } catch (IllegalArgumentException e) {
            throw new InvalidTaskException("Invalid UUID format: " + uuidString);
        }
    }






}
