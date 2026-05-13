package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Lead;
import com.crm.backend.repository.LeadRepository;
import com.crm.backend.entity.Customer;
import com.crm.backend.repository.CustomerRepository;

@Service
public class LeadService {

    @Autowired
    private LeadRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ActivityService activityService;


    public List<Lead> getAllLeads() {

        return repository.findAll();
    }


    public Lead saveLead(Lead lead) {

        Lead savedLead =
                repository.save(lead);

        activityService.saveActivity(

                "New Lead Added: "
                        + lead.getName()
        );

        return savedLead;
    }

    public void deleteLead(Long id) {

        repository.deleteById(id);
    }


    public Long getLeadCount() {

        return repository.count();
    }

    public Lead updateLeadStatus(
            Long id,
            String status) {

        Lead lead =repository.findById(id).orElse(null);

        if(lead != null) {
            lead.setStatus(status);
            return repository.save(lead);
        }

        return null;
    }

    public String convertLead(Long id) {

        Lead lead =
                repository.findById(id).orElse(null);


        if(lead == null) {

            return "Lead Not Found";
        }

        Customer customer = new Customer();

        customer.setName(lead.getName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());
        customer.setCompany(lead.getSource());

        customerRepository.save(customer);

        activityService.saveActivity(

                "Lead Converted: "
                        + lead.getName()
        );

        repository.deleteById(id);

        return "Lead Converted Successfully";
    }

    public Long getConvertedLeadsCount() {

        return repository.countByStatus("Converted");
    }
}