package com.usef.workshop.todo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.NoArgsConstructor;

/**
 * @author HP
 **/

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cat_seq_gen")
    @SequenceGenerator(name = "cat_seq_gen", sequenceName = "cat_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    public Category(String name) {
        this.name = name;
    }

}
