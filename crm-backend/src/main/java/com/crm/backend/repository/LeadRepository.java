package com.crm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Lead;

public interface LeadRepository
        extends JpaRepository<Lead, Long> {
    Long countByStatus(String status);
}