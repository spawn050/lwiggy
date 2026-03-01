package com.lwiggy.backend.service;

import com.lwiggy.backend.dto.OrderDTO;
import com.lwiggy.backend.dto.OrderItemDTO;
import com.lwiggy.backend.dto.OrderRequestDTO;
import com.lwiggy.backend.entity.FoodItem;
import com.lwiggy.backend.entity.Order;
import com.lwiggy.backend.entity.OrderItem;
import com.lwiggy.backend.exception.ResourceNotFoundException;
import com.lwiggy.backend.repository.FoodItemRepository;
import com.lwiggy.backend.repository.OrderItemRepository;
import com.lwiggy.backend.repository.OrderRepository;
import com.lwiggy.backend.repository.RestaurantRepository;
import com.lwiggy.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final RestaurantRepository restaurantRepository;
    private final FoodItemRepository foodItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderDTO placeOrder(OrderRequestDTO request, Long userId) {
        var restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var order = Order.builder()
                .user(user)
                .restaurant(restaurant)
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryPincode(request.getDeliveryPincode())
                .orderPlacedTime(LocalDateTime.now())
                .totalPrice(BigDecimal.ZERO)
                .build();

        order = orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new java.util.ArrayList<>();

        for (var itemRequest : request.getItems()) {
            FoodItem foodItem = foodItemRepository.findById(itemRequest.getFoodItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Food item not found: " + itemRequest.getFoodItemId()));

            if (!foodItem.getRestaurant().getId().equals(request.getRestaurantId())) {
                throw new IllegalArgumentException("Food item " + foodItem.getName() + " does not belong to this restaurant");
            }

            BigDecimal itemTotal = foodItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            total = total.add(itemTotal);

            var orderItem = OrderItem.builder()
                    .order(order)
                    .foodItem(foodItem)
                    .quantity(itemRequest.getQuantity())
                    .price(foodItem.getPrice())
                    .build();

            orderItems.add(orderItemRepository.save(orderItem));
        }

        order.setTotalPrice(total);
        orderRepository.save(order);

        return toDTO(order, orderItems);
    }

    public List<OrderDTO> getOrdersByUser(Long userId) {
        var orders = orderRepository.findByUserId(userId);
        return orders.stream().map(order -> {
            var items = orderItemRepository.findByOrderId(order.getId());
            return toDTO(order, items);
        }).toList();
    }

    public OrderDTO getOrderById(Long orderId, Long userId) {
        var order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Access denied");
        }

        var items = orderItemRepository.findByOrderId(orderId);
        return toDTO(order, items);
    }

    private OrderDTO toDTO(Order order, List<OrderItem> items) {
        var itemDTOs = items.stream().map(item -> OrderItemDTO.builder()
                .id(item.getId())
                .foodItemName(item.getFoodItem().getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .build()
        ).toList();

        return OrderDTO.builder()
                .id(order.getId())
                .restaurantName(order.getRestaurant().getName())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryPincode(order.getDeliveryPincode())
                .status(order.getStatus())
                .totalPrice(order.getTotalPrice())
                .orderPlacedTime(order.getOrderPlacedTime())
                .items(itemDTOs)
                .build();
    }
}