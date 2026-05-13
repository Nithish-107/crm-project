package com.crm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Task;

public interface TaskRepository
        extends JpaRepository<Task, Long> {
    Long countByStatus(String status);
}