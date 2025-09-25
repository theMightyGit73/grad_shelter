// src/main/java/com/example/shelter/grad_shelter/model/Resident.java
package com.example.shelter.grad_shelter.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Marks this class as a JPA entity (a table in the DB)
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private boolean available;
    // --- ADDED FIELDS for Graduate Shelter theme ---
    private String type; // e.g., "Undergrad", "Masters", "PhD", "Alumni"
    private String mood; // e.g., "Stressed", "Caffeinated", "Defended"
    // ---------------------------------------------

    // JPA requires a no-argument constructor
    public Resident() {
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    // --- Getters and Setters for New Fields ---

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }
}