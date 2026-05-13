package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.User;
import com.crm.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repository;

    @GetMapping
    public List<User> getUsers() {

        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        repository.deleteById(id);

        return "User Deleted";
    }

    @GetMapping("/count")
    public Long getUserCount() {

        return repository.count();
    }
}