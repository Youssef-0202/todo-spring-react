package com.usef.workshop.todo;

import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.entity.Task;
import com.usef.workshop.todo.exception.InvalidTaskException;
import com.usef.workshop.todo.exception.TaskNotFoundException;
import com.usef.workshop.todo.repo.CategoryRepository;
import com.usef.workshop.todo.repo.TaskRepository;
import com.usef.workshop.todo.service.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Unit Test for TaskService.
 * Principles:
 * 1. Fast: No Spring Context (@SpringBootTest is removed).
 * 2. Isolated: We mock the Repository.
 * 3. Focused: We test ONLY the Service logic.
 */
@ExtendWith(MockitoExtension.class)
class TaskServiceUnitTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CategoryRepository categoryRepository;

    // We inject the mocks into the implementation directly
    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private UUID uuid;
    private Category category;

    @BeforeEach
    void setUp() {
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
    }

    @Test
    @DisplayName("Should return Task when it exists")
    void findByUuid_WhenTaskExists_ReturnsTask() {
        // Arrange
        when(taskRepository.findByUuid(uuid)).thenReturn(Optional.of(task));

        // Act
        // Service returns Task, not TaskDTO!
        Task result = taskService.findByUuid(uuid.toString());

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getUuid()).isEqualTo(uuid);
        assertThat(result.getTitle()).isEqualTo("Test Task");

        verify(taskRepository).findByUuid(uuid);
    }

    @Test
    @DisplayName("Should throw exception when Task does not exist")
    void findByUuid_WhenTaskDoesNotExist_ThrowsException() {
        // Arrange
        when(taskRepository.findByUuid(uuid)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> taskService.findByUuid(uuid.toString()))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining(uuid.toString());
    }

    @Test
    @DisplayName("Should throw exception when UUID is invalid")
    void findByUuid_WhenInvalidUuid_ThrowsException() {
        // Arrange
        String invalidUuid = "not-a-uuid";

        // Act & Assert
        // No mock needed here because the service validates before calling repo
        assertThatThrownBy(() -> taskService.findByUuid(invalidUuid))
                .isInstanceOf(InvalidTaskException.class)
                .hasMessageContaining("Invalid UUID format");
    }

    @Test
    @DisplayName("Should return list of tasks ordered by creation date")
    void findAllOrderedByCreatedAt_ReturnsList() {
        // Arrange
        Task task2 = Task.builder()
                .id(2L)
                .uuid(UUID.randomUUID())
                .title("Task 2")
                .createdAt(LocalDateTime.now().plusHours(1))
                .build();

        when(taskRepository.findAllByOrderByCreatedAtAsc()).thenReturn(List.of(task, task2));

        // Act
        List<Task> result = taskService.findAllOrderedByCreatedAt();

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).extracting(Task::getTitle)
                .containsExactly("Test Task", "Task 2");
    }
}
