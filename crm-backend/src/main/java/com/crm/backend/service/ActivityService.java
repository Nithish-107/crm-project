package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Activity;
import com.crm.backend.repository.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public void saveActivity(
            String message
    ) {

        Activity activity =
                new Activity();

        activity.setMessage(message);

        repository.save(activity);
    }

    public List<Activity>
    getRecentActivities() {

        return repository
                .findTop5ByOrderByCreatedAtDesc();
    }
}