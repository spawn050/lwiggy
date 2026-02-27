package com.lwiggy.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cuisine")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Cuisine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}