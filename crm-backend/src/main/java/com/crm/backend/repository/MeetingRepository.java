package com.crm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Meeting;

public interface MeetingRepository
        extends JpaRepository<Meeting, Long> {

}