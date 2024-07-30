package com.example.pr1phonemanagementajaxwebservice.services;

import com.example.pr1phonemanagementajaxwebservice.models.Smartphone;

import java.util.Optional;

public interface ISmartphoneService {
    Iterable<Smartphone> findAll();

    Smartphone findById(Long id);

    Smartphone save(Smartphone smartphone);

    void remove(Long id);
}
