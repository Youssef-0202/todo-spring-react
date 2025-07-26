package com.usef.workshop.todo.service;


import com.usef.workshop.todo.entity.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author HP
 **/

public interface TaskService {

    List<Task> findAllOrderedByCreatedAt();

    Task findByTitle(String title);

    List<Task> searchByKeyword(String keyword);

    Task findByUuid(String uuidString);

    void deleteByUuid(String uuidString);

    Task updateByUuid(Task taskDTO);

    Task saveTask(Task taskDTO);


    List<Task> findByCategory(String categoryName);
}
