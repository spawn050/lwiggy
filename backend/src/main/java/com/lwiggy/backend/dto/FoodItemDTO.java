package com.lwiggy.backend.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class FoodItemDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private String cuisineName;
}