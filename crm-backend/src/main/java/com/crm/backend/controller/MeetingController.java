package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Meeting;
import com.crm.backend.service.MeetingService;

@RestController
@RequestMapping("/meetings")
@CrossOrigin("*")

public class MeetingController {

    @Autowired
    private MeetingService service;

    @GetMapping
    public List<Meeting> getMeetings() {

        return service.getAllMeetings();
    }

    @PostMapping
    public Meeting addMeeting(
            @RequestBody Meeting meeting) {

        return service.saveMeeting(meeting);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(
            @PathVariable Long id) {

        service.deleteMeeting(id);
    }

    @PutMapping("/{id}")
    public Meeting updateMeeting(
            @PathVariable Long id,
            @RequestBody Meeting meeting
    ) {

        return service.updateMeeting(id, meeting);
    }
}