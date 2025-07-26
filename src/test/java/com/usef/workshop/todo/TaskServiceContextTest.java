package com.usef.workshop.todo;

import com.usef.workshop.todo.controller.dto.TaskDTO;
import com.usef.workshop.todo.controller.mapper.TaskMapper;
import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.exception.InvalidTaskException;
import com.usef.workshop.todo.exception.TaskNotFoundException;
import com.usef.workshop.todo.repo.CategoryRepository;
import com.usef.workshop.todo.repo.TaskRepository;
import com.usef.workshop.todo.service.TaskService;
import com.usef.workshop.todo.service.TaskServiceImpl;
import jakarta.inject.Inject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * @author HP
 **/
@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TaskServiceContextTest {
    // --------------- initiation ----------------------
    @Autowired
    private TaskService taskService;

    @Test
    void contextLoadsAndTaskServiceIsNotNull(){
        assertThat(taskService).isNotNull();
    }

    // ------------------ unitaire test -----------------

    @Mock
    private TaskRepository taskRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskServiceImpl taskServiceImpl;

    private Task task;
    private TaskDTO taskDTO;
    private UUID uuid;
    private Category category;

    @BeforeEach
    void setUp(){
        uuid = UUID.randomUUID();
        category = new Category();
        category.setId(1L);
        category.setName("Work");

        task = Task.builder()
                .id(1L)
                .uuid(uuid)
                .title("Test Task")
                .description("Description")
                .priority(Task.Priority.MEDIUM)
                .status(Task.Status.TODO)
                .category(category)
                .dueDate(LocalDate.now())
                .createdAt(LocalDateTime.now())
                .build();

        taskDTO = new TaskDTO(
                uuid.toString(),
                "Test Task",
                "Description",
                "MEDIUM",
                "Work",
                "TODO",
                LocalDate.now(),
                null,
                task.getCreatedAt()
        );
    }

    @Test
    void findByUuid_WhenTaskExists_ReturnsTaskDTO(){

        // Arrange
        when(taskRepository.findByUuid(uuid)).thenReturn(Optional.of(task));
        when(taskMapper.mapToDTO(task)).thenReturn(taskDTO);

        // Act
        TaskDTO result = taskService.findByUuid(uuid.toString());

        // Assert
        assertThat(result)
                .isNotNull()
                .satisfies(dto ->{
                    assertThat(dto.uuid()).isEqualTo(uuid.toString());
                    assertThat(dto.title()).isEqualTo("Test Task");
                    assertThat(dto.priority()).isEqualTo("MEDIUM");
                    assertThat(dto.categoryName()).isEqualTo("Work");
                    assertThat(dto.status()).isEqualTo("TODO");
                });
        verify(taskRepository).findByUuid(uuid);
        verify(taskMapper).mapToDTO(task);
    }

    @Test
    void findByUuid_WhenTaskDoesNotExist_ThrowsTaskNotFoundException() {
        // Arrange
        when(taskRepository.findByUuid(uuid)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> taskService.findByUuid(uuid.toString()))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining(uuid.toString());
        verify(taskRepository).findByUuid(uuid);
    }

    @Test
    void findByUuid_WhenInvalidUuid_ThrowsInvalidTaskException() {
        // Arrange
        String invalidUuid = "not-a-uuid";

        // Act & Assert
        assertThatThrownBy(() -> taskService.findByUuid(invalidUuid))
                .isInstanceOf(InvalidTaskException.class)
                .hasMessageContaining("Invalid UUID format: " + invalidUuid);
    }

    @Test
    void findAllOrderedByCreatedAt_ReturnsTaskDTOList() {
        // Arrange
        Task task2 = Task.builder()
                .id(2L)
                .uuid(UUID.randomUUID())
                .title("Task 2")
                .description("Another task")
                .priority(Task.Priority.HIGH)
                .status(Task.Status.IN_PROGRESS)
                .category(category)
                .dueDate(LocalDate.now().plusDays(1))
                .createdAt(LocalDateTime.now().plusHours(1))
                .build();
        TaskDTO taskDTO2 = new TaskDTO(
                task2.getUuid().toString(),
                "Task 2",
                "Another task",
                "HIGH",
                "Work",
                "IN_PROGRESS",
                LocalDate.now().plusDays(1),
                null,
                task2.getCreatedAt()
        );
        List<Task> tasks = List.of(task, task2);
        List<TaskDTO> taskDTOs = List.of(taskDTO, taskDTO2);

        when(taskRepository.findAllByOrderByCreatedAtAsc()).thenReturn(tasks);
        when(taskMapper.mapToDTO(task)).thenReturn(taskDTO);
        when(taskMapper.mapToDTO(task2)).thenReturn(taskDTO2);

        // Act
        List<TaskDTO> result = taskService.findAllOrderedByCreatedAt();

        // Assert
        assertThat(result)
                .hasSize(2)
                .containsExactly(taskDTO, taskDTO2)
                .extracting(TaskDTO::title)
                .containsExactly("Test Task", "Task 2");
        verify(taskRepository).findAllByOrderByCreatedAtAsc();
    }


}
