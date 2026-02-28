package com.lwiggy.backend.config;

import com.lwiggy.backend.entity.*;
import com.lwiggy.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RestaurantRepository restaurantRepository;
    private final FoodItemRepository foodItemRepository;
    private final CuisineRepository cuisineRepository;

    public DataSeeder(RestaurantRepository restaurantRepository,
                      FoodItemRepository foodItemRepository,
                      CuisineRepository cuisineRepository) {
        this.restaurantRepository = restaurantRepository;
        this.foodItemRepository = foodItemRepository;
        this.cuisineRepository = cuisineRepository;
    }

    @Override
    public void run(String... args) {

        if (cuisineRepository.count() > 0) return;

        Cuisine indian = cuisineRepository.save(Cuisine.builder().name("Indian").build());
        Cuisine chinese = cuisineRepository.save(Cuisine.builder().name("Chinese").build());
        Cuisine italian = cuisineRepository.save(Cuisine.builder().name("Italian").build());

        // Mumbai restaurants (pincode 400001)
        Restaurant spicyGarden = restaurantRepository.save(Restaurant.builder()
                .name("Spicy Garden")
                .address("12 Marine Drive, Mumbai")
                .pincode("400001")
                .imageUrl("https://placehold.co/400x200?text=Spicy+Garden")
                .rating(4.2)
                .ratingCount(230)
                .build());

        Restaurant dragonWok = restaurantRepository.save(Restaurant.builder()
                .name("Dragon Wok")
                .address("56 Colaba Causeway, Mumbai")
                .pincode("400001")
                .imageUrl("https://placehold.co/400x200?text=Dragon+Wok")
                .rating(4.0)
                .ratingCount(185)
                .build());

        // Pune restaurants (pincode 411001)
        Restaurant puneKitchen = restaurantRepository.save(Restaurant.builder()
                        .name("Pune Kitchen")
                        .address("8 FC Road, Pune")
                        .pincode("411001")
                        .imageUrl("https://placehold.co/400x200?text=Pune+Kitchen")
                        .rating(4.5)
                        .ratingCount(310)
                        .build());

        Restaurant pizzaVilla = restaurantRepository.save(Restaurant.builder()
                .name("Pizza Villa")
                .address("22 MG Road, Pune")
                .pincode("411001")
                .imageUrl("https://placehold.co/400x200?text=Pizza+Villa")
                .rating(3.9)
                .ratingCount(140)
                .build());

        // Bangalore restaurants (pincode 560001)
        Restaurant southSpice = restaurantRepository.save(Restaurant.builder()
                .name("South Spice")
                .address("14 Brigade Road, Bangalore")
                .pincode("560001")
                .imageUrl("https://placehold.co/400x200?text=South+Spice")
                .rating(4.3)
                .ratingCount(275)
                .build());

        Restaurant noodleHouse = restaurantRepository.save(Restaurant.builder()
                .name("Noodle House")
                .address("77 Indiranagar, Bangalore")
                .pincode("560001")
                .imageUrl("https://placehold.co/400x200?text=Noodle+House")
                .rating(4.1)
                .ratingCount(198)
                .build());

        // Food items — Spicy Garden (Indian)
        foodItemRepository.save(FoodItem.builder().name("Butter Chicken").price(new BigDecimal("320")).restaurant(spicyGarden).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Dal Makhani").price(new BigDecimal("220")).restaurant(spicyGarden).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Garlic Naan").price(new BigDecimal("60")).restaurant(spicyGarden).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Paneer Tikka").price(new BigDecimal("280")).restaurant(spicyGarden).cuisine(indian).build());

        // Food items — Dragon Wok (Chinese)
        foodItemRepository.save(FoodItem.builder().name("Kung Pao Chicken").price(new BigDecimal("340")).restaurant(dragonWok).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Fried Rice").price(new BigDecimal("180")).restaurant(dragonWok).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Spring Rolls").price(new BigDecimal("150")).restaurant(dragonWok).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Hakka Noodles").price(new BigDecimal("200")).restaurant(dragonWok).cuisine(chinese).build());

        // Food items — Pune Kitchen (Indian)
        foodItemRepository.save(FoodItem.builder().name("Misal Pav").price(new BigDecimal("120")).restaurant(puneKitchen).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Vada Pav").price(new BigDecimal("40")).restaurant(puneKitchen).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Pav Bhaji").price(new BigDecimal("160")).restaurant(puneKitchen).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Biryani").price(new BigDecimal("350")).restaurant(puneKitchen).cuisine(indian).build());

        // Food items — Pizza Villa (Italian)
        foodItemRepository.save(FoodItem.builder().name("Margherita Pizza").price(new BigDecimal("299")).restaurant(pizzaVilla).cuisine(italian).build());
        foodItemRepository.save(FoodItem.builder().name("Pasta Arrabiata").price(new BigDecimal("249")).restaurant(pizzaVilla).cuisine(italian).build());
        foodItemRepository.save(FoodItem.builder().name("Garlic Bread").price(new BigDecimal("99")).restaurant(pizzaVilla).cuisine(italian).build());
        foodItemRepository.save(FoodItem.builder().name("BBQ Chicken Pizza").price(new BigDecimal("349")).restaurant(pizzaVilla).cuisine(italian).build());

        // Food items — South Spice (Indian)
        foodItemRepository.save(FoodItem.builder().name("Masala Dosa").price(new BigDecimal("120")).restaurant(southSpice).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Idli Sambar").price(new BigDecimal("80")).restaurant(southSpice).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Chettinad Chicken").price(new BigDecimal("380")).restaurant(southSpice).cuisine(indian).build());
        foodItemRepository.save(FoodItem.builder().name("Rasam Rice").price(new BigDecimal("140")).restaurant(southSpice).cuisine(indian).build());

        // Food items — Noodle House (Chinese)
        foodItemRepository.save(FoodItem.builder().name("Dim Sum").price(new BigDecimal("220")).restaurant(noodleHouse).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Wonton Soup").price(new BigDecimal("180")).restaurant(noodleHouse).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Chilli Chicken").price(new BigDecimal("300")).restaurant(noodleHouse).cuisine(chinese).build());
        foodItemRepository.save(FoodItem.builder().name("Schezwan Noodles").price(new BigDecimal("220")).restaurant(noodleHouse).cuisine(chinese).build());

        System.out.println("Seed data loaded.");
    }
}
