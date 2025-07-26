package com.usef.workshop.todo.controller.facade;

import com.usef.workshop.todo.controller.dto.TaskDTO;
import com.usef.workshop.todo.controller.mapper.TaskMapper;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author HP
 **/

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<Task> tasks = taskService.findAllOrderedByCreatedAt();

        return ResponseEntity.ok(tasks.stream().map(taskMapper::mapToDTO).collect(Collectors.toList()));
    }


    @GetMapping("/{uuid}")
    public ResponseEntity<TaskDTO> getTaskByUuid(@PathVariable String uuid) {
        Task task = taskService.findByUuid(uuid);
        return ResponseEntity.ok(taskMapper.mapToDTO(task));
    }


    @GetMapping("/search")
    public ResponseEntity<List<TaskDTO>> searchTasks(@RequestParam String keyword) {
        List<Task> results = taskService.searchByKeyword(keyword);
        return ResponseEntity.ok(results.stream().map(taskMapper::mapToDTO).collect(Collectors.toList()));
    }


    @GetMapping("/category/{name}")
    public ResponseEntity<List<TaskDTO>> getTasksByCategory(@PathVariable String name) {
        List<Task> tasks = taskService.findByCategory(name);
        return ResponseEntity.ok(tasks.stream().map(taskMapper::mapToDTO).collect(Collectors.toList()));
    }


    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        Task task = taskMapper.mapToEntity(taskDTO);
        return ResponseEntity.status(201).body(taskMapper.mapToDTO(taskService.saveTask(task)));
    }


    @PutMapping
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO taskDTO) {
        Task task = taskMapper.mapToEntity(taskDTO);
        Task updated = taskService.updateByUuid(task);
        return ResponseEntity.ok(taskMapper.mapToDTO(updated));
    }


    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteTask(@PathVariable String uuid) {
        taskService.deleteByUuid(uuid);
        return ResponseEntity.noContent().build();
    }

}
