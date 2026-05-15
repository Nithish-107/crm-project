package com.crm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMeetingMail(

            String[] emails,

            String title,

            String date,

            String time,

            String location
    ) {

        for(String email : emails) {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setTo(email.trim());

            message.setSubject(
                    "Meeting Invitation"
            );

            message.setText(

                    "Meeting Details\n\n" +

                            "Title : " + title + "\n" +

                            "Date : " + date + "\n" +

                            "Time : " + time + "\n" +

                            "Location : " + location
            );

            mailSender.send(message);
        }
    }
}