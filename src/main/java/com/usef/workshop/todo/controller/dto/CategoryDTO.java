package com.usef.workshop.todo.controller.dto;

import lombok.Builder;

/**
 * @author HP
 **/
@Builder
public record CategoryDTO(
        String name
) {
}
