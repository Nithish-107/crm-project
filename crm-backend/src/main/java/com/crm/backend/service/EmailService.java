package com.crm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendMeetingMail(
            String[] emails,
            String title,
            String date,
            String time,
            String location
    ) {

        for(String email : emails) {

            try {

                SimpleMailMessage message =
                        new SimpleMailMessage();

                message.setFrom(fromEmail);

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

                System.out.println(
                        "MAIL SENT TO : " + email
                );

            } catch (Exception e) {

                System.out.println(
                        "MAIL FAILED : " + email
                );

                e.printStackTrace();
            }
        }
    }
}