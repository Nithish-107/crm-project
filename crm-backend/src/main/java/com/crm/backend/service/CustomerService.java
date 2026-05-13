package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Customer;
import com.crm.backend.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private ActivityService activityService;

    public List<Customer> getAllCustomers() {

        return repository.findAll();
    }

    public Customer saveCustomer(
            Customer customer) {

        Customer savedCustomer =
                repository.save(customer);

        activityService.saveActivity(

                "New Customer Added: "
                        + customer.getName()
        );

        return savedCustomer;
    }

    public void deleteCustomer(Long id) {

        activityService.saveActivity(
                "Customer Deleted"
        );
        repository.deleteById(id);
    }

    public Customer updateCustomer(
            Long id,
            Customer customer) {

        Customer existingCustomer =
                repository.findById(id).orElse(null);

        if(existingCustomer != null) {

            existingCustomer.setName(customer.getName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setPhone(customer.getPhone());
            existingCustomer.setCompany(customer.getCompany());

            return repository.save(existingCustomer);
        }

        return null;
    }

    public Long getCustomerCount() {

        return repository.count();
    }

    public List<Customer> searchCustomers(String name) {

        return repository.findByNameContainingIgnoreCase(name);
    }

    public Page<Customer> getCustomersPaginated(
            int page,
            int size) {
        Pageable pageable =PageRequest.of(page, size);

        return repository.findAll(pageable);
    }
}