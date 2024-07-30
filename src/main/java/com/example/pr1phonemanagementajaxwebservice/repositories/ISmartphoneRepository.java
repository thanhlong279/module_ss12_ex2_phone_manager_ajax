package com.example.pr1phonemanagementajaxwebservice.repositories;

import com.example.pr1phonemanagementajaxwebservice.models.Smartphone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISmartphoneRepository extends JpaRepository<Smartphone, Long> {
}
