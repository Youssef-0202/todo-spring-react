package com.usef.workshop.todo.controller.mapper;

import com.usef.workshop.todo.controller.dto.TaskDTO;
import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.exception.CategoryNotFoundException;
import com.usef.workshop.todo.repo.CategoryRepository;
import org.springframework.stereotype.Controller;

import java.util.UUID;

/**
 * @author HP
 **/

@Controller
public class TaskMapper {

    private final CategoryRepository categoryRepository;

    public TaskMapper(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public TaskDTO mapToDTO(Task task) {
        return TaskDTO.builder()
                .completed(task.getCompleted())
                .title(task.getTitle())
                .uuid(task.getUuid() != null ? task.getUuid().toString() : null)
                .description(task.getDescription())
                .priority(task.getPriority() != null ? task.getPriority().name() : null)
                .categoryName(task.getCategory() != null ? task.getCategory().getName() : null)
                .status(task.getStatus() != null ? task.getStatus().name() : null)
                .dueDate(task.getDueDate())
                .reminderDateTime(task.getReminderDateTime())
                .createdAt(task.getCreatedAt())
                .build();
    }

    public Task mapToEntity(TaskDTO dto) {
        if (dto == null) return null;

        Category category = null;

        if(dto.categoryName() != null){
             category = categoryRepository.findByName(dto.categoryName())
                    .orElseThrow(()-> new CategoryNotFoundException(dto.categoryName()));
        }

        Task task = new Task();
        if (dto.uuid() != null && !dto.uuid().isBlank()) {
            task.setUuid(UUID.fromString(dto.uuid()));
        }
        if (dto.completed() != null){
            task.setCompleted(dto.completed());
        }else {
            task.setCompleted(false);
        }

        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setPriority(dto.priority() != null ? Task.Priority.valueOf(dto.priority()) : null);
        task.setCategory(category);
        task.setStatus(dto.status() != null ? Task.Status.valueOf(dto.status()) : null);
        task.setDueDate(dto.dueDate());
        task.setReminderDateTime(dto.reminderDateTime());

        return task;
    }

}
