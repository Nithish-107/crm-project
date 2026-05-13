package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Lead;
import com.crm.backend.service.LeadService;

@RestController
@RequestMapping("/leads")
@CrossOrigin("*")
public class LeadController {

    @Autowired
    private LeadService service;


    @GetMapping
    public List<Lead> getLeads() {

        return service.getAllLeads();
    }


    @PostMapping
    public Lead addLead(
            @RequestBody Lead lead) {

        return service.saveLead(lead);
    }


    @DeleteMapping("/{id}")
    public String deleteLead(
            @PathVariable Long id) {

        service.deleteLead(id);

        return "Lead Deleted";
    }

    @GetMapping("/count")
    public Long getLeadCount() {

        return service.getLeadCount();
    }

    @PutMapping("/{id}/status")
    public Lead updateLeadStatus(

            @PathVariable Long id,
            @RequestParam String status) {
        return service.updateLeadStatus(
                id,status
        );
    }

    @PostMapping("/{id}/convert")
    public String convertLead(
            @PathVariable Long id) {

        return service.convertLead(id);
    }

    @GetMapping("/converted/count")
    public Long getConvertedLeadsCount() {

        return service.getConvertedLeadsCount();
    }
}