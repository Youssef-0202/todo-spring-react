package com.usef.workshop.todo.config;

import com.usef.workshop.todo.controller.dto.TaskDTO;
import com.usef.workshop.todo.controller.mapper.TaskMapper;
import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.repo.CategoryRepository;
import com.usef.workshop.todo.repo.TaskRepository;
import com.usef.workshop.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author HP
 **/
@Component
@Order(2)
@Slf4j
public class TaskDataInitializer implements CommandLineRunner {

    private final TaskRepository taskRepository;
    private final TaskService taskService;

    private final TaskMapper taskMapper;
    private final CategoryRepository categoryRepo;

    public TaskDataInitializer(TaskRepository taskRepository, TaskService taskService, TaskMapper taskMapper, CategoryRepository categoryRepo) {
        this.taskRepository = taskRepository;
        this.taskService = taskService;
        this.taskMapper = taskMapper;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        List<TaskDTO> tasks = List.of(
                TaskDTO.builder()
                        .title("Finish project report")
                        .description("Complete the final report and send it to the manager.")
                        .priority("HIGH")
                        .categoryName("Work")
                        .status("IN_PROGRESS")
                        .dueDate(LocalDate.of(2025, 7, 28))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 27, 10, 0))
                        .createdAt(LocalDateTime.now())
                        .build(),

                TaskDTO.builder()
                        .title("Buy groceries")
                        .description("Milk, eggs, bread, fruits.")
                        .priority("MEDIUM")
                        .categoryName("Shopping")
                        .status("TODO")
                        .dueDate(LocalDate.of(2025, 7, 26))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 25, 17, 0))
                        .createdAt(LocalDateTime.now())
                        .build(),

                TaskDTO.builder()
                        .title("Gym session")
                        .description("Leg day workout at the gym.")
                        .priority("LOW")
                        .categoryName("Health")
                        .status("TODO")
                        .dueDate(LocalDate.of(2025, 7, 26))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 26, 7, 30))
                        .createdAt(LocalDateTime.now())
                        .build(),

                TaskDTO.builder()
                        .title("Read 'Clean Code'")
                        .description("Read chapters 3 and 4 of Clean Code.")
                        .priority("MEDIUM")
                        .categoryName("Learning")
                        .status("IN_PROGRESS")
                        .dueDate(LocalDate.of(2025, 7, 29))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 28, 21, 0))
                        .createdAt(LocalDateTime.now())
                        .build(),

                TaskDTO.builder()
                        .title("Call mom")
                        .description("Catch up with mom this weekend.")
                        .priority("LOW")
                        .categoryName("Personal")
                        .status("DONE")
                        .dueDate(LocalDate.of(2025, 7, 27))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 27, 18, 0))
                        .createdAt(LocalDateTime.now())
                        .build(),

                TaskDTO.builder()
                        .title("Organize digital files")
                        .description("Clean up downloads folder and sort documents.")
                        .priority("LOW")
                        .categoryName("Other")
                        .status("TODO")
                        .dueDate(LocalDate.of(2025, 7, 30))
                        .reminderDateTime(LocalDateTime.of(2025, 7, 29, 16, 0))
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        tasks.forEach(taskDto -> {
                Task task = taskMapper.mapToEntity(taskDto);
            taskRepository.findByTitle(task.getTitle()).orElseGet(() -> {
                return taskService.saveTask(task);
            });

        });

        log.info("Sample tasks inserted");
    }

}
