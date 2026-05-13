package com.crm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crm.backend.dto.LoginRequest;
import com.crm.backend.dto.RegisterRequest;
import com.crm.backend.entity.User;
import com.crm.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private ActivityService activityService;


    public String register(RegisterRequest request) {

        if(repository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER");

        repository.save(user);

        activityService.saveActivity(
                "New User Registered: "
                        + user.getName()
        );

        return "Registration Successful";
    }

    public User login(LoginRequest request) {

        User user = repository.findByEmail(
                request.getEmail()
        ).orElse(null);

        if(user == null) {

            return null;
        }

        boolean matches = encoder.matches(

                request.getPassword(),

                user.getPassword()
        );

        if(matches) {

            return user;
        }

        return null;
    }
}