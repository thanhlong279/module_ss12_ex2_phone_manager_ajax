package com.example.pr1phonemanagementajaxwebservice.services.impl;

import com.example.pr1phonemanagementajaxwebservice.models.Smartphone;
import com.example.pr1phonemanagementajaxwebservice.repositories.ISmartphoneRepository;
import com.example.pr1phonemanagementajaxwebservice.services.ISmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SmartphoneService implements ISmartphoneService {
    @Autowired
    private ISmartphoneRepository iSmartphoneRepository;

    @Override
    public Iterable<Smartphone> findAll() {
        return iSmartphoneRepository.findAll();
    }

    @Override
    public Smartphone findById(Long id) {
        return iSmartphoneRepository.findById(id).orElse(null);
    }

    @Override
    public Smartphone save(Smartphone smartPhone) {
        return iSmartphoneRepository.save(smartPhone);
    }

    @Override
    public void remove(Long id) {
        iSmartphoneRepository.deleteById(id);
    }
}
