package com.crm.backend.entity;

import jakarta.persistence.*;

@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)

    private Long id;

    private String title;

    private String meetingDate;

    private String meetingTime;

    private String emails;

    private String location;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(
            String meetingDate) {

        this.meetingDate = meetingDate;
    }

    public String getMeetingTime() {
        return meetingTime;
    }

    public void setMeetingTime(
            String meetingTime) {

        this.meetingTime = meetingTime;
    }

    public String getEmails() {
        return emails;
    }

    public void setEmails(
            String emails) {

        this.emails = emails;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(
            String location) {

        this.location = location;
    }
}