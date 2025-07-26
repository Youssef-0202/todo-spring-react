package com.usef.workshop.todo.repo;

import com.usef.workshop.todo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author HP
 **/
public interface CategoryRepository extends JpaRepository<Category,Long> {
    boolean existsByName(String name);

    Optional<Category> findByName(String name);
}
