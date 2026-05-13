package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Task;
import com.crm.backend.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public List<Task> getTasks() {

        return service.getAllTasks();
    }

    @PostMapping
    public Task addTask(
            @RequestBody Task task) {

        return service.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(
            @PathVariable Long id) {

        service.deleteTask(id);

        return "Task Deleted";
    }

    @GetMapping("/count")
    public Long getTaskCount() {

        return service.getTaskCount();
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(

            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateStatus(
                id,
                status
        );
    }

    @GetMapping("/pending/count")
    public Long getPendingTaskCount() {

        return service.getPendingTaskCount();
    }

    @GetMapping("/overdue/count")
    public Long getOverdueTaskCount() {

        return service.getOverdueTaskCount();
    }

    @PutMapping("/{id}")
    public Task updateTask(

            @PathVariable Long id,
            @RequestBody Task task) {
            task.setId(id);
            return service.saveTask(task);
    }
}