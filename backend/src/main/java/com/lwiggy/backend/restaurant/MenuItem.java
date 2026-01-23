package com.lwiggy.backend.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int price;
    private String description;
    
    @com.fasterxml.jackson.annotation.JsonProperty("isVeg")
    private boolean isVeg;
    
    @Column(length = 1000)
    private String image;

    @ManyToOne
    @JoinColumn(name = "menu_category_id")
    @JsonIgnore
    private MenuCategory menuCategory;

    public MenuItem() {
    }

    public MenuItem(String name, int price, String description, boolean isVeg, String image, MenuCategory menuCategory) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.isVeg = isVeg;
        this.image = image;
        this.menuCategory = menuCategory;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isVeg() {
        return isVeg;
    }

    public void setVeg(boolean veg) {
        isVeg = veg;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }
}
