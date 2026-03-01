package com.lwiggy.backend.dto;

import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@Builder
public class OrderItemDTO {
    private Long id;
    private String foodItemName;
    private Integer quantity;
    private BigDecimal price;
}