package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Task;
import com.crm.backend.repository.TaskRepository;
import java.time.LocalDate;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private ActivityService activityService;


    public List<Task> getAllTasks() {

        return repository.findAll();
    }


    public Task saveTask(Task task) {

        Task savedTask =
                repository.save(task);

        activityService.saveActivity(
                "New Task Added: "
                        + task.getTitle()
        );

        return savedTask;
    }


    public void deleteTask(Long id) {

        Task task =
                repository.findById(id)
                        .orElse(null);

        if(task != null) {

            activityService.saveActivity(
                    "Task Deleted: "
                            + task.getTitle()
            );

            repository.deleteById(id);
        }
    }


    public Long getTaskCount() {

        return repository.count();
    }

    public Task updateStatus(
            Long id,
            String status) {

        Task task =
                repository.findById(id)
                        .orElse(null);

        if(task != null) {

            task.setStatus(status);

            activityService.saveActivity(
                    "Task Status Updated: "
                            + task.getTitle()
                            + " -> "
                            + status
            );

            if(status.equals("Completed")) {

                activityService.saveActivity(
                        "Task Completed: "
                                + task.getTitle()
                );
            }

            return repository.save(task);
        }

        return null;
    }

    public Long getPendingTaskCount() {

        return repository.countByStatus("Pending");
    }

    public Long getOverdueTaskCount() {

        List<Task> tasks =
                repository.findAll();

        Long count = 0L;

        LocalDate today =
                LocalDate.now();

        for(Task task : tasks) {


            if(task.getStatus()
                    .equals("Completed")) {

                continue;
            }

            LocalDate dueDate =
                    LocalDate.parse(
                            task.getDueDate()
                    );

            if(dueDate.isBefore(today)) {

                count++;
            }
        }

        return count;
    }
}