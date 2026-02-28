package com.lwiggy.backend.service;

import com.lwiggy.backend.dto.FoodItemDTO;
import com.lwiggy.backend.dto.RestaurantDTO;
import com.lwiggy.backend.exception.ResourceNotFoundException;
import com.lwiggy.backend.repository.FoodItemRepository;
import com.lwiggy.backend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final FoodItemRepository foodItemRepository;

    public RestaurantService(RestaurantRepository restaurantRepository,
                             FoodItemRepository foodItemRepository) {
        this.restaurantRepository = restaurantRepository;
        this.foodItemRepository = foodItemRepository;
    }

    public List<RestaurantDTO> getRestaurantsByLocation(String pincode) {
        return restaurantRepository.findByPincode(pincode)
                .stream()
                .map(r -> RestaurantDTO.builder()
                        .id(r.getId())
                        .name(r.getName())
                        .address(r.getAddress())
                        .pincode(r.getPincode())
                        .imageUrl(r.getImageUrl())
                        .rating(r.getRating())
                        .ratingCount(r.getRatingCount())
                        .build())
                .toList();
    }

    public List<RestaurantDTO> searchRestaurants(String query, String pincode) {
        return restaurantRepository.findByPincode(pincode)
                .stream()
                .filter(r -> r.getName().toLowerCase().contains(query.toLowerCase())
                        || foodItemRepository.findByRestaurantId(r.getId())
                        .stream()
                        .anyMatch(f -> f.getName().toLowerCase().contains(query.toLowerCase())))
                .map(r -> RestaurantDTO.builder()
                        .id(r.getId())
                        .name(r.getName())
                        .address(r.getAddress())
                        .pincode(r.getPincode())
                        .imageUrl(r.getImageUrl())
                        .rating(r.getRating())
                        .ratingCount(r.getRatingCount())
                        .build())
                .toList();
    }

    public RestaurantDTO getRestaurantById(Long id) {
        var restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant with id " + id + " not found"));

        List<FoodItemDTO> foodItems = foodItemRepository.findByRestaurantId(id)
                .stream()
                .map(f -> FoodItemDTO.builder()
                        .id(f.getId())
                        .name(f.getName())
                        .price(f.getPrice())
                        .imageUrl(f.getImageUrl())
                        .cuisineName(f.getCuisine() != null ? f.getCuisine().getName() : null)
                        .build())
                .toList();

        return RestaurantDTO.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .address(restaurant.getAddress())
                .pincode(restaurant.getPincode())
                .imageUrl(restaurant.getImageUrl())
                .rating(restaurant.getRating())
                .ratingCount(restaurant.getRatingCount())
                .foodItems(foodItems)
                .build();
    }
}