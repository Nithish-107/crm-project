package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Activity;
import com.crm.backend.service.ActivityService;

@RestController
@RequestMapping("/activities")
@CrossOrigin("*")
public class ActivityController {

    @Autowired
    private ActivityService service;

    @GetMapping
    public List<Activity>
    getActivities() {

        return service
                .getRecentActivities();
    }
}