package com.lwiggy.backend.service;

import com.lwiggy.backend.dto.FoodItemDTO;
import com.lwiggy.backend.dto.RestaurantDTO;
import com.lwiggy.backend.exception.ResourceNotFoundException;
import com.lwiggy.backend.repository.FoodItemRepository;
import com.lwiggy.backend.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private static final int MAX_NO_OF_RESTAURANTS_IN_RESULT = 20;

    private final RestaurantRepository restaurantRepository;
    private final FoodItemRepository foodItemRepository;

    public List<RestaurantDTO> getRestaurantsByLocation(String pincode) {
        return fetchFromNearbyPincodes(pincode, this::getRestaurantsAtPincode);
    }

    public List<RestaurantDTO> searchRestaurants(String query, String pincode) {
        return fetchFromNearbyPincodes(pincode, p -> getRestaurantsAtPincode(p).stream().filter(r -> matchesQuery(r, query)).toList());
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
                        .isVeg(f.getIsVeg())
                        .build())
                .toList();

        List<String> cuisines = foodItems.stream()
                .map(FoodItemDTO::getCuisineName)
                .filter(Objects::nonNull)
                .distinct()
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
                .cuisines(cuisines)
                .build();
    }

    private List<RestaurantDTO> fetchFromNearbyPincodes(String pincode,
                                                        Function<String, List<RestaurantDTO>> fetcher) {
        var result = new ArrayList<>(fetcher.apply(pincode));
        int pincodeNumber = Integer.parseInt(pincode);
        int offset = 1;
        while (result.size() < MAX_NO_OF_RESTAURANTS_IN_RESULT && offset <= 5) {
            result.addAll(fetcher.apply(String.valueOf(pincodeNumber + offset)));
            result.addAll(fetcher.apply(String.valueOf(pincodeNumber - offset)));
            ++offset;
        }
        return result.size() > MAX_NO_OF_RESTAURANTS_IN_RESULT ?
                result.subList(0, MAX_NO_OF_RESTAURANTS_IN_RESULT)
                : result;
    }

    private List<RestaurantDTO> getRestaurantsAtPincode(String pincode) {
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
                        .cuisines(foodItemRepository.findDistinctCuisineNamesByRestaurantId(r.getId()))
                        .build())
                .collect(Collectors.toList());
    }

    private boolean matchesQuery(RestaurantDTO restaurant, String searchQuery) {
        return restaurant.getName().toLowerCase().contains(searchQuery.toLowerCase())
                || foodItemRepository.findByRestaurantId(restaurant.getId())
                        .stream()
                        .anyMatch(f -> f.getName().toLowerCase().contains(searchQuery.toLowerCase()));
    }
}