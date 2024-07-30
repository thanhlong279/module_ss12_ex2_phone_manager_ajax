package com.example.pr1phonemanagementajaxwebservice.controllers;

import com.example.pr1phonemanagementajaxwebservice.models.Smartphone;
import com.example.pr1phonemanagementajaxwebservice.services.ISmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/smartphones")
public class SmartphoneController {

    @Autowired
    private ISmartphoneService smartphoneService;

    @GetMapping
    public ResponseEntity<Iterable<Smartphone>> listSmartphones() {
        return new ResponseEntity<>(smartphoneService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone smartphone) {
        return new ResponseEntity<>(smartphoneService.save(smartphone), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Smartphone> deleteSmartphone(@PathVariable Long id) {
        Smartphone smartphone = smartphoneService.findById(id);
        if (smartphone == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        smartphoneService.remove(id);
        return new ResponseEntity<>(smartphone, HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showUpdateSmartphone(@PathVariable Long id){
        return new ResponseEntity<>(smartphoneService.findById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSmartphone(@PathVariable("id") Long id,
                                                       @RequestBody Smartphone updatedSmartphone){
        Smartphone existingSmartphone = smartphoneService.findById(id);

        if (existingSmartphone == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingSmartphone.setProducer(updatedSmartphone.getProducer());
        existingSmartphone.setModel(updatedSmartphone.getModel());
        existingSmartphone.setPrice(updatedSmartphone.getPrice());

        Smartphone savedSmartphone = smartphoneService.save(existingSmartphone);

        return new ResponseEntity<>(savedSmartphone, HttpStatus.OK);
    }
}
