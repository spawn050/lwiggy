package com.lwiggy.backend.repository;

import com.lwiggy.backend.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByRestaurantId(Long restaurantId);
    List<FoodItem> findByNameContainingIgnoreCase(String name);

    @Query("SELECT DISTINCT c.name FROM FoodItem f JOIN f.cuisine c WHERE f.restaurant.id = :restaurantId")
    List<String> findDistinctCuisineNamesByRestaurantId(@Param("restaurantId") Long restaurantId);
}