package com.crm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Deal;

public interface DealRepository
        extends JpaRepository<Deal, Long> {
}