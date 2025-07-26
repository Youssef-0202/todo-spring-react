package com.usef.workshop.todo.config;

import com.usef.workshop.todo.entity.Category;
import com.usef.workshop.todo.repo.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author HP
 **/
@Component
@Order(1)
@Slf4j
public class CategoryInitializer implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    public CategoryInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<String> defaultCategories = List.of(
                "Work", "Personal", "Shopping", "Health", "Learning", "Other"
        );

        defaultCategories.forEach(name -> {
            categoryRepository.findByName(name).orElseGet(() -> {
                return categoryRepository.save(new Category(name));
            });
        });

        log.info("Sample categories inserted");
    }
}
