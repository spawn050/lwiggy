package com.lwiggy.backend.restaurant;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String cuisine;
    private String rating;
    private String time;
    private int priceForTwo;
    private String location;
    
    @Column(length = 1000)
    private String image;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MenuCategory> menu = new ArrayList<>();

    public Restaurant() {
    }

    public Restaurant(String name, String cuisine, String rating, String time, int priceForTwo, String location, String image) {
        this.name = name;
        this.cuisine = cuisine;
        this.rating = rating;
        this.time = time;
        this.priceForTwo = priceForTwo;
        this.location = location;
        this.image = image;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getPriceForTwo() {
        return priceForTwo;
    }

    public void setPriceForTwo(int priceForTwo) {
        this.priceForTwo = priceForTwo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<MenuCategory> getMenu() {
        return menu;
    }

    public void setMenu(List<MenuCategory> menu) {
        this.menu = menu;
    }
}
