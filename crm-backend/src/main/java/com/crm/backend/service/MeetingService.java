package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Meeting;
import com.crm.backend.repository.MeetingRepository;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository repository;

    public List<Meeting> getAllMeetings() {

        return repository.findAll();
    }

    public Meeting saveMeeting(
            Meeting meeting) {

        return repository.save(meeting);
    }

    public void deleteMeeting(Long id) {

        repository.deleteById(id);
    }

    public Meeting updateMeeting(
            Long id,
            Meeting updatedMeeting
    ) {

        Meeting meeting =
                repository.findById(id)
                        .orElse(null);

        if(meeting != null) {

            meeting.setTitle(
                    updatedMeeting.getTitle()
            );

            meeting.setMeetingDate(
                    updatedMeeting.getMeetingDate()
            );

            meeting.setMeetingTime(
                    updatedMeeting.getMeetingTime()
            );

            meeting.setEmails(
                    updatedMeeting.getEmails()
            );

            meeting.setLocation(
                    updatedMeeting.getLocation()
            );

            meeting.setStatus(
                    updatedMeeting.getStatus()
            );

            return repository.save(meeting);
        }

        return null;
    }

    public Meeting getMeetingById(Long id) {

        return repository.findById(id)
                .orElseThrow();
    }
}