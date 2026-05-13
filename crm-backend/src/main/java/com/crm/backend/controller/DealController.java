package com.crm.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.backend.entity.Deal;
import com.crm.backend.service.DealService;

@RestController
@RequestMapping("/deals")
@CrossOrigin("*")
public class DealController {

    @Autowired
    private DealService service;

    @GetMapping
    public List<Deal> getDeals() {

        return service.getAllDeals();
    }

    // GET DEAL BY ID

    @GetMapping("/{id}")
    public Deal getDealById(

            @PathVariable Long id
    ) {

        return service.getDealById(id);
    }

    @PostMapping
    public Deal addDeal(
            @RequestBody Deal deal
    ) {

        return service.saveDeal(deal);
    }

    @PutMapping("/{id}")
    public Deal updateDeal(

            @PathVariable Long id,

            @RequestBody Deal deal
    ) {

        return service.updateDeal(
                id,
                deal
        );
    }

    @DeleteMapping("/{id}")
    public void deleteDeal(
            @PathVariable Long id
    ) {

        service.deleteDeal(id);
    }
}