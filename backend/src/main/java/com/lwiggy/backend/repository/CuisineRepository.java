package com.lwiggy.backend.repository;

import com.lwiggy.backend.entity.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
    Optional<Cuisine> findByName(String name);
}