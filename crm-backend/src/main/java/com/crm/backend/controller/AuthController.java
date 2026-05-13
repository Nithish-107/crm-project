package com.crm.backend.controller;


import com.crm.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.dto.LoginRequest;
import com.crm.backend.dto.RegisterRequest;
import com.crm.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService service;


    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {

        return service.login(request);
    }

}