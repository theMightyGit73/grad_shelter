// src/main/java/com/example/shelter/grad_shelter/controller/ResidentController.java
package com.example.shelter.grad_shelter.controller;

import com.example.shelter.grad_shelter.model.Resident;
import com.example.shelter.grad_shelter.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/residents") // Base URL for all endpoints in this controller
@CrossOrigin(origins = "*") // Allows requests from any origin (e.g., your React app)
public class ResidentController {

    @Autowired
    private ResidentRepository residentRepository;

    // GET all residents
    @GetMapping
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    // GET a single resident by ID
    @GetMapping("/{id}")
    public ResponseEntity<Resident> getResidentById(@PathVariable Long id) {
        return residentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (create) a new resident
    @PostMapping
    public Resident createResident(@RequestBody Resident resident) {
        return residentRepository.save(resident);
    }

    // PUT (update) an existing resident
    @PutMapping("/{id}")
    public ResponseEntity<Resident> updateResident(@PathVariable Long id, @RequestBody Resident residentDetails) {
        return residentRepository.findById(id)
                .map(resident -> {
                    resident.setName(residentDetails.getName());
                    resident.setAge(residentDetails.getAge());
                    resident.setAvailable(residentDetails.isAvailable());
                    Resident updatedResident = residentRepository.save(resident);
                    return ResponseEntity.ok(updatedResident);
                }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE a resident
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResident(@PathVariable Long id) {
        return residentRepository.findById(id)
                .map(resident -> {
                    residentRepository.delete(resident);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}