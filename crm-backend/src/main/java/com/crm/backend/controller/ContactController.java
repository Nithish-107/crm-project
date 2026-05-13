package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Contact;
import com.crm.backend.service.ContactService;

@RestController
@RequestMapping("/contacts")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactService service;

    @GetMapping
    public List<Contact> getContacts() {

        return service.getAllContacts();
    }

    @PostMapping
    public Contact saveContact(
            @RequestBody Contact contact
    ) {

        return service.saveContact(contact);
    }

    @PutMapping("/{id}")
    public Contact updateContact(
            @PathVariable Long id,
            @RequestBody Contact contact
    ) {

        return service.updateContact(
                id,
                contact
        );
    }

    @DeleteMapping("/{id}")
    public void deleteContact(
            @PathVariable Long id
    ) {

        service.deleteContact(id);
    }
}