package com.usef.workshop.todo.repo;

import com.usef.workshop.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author HP
 **/
public interface TaskRepository extends JpaRepository<Task,Long> {
    Optional<Task> findByUuid(UUID uuid);

    Optional<Task> findByTitle(String title);

    List<Task> findByCategory_Name(String categoryName);
    List<Task> findByStatus(Task.Status status);
    List<Task> findByDueDate(LocalDate dueDate);
    List<Task> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String titleKeyword, String descKeyword);
    List<Task> findAllByOrderByCreatedAtAsc();

    void deleteByUuid(UUID uuid);

}
