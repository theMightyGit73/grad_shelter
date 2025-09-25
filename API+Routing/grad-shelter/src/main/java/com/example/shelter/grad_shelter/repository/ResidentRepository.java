// src/main/java/com/example/shelter/grad_shelter/repository/ResidentRepository.java
package com.example.shelter.grad_shelter.repository;

import com.example.shelter.grad_shelter.model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    // Spring Data JPA provides methods like findAll(), findById(), save(), deleteById()
}