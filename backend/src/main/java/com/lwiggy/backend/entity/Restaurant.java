package com.lwiggy.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String address;

    @Column(nullable = false)
    private String pincode;

    @Column(name = "image_url")
    private String imageUrl;

    private Double rating;

    @Column(name = "rating_count")
    private Integer ratingCount;
}