package com.lwiggy.backend.dto;

import com.lwiggy.backend.enums.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderDTO {
    private Long id;
    private String restaurantName;
    private String deliveryAddress;
    private String deliveryPincode;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private LocalDateTime orderPlacedTime;
    private List<OrderItemDTO> items;
}