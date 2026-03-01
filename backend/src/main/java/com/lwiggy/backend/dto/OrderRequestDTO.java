package com.lwiggy.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class OrderRequestDTO {
    private Long restaurantId;
    private String deliveryAddress;
    private String deliveryPincode;
    private List<OrderItemRequest> items;

    @Getter
    @Setter
    public static class OrderItemRequest {
        private Long foodItemId;
        private Integer quantity;
    }
}