package com.lwiggy.backend.repository;

import com.lwiggy.backend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByPincode(String pincode);
    List<Restaurant> findByNameContainingIgnoreCase(String name);
}