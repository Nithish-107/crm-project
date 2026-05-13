package com.crm.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Customer;
import com.crm.backend.service.CustomerService;


@RestController
@RequestMapping("/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping
    public List<Customer> getCustomers() {
        return service.getAllCustomers();
    }

    @PostMapping
    public Customer addCustomer(
            @RequestBody Customer customer) {

        return service.saveCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id) {

        service.deleteCustomer(id);

        return "Customer Deleted";
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {

        return service.updateCustomer(id, customer);
    }

    @GetMapping("/count")
    public Long getCustomerCount() {

        return service.getCustomerCount();
    }

    @GetMapping("/search")
    public List<Customer> searchCustomers(
            @RequestParam String name) {

        return service.searchCustomers(name);
    }
    @GetMapping("/page")
    public Page<Customer> getCustomersPaginated(

            @RequestParam int page,
            @RequestParam int size) {

        return service.getCustomersPaginated(
                page,size
        );
    }
}