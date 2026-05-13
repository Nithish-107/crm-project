package com.crm.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Activity;

public interface ActivityRepository
        extends JpaRepository<Activity, Long> {

    List<Activity>
    findTop5ByOrderByCreatedAtDesc();

}