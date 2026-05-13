package com.crm.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.entity.Deal;
import com.crm.backend.repository.DealRepository;

@Service
public class DealService {

    @Autowired
    private DealRepository repository;

    public List<Deal> getAllDeals() {

        return repository.findAll();
    }

    // GET DEAL BY ID

    public Deal getDealById(Long id) {

        return repository
                .findById(id)
                .orElse(null);
    }

    public Deal saveDeal(Deal deal) {

        return repository.save(deal);
    }

    public void deleteDeal(Long id) {

        repository.deleteById(id);
    }

    public Deal updateDeal(
            Long id,
            Deal updatedDeal
    ) {

        Deal deal =
                repository.findById(id)
                        .orElse(null);

        if(deal != null) {

            deal.setDealOwner(
                    updatedDeal.getDealOwner()
            );

            deal.setDealName(
                    updatedDeal.getDealName()
            );

            deal.setAccountName(
                    updatedDeal.getAccountName()
            );

            deal.setAmount(
                    updatedDeal.getAmount()
            );

            deal.setClosingDate(
                    updatedDeal.getClosingDate()
            );

            deal.setStage(
                    updatedDeal.getStage()
            );

            deal.setType(
                    updatedDeal.getType()
            );

            deal.setProbability(
                    updatedDeal.getProbability()
            );

            deal.setNextStep(
                    updatedDeal.getNextStep()
            );

            deal.setExpectedRevenue(
                    updatedDeal.getExpectedRevenue()
            );

            deal.setLeadSource(
                    updatedDeal.getLeadSource()
            );

            deal.setCampaignSource(
                    updatedDeal.getCampaignSource()
            );

            deal.setContactName(
                    updatedDeal.getContactName()
            );

            deal.setDescription(
                    updatedDeal.getDescription()
            );

            return repository.save(deal);
        }

        return null;
    }
}