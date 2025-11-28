package com.usef.workshop.todo.controller.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author HP
 **/

@Builder
public record TaskDTO(
        String uuid,
        String title,
        String description,
        String priority,
        String categoryName,
        Boolean completed,
        String status,
        LocalDate dueDate,
        LocalDateTime reminderDateTime,
        LocalDateTime createdAt
) {
}
