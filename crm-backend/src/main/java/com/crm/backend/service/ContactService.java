package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Contact;
import com.crm.backend.repository.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    @Autowired
    private ActivityService activityService;

    public List<Contact> getAllContacts() {

        return repository.findAll();
    }

    public Contact saveContact(Contact contact) {

        Contact saved =
                repository.save(contact);

        activityService.saveActivity(
                "New Contact Added: "
                        + contact.getName()
        );

        return saved;
    }

    public void deleteContact(Long id) {

        Contact contact =
                repository.findById(id)
                        .orElse(null);

        if(contact != null) {

            activityService.saveActivity(
                    "Contact Deleted: "
                            + contact.getName()
            );

            repository.deleteById(id);
        }
    }

    public Contact updateContact(
            Long id,
            Contact updatedContact
    ) {

        Contact contact =
                repository.findById(id)
                        .orElse(null);

        if(contact != null) {

            contact.setName(
                    updatedContact.getName()
            );

            contact.setEmail(
                    updatedContact.getEmail()
            );

            contact.setPhone(
                    updatedContact.getPhone()
            );

            contact.setCompany(
                    updatedContact.getCompany()
            );

            contact.setPosition(
                    updatedContact.getPosition()
            );

            contact.setCity(
                    updatedContact.getCity()
            );

            activityService.saveActivity(
                    "Contact Updated: "
                            + updatedContact.getName()
            );

            return repository.save(contact);
        }

        return null;
    }
}