package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Meeting;

import com.crm.backend.service.EmailService;

import com.crm.backend.service.MeetingService;

@RestController
@RequestMapping("/meetings")
@CrossOrigin("*")

public class MeetingController {

    @Autowired
    private MeetingService service;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Meeting> getMeetings() {

        return service.getAllMeetings();
    }

//    @PostMapping
//    public Meeting addMeeting(
//            @RequestBody Meeting meeting) {
//
//        Meeting savedMeeting =
//                service.saveMeeting(meeting);
//
//        String[] emailList =
//                meeting.getEmails().split(",");
//
//        emailService.sendMeetingMail(
//
//                emailList,
//
//                meeting.getTitle(),
//
//                meeting.getMeetingDate(),
//
//                meeting.getMeetingTime(),
//
//                meeting.getLocation()
//        );
//
//        return savedMeeting;
//    }

    @PostMapping
    public ResponseEntity<?> addMeeting(@RequestBody Meeting meeting) {
        try {
            Meeting savedMeeting = service.saveMeeting(meeting);
            System.out.println(meeting.getEmails());
            String[] emailList = meeting.getEmails().split(",");
            emailService.sendMeetingMail(
                    emailList,
                    meeting.getTitle(),
                    meeting.getMeetingDate(),
                    meeting.getMeetingTime(),
                    meeting.getLocation()
            );
            return ResponseEntity.ok(savedMeeting);
        } catch (Exception e) {
            e.printStackTrace(); // Check console for the real error
            return ResponseEntity.status(500).body("Meeting saved but email failed: " + e.getMessage());
        }
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

        Meeting updatedMeeting =
                service.updateMeeting(id, meeting);

        String[] emailList =
                meeting.getEmails().split(",");

        emailService.sendUpdateMail(
                emailList,
                meeting.getTitle(),
                meeting.getMeetingDate(),
                meeting.getMeetingTime(),
                meeting.getLocation()
        );

        return updatedMeeting;
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelMeeting(
            @PathVariable Long id
    ) {

        Meeting meeting =
                service.getMeetingById(id);

        String[] emailList =
                meeting.getEmails().split(",");

        emailService.sendCancelMail(
                emailList,
                meeting.getTitle(),
                meeting.getMeetingDate(),
                meeting.getMeetingTime(),
                meeting.getLocation()
        );

        meeting.setStatus("Cancelled");

        service.updateMeeting(id, meeting);

        return ResponseEntity.ok("Meeting Cancelled");
    }

}