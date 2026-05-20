package com.crm.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    public void sendMeetingMail(
            String[] emails,
            String title,
            String date,
            String time,
            String location
    ) {

        RestTemplate restTemplate =
                new RestTemplate();

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "api-key",
                apiKey
        );

        for (String email : emails) {

            Map<String, Object> body =
                    new HashMap<>();

            body.put(
                    "sender",
                    Map.of(
                            "name", "CRM TechNext",
                            "email", "nithishkumarb107@gmail.com"
                    )
            );

            body.put(
                    "to",
                    List.of(
                            Map.of(
                                    "email",
                                    email.trim()
                            )
                    )
            );

            body.put(
                    "subject",
                    "Meeting Invitation"
            );

            body.put(
                    "htmlContent",

                    "<h2>Meeting Scheduled</h2>" +

                            "<p><b>Title:</b> " + title + "</p>" +

                            "<p><b>Date:</b> " + date + "</p>" +

                            "<p><b>Time:</b> " + time + "</p>" +

                            "<p><b>Location:</b> " + location + "</p>"
            );

            HttpEntity<Map<String, Object>>
                    request =
                    new HttpEntity<>(body, headers);

            try {

                ResponseEntity<String> response =
                        restTemplate.postForEntity(
                                "https://api.brevo.com/v3/smtp/email",
                                request,
                                String.class
                        );

                System.out.println(
                        "MAIL SENT TO : " + email
                );

                System.out.println(
                        response.getBody()
                );

            } catch (Exception e) {

                System.out.println(
                        "MAIL FAILED : " + email
                );

                System.out.println(
                        e.getMessage()
                );

                e.printStackTrace();
            }
        }
    }
}