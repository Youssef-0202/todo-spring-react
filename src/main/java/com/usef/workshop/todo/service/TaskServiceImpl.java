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
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
    public Task updateByUuid(Task task) {
        Task loadedTask = taskRepository.findByUuid(task.getUuid())
                .orElseThrow(() -> new TaskNotFoundException(task.getUuid().toString()));

        // Copy only non-null properties from incoming `task` to `loadedTask`
        BeanUtils.copyProperties(task, loadedTask, getNullPropertyNames(task));

        return taskRepository.save(loadedTask);
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

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) {
                emptyNames.add(pd.getName());
            }
        }
        return emptyNames.toArray(new String[0]);
    }






}
