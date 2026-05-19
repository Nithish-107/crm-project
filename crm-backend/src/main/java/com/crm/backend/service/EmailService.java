//package com.crm.backend.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    @Value("${spring.mail.username}")
//    private String fromEmail;
//
//    public void sendMeetingMail(
//
//            String[] emails,
//
//            String title,
//
//            String date,
//
//            String time,
//
//            String location
//    ) {
//
//        for(String email : emails) {
//
//            try {
//
//                SimpleMailMessage message =
//                        new SimpleMailMessage();
//
//                message.setFrom(fromEmail);
//
//                message.setTo(email.trim());
//
//                message.setSubject(
//                        "Meeting Invitation"
//                );
//
//                message.setText(
//
//                        "Meeting Details\n\n" +
//
//                                "Title : " + title + "\n" +
//
//                                "Date : " + date + "\n" +
//
//                                "Time : " + time + "\n" +
//
//                                "Location : " + location
//                );
//
//                mailSender.send(message);
//
//                System.out.println(
//                        "MAIL SENT TO : " + email
//                );
//
//            } catch (Exception e) {
//
//                System.out.println(
//                        "MAIL FAILED : " + email
//                );
//
//                e.printStackTrace();
//            }
//        }
//    }
//}


package com.crm.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    public void sendMeetingMail(String[] emails, String title,
                                String date, String time, String location) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        for (String email : emails) {
            Map<String, Object> body = new HashMap<>();
            body.put("sender", Map.of("name", "CRM TechNext", "email", "nithishkumarb107@gmail.com"));
            body.put("to", List.of(Map.of("email", email.trim())));
            body.put("subject", "Meeting: " + title);
            body.put("htmlContent",
                    "<h2>Meeting Scheduled</h2>" +
                            "<p><b>Title:</b> " + title + "</p>" +
                            "<p><b>Date:</b> " + date + "</p>" +
                            "<p><b>Time:</b> " + time + "</p>" +
                            "<p><b>Location:</b> " + location + "</p>"
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            try {
                restTemplate.postForEntity(
                        "https://api.brevo.com/v3/smtp/email", request, String.class
                );
                System.out.println("MAIL SENT: " + email);
            } catch (Exception e) {
                System.out.println("MAIL FAILED: " + email);
                e.printStackTrace();
            }
        }
    }
}