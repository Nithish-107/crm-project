package com.crm.backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.backend.entity.Customer;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    List<Customer> findByNameContainingIgnoreCase(String name);

}