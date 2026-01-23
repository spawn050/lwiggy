package com.lwiggy.backend.restaurant;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository repo;

    public RestaurantService(RestaurantRepository repo) {
        this.repo = repo;
    }

    public List<Restaurant> getAllRestaurants() {
        return repo.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return repo.findById(id);
    }
}
