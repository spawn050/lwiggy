package com.lwiggy.backend.dto;

import lombok.*;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RestaurantDTO {
    private Long id;
    private String name;
    private String address;
    private String pincode;
    private String imageUrl;
    private Double rating;
    private Integer ratingCount;
    private List<FoodItemDTO> foodItems;
}