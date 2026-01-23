package com.lwiggy.backend.restaurant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RestaurantRepository repo;

    public DataSeeder(RestaurantRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) {
            // Restaurant 1: Burger King
            Restaurant r1 = new Restaurant(
                "Burger King",
                "Burgers, Fast Food",
                "4.2",
                "30 mins",
                400,
                "Connaught Place, New Delhi",
                "https://images.unsplash.com/photo-1550547660-d9450f859349"
            );

            MenuCategory cat1_1 = new MenuCategory("Recommended", r1);
            MenuItem item1_1_1 = new MenuItem("Whopper", 199, "Signature flame-grilled beef patty", false, "https://images.unsplash.com/photo-1571091718767-18b5b1457add", cat1_1);
            MenuItem item1_1_2 = new MenuItem("Veggie Burger", 149, "Crispy veggie patty with fresh lettuce", true, "https://images.unsplash.com/photo-1550547660-d9450f859349", cat1_1);
            cat1_1.setItems(List.of(item1_1_1, item1_1_2));

            MenuCategory cat1_2 = new MenuCategory("Sides", r1);
            MenuItem item1_2_1 = new MenuItem("Fries (Medium)", 99, "Classic salted fries", true, "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d", cat1_2);
            cat1_2.setItems(List.of(item1_2_1));

            r1.setMenu(List.of(cat1_1, cat1_2));
            repo.save(r1);

            // Restaurant 2: Domino's Pizza
            Restaurant r2 = new Restaurant(
                "Domino's Pizza",
                "Pizza, Italian",
                "4.0",
                "25 mins",
                500,
                "Sector 18, Noida",
                "https://images.unsplash.com/photo-1601924572627-bd2b8f94c6c6"
            );

            MenuCategory cat2_1 = new MenuCategory("Recommended", r2);
            MenuItem item2_1_1 = new MenuItem("Farmhouse Pizza", 450, "Delightful combination of onion, capsicum, tomato & grilled mushroom", true, "https://images.unsplash.com/photo-1513104890138-7c749659a591", cat2_1);
            MenuItem item2_1_2 = new MenuItem("Pepperoni Pizza", 550, "American classic pepperoni", false, "https://images.unsplash.com/photo-1628840042765-356cda07504e", cat2_1);
            cat2_1.setItems(List.of(item2_1_1, item2_1_2));

            r2.setMenu(List.of(cat2_1));
            repo.save(r2);

            System.out.println("Data Seeder: Seeded " + repo.count() + " restaurants.");
        }
    }
}
