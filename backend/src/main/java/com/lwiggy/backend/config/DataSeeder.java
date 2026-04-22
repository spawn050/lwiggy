package com.lwiggy.backend.config;

import com.lwiggy.backend.entity.Cuisine;
import com.lwiggy.backend.entity.FoodItem;
import com.lwiggy.backend.entity.Restaurant;
import com.lwiggy.backend.repository.CuisineRepository;
import com.lwiggy.backend.repository.FoodItemRepository;
import com.lwiggy.backend.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    public static final int NO_OF_RESTAURANTS_PER_CITY = 1000;

    private static final List<String> RESTAURANT_IMAGES = List.of(
            "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=600&q=80",
            "https://images.unsplash.com/photo-1538333581680-29dd4752ddf2?w=600&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
            "https://images.unsplash.com/photo-1729394405518-eaf2a0203aa7?w=600&q=80",
            "https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?w=600&q=80",
            "https://images.unsplash.com/photo-1560130934-590b85fc08e7?w=600&q=80",
            "https://images.unsplash.com/photo-1494346480775-936a9f0d0877?w=600&q=80",
            "https://images.unsplash.com/photo-1538334421852-687c439c92f4?w=600&q=80",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
            "https://images.unsplash.com/photo-1729394405014-0a6bd5c63c59?w=600&q=80",
            "https://images.unsplash.com/photo-1729394404997-c95e5c5dd736?w=600&q=80",
            "https://images.unsplash.com/photo-1686100509942-e7460e8b80cb?w=600&q=80",
            "https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=600&q=80",
            "https://images.unsplash.com/photo-1551530241-1ccbaa7a9a84?w=600&q=80",
            "https://images.unsplash.com/photo-1541856644905-bd40b138cbbd?w=600&q=80",
            "https://images.unsplash.com/photo-1737116846855-26bfe6387515?w=600&q=80",
            "https://images.unsplash.com/photo-1654483949849-ed21ae4fb2c1?w=600&q=80",
            "https://images.unsplash.com/photo-1765099271664-614c541196ef?w=600&q=80",
            "https://images.unsplash.com/photo-1744776411223-71fb5794617a?w=600&q=80",
            "https://images.unsplash.com/photo-1744776411221-702f2848b0b2?w=600&q=80"
    );

    private static final List<String> PIZZA_IMAGES = List.of(
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
            "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80",
            "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&q=80",
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&q=80",
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&q=80"
    );

    private static final List<String> PASTA_IMAGES = List.of(
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
            "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&q=80",
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80",
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
            "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=400&q=80",
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80"
    );

    private static final List<String> RISOTTO_IMAGES = List.of(
            "https://images.unsplash.com/photo-1682428617976-f25633ed8469?w=400&q=80",
            "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
            "https://images.unsplash.com/photo-1581073746562-e7fd2422f0eb?w=400&q=80",
            "https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?w=400&q=80"
    );

    private static final List<String> BIRYANI_IMAGES = List.of(
            "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?w=400&q=80",
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80",
            "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=400&q=80",
            "https://images.unsplash.com/photo-1684409642850-b48e5ab8e67c?w=400&q=80",
            "https://images.unsplash.com/photo-1710091691802-7dedb8af9a77?w=400&q=80",
            "https://images.unsplash.com/photo-1747518596371-ab78bd612d09?w=400&q=80"
    );

    private static final List<String> CURRY_IMAGES = List.of(
            "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8?w=400&q=80",
            "https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?w=400&q=80",
            "https://images.unsplash.com/photo-1683533738338-19b9a22c6405?w=400&q=80",
            "https://images.unsplash.com/photo-1772730064951-89b427965dbc?w=400&q=80",
            "https://images.unsplash.com/photo-1764311792750-c10a9b45178f?w=400&q=80",
            "https://images.unsplash.com/photo-1697155406121-9f327348c43a?w=400&q=80"
    );

    private static final List<String> SOUTH_INDIAN_IMAGES = List.of(
            "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80",
            "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80",
            "https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=400&q=80",
            "https://images.unsplash.com/photo-1683533678036-46ec6a0163d9?w=400&q=80"
    );

    private static final List<String> NOODLES_IMAGES = List.of(
            "https://images.unsplash.com/photo-1772729219168-af0f0e57bb9c?w=400&q=80",
            "https://images.unsplash.com/photo-1652937916838-09b9c2ff8b45?w=400&q=80",
            "https://images.unsplash.com/photo-1767324672643-c4979362f922?w=400&q=80",
            "https://images.unsplash.com/photo-1761807766309-13758814cd6c?w=400&q=80",
            "https://images.unsplash.com/photo-1634864572872-a01c21e388d4?w=400&q=80",
            "https://images.unsplash.com/photo-1760699609029-01bcc566ab50?w=400&q=80"
    );

    private static final List<String> FRIED_RICE_IMAGES = List.of(
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
            "https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?w=400&q=80",
            "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80",
            "https://images.unsplash.com/photo-1723691802798-fa6efc67b2c9?w=400&q=80"
    );

    private static final List<String> DUMPLINGS_IMAGES = List.of(
            "https://images.unsplash.com/photo-1595424265370-3e02d3e6c10c?w=400&q=80",
            "https://images.unsplash.com/photo-1775883379159-6b9c8e3ed8df?w=400&q=80",
            "https://images.unsplash.com/photo-1762418967889-10abec43c325?w=400&q=80",
            "https://images.unsplash.com/photo-1585144570566-1a24c4502bbe?w=400&q=80"
    );

    private static final List<String> DEFAULT_FOOD_IMAGES = List.of(
            "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400&q=80",
            "https://images.unsplash.com/photo-1539735257177-0d3949225f96?w=400&q=80",
            "https://images.unsplash.com/photo-1539735776517-befcae86494d?w=400&q=80",
            "https://images.unsplash.com/photo-1519077336050-4ca5cac9d64f?w=400&q=80",
            "https://images.unsplash.com/photo-1535400255456-984241443b29?w=400&q=80",
            "https://images.unsplash.com/photo-1669472546359-418a98630699?w=400&q=80"
    );

    private static final String[] RESTAURANT_NAME_WORDS = {
            "Spicy", "Garden", "Kitchen", "Palace", "Wok", "Tandoor", "Biryani", "Curry",
            "Flavors", "Taste", "Hub", "Corner", "House", "Point", "Zone", "Express",
            "Delight", "Fusion", "Treat", "Basket", "Bowl", "Plate", "Cafe", "Diner",
            "Eatery", "Grill", "Oven", "Spice", "Masala", "Heaven", "Paradise", "Junction",
            "Station", "Square", "Court", "Market", "Place", "Stop", "Spot", "Den",
            "Lounge", "Bistro", "Barrel", "Kettle", "Wagon", "Cart", "Table", "Feast",
            "Bite", "Savor"
    };

    private static final List<CuisineTemplate> CUISINE_TEMPLATES = List.of(
            new CuisineTemplate(
                    Cuisine.builder().name("Indian").build(),
                    List.of("Paneer Butter Masala", "Dal Makhani", "Chana Masala", "Aloo Gobi", "Baingan Bharta",
                            "Palak Paneer", "Kadai Paneer", "Matar Paneer", "Shahi Paneer", "Paneer Tikka",
                            "Paneer Lababdar", "Malai Kofta", "Vegetable Korma", "Mix Veg Curry", "Bhindi Masala",
                            "Aloo Matar", "Jeera Aloo", "Dum Aloo", "Aloo Palak", "Gobi Manchurian",
                            "Vegetable Biryani", "Veg Pulao", "Jeera Rice", "Steamed Rice", "Veg Fried Rice",
                            "Lemon Rice", "Tamarind Rice", "Coconut Rice", "Curd Rice", "Sambar Rice",
                            "Masala Dosa", "Plain Dosa", "Rava Dosa", "Onion Dosa", "Uttapam",
                            "Idli Sambar", "Vada Sambar", "Pongal", "Upma", "Poha",
                            "Aloo Paratha", "Paneer Paratha", "Gobi Paratha", "Mooli Paratha", "Plain Paratha",
                            "Chole Bhature", "Puri Bhaji", "Kachori", "Samosa", "Pakora",
                            "Paneer Roll", "Veg Roll", "Spring Roll", "Momos", "Pav Bhaji",
                            "Misal Pav", "Vada Pav", "Dabeli", "Kathi Kabab", "Frankie",
                            "Rasgulla", "Gulab Jamun", "Jalebi", "Kheer", "Rasmalai",
                            "Gajar Halwa", "Moong Dal Halwa", "Kaju Katli", "Barfi", "Ladoo",
                            "Naan", "Butter Naan", "Garlic Naan", "Tandoori Roti", "Roomali Roti",
                            "Lachha Paratha", "Missi Roti", "Kulcha", "Sheermal", "Taftan",
                            "Dal Tadka", "Panchmel Dal", "Rajma", "Chole", "Kadhi Pakora",
                            "Mango Lassi", "Sweet Lassi", "Salt Lassi", "Buttermilk", "Masala Chaas",
                            "Masala Chai", "Filter Coffee", "Badam Milk", "Rose Milk", "Thandai",
                            "Papad", "Raita", "Salad", "Pickle", "Green Chutney"),
                    List.of("Butter Chicken", "Chicken Tikka Masala", "Chicken Korma", "Chicken Curry", "Kadai Chicken",
                            "Chicken Lababdar", "Chicken Do Pyaza", "Chicken Bharta", "Chicken Saag", "Chicken Vindaloo",
                            "Chicken Kolhapuri", "Chicken Hyderabadi", "Chicken Chettinad", "Chicken Madras", "Chicken Malabar",
                            "Chicken Biryani", "Mutton Biryani", "Egg Biryani", "Chicken Fried Rice", "Chicken Pulao",
                            "Tandoori Chicken", "Chicken Tikka", "Chicken Seekh Kabab", "Chicken Malai Tikka", "Chicken Reshmi Kabab",
                            "Mutton Rogan Josh", "Mutton Korma", "Mutton Curry", "Keema Matar", "Boti Kabab",
                            "Fish Curry", "Fish Fry", "Fish Tikka", "Prawn Curry", "Prawn Masala",
                            "Egg Curry", "Egg Bhurji", "Egg Masala", "Omelette", "Boiled Eggs",
                            "Chicken Momos", "Chicken Roll", "Chicken Shawarma", "Chicken Burger", "Chicken Pizza",
                            "Mutton Biryani Hyderabadi", "Chicken Dum Biryani", "Mutton Keema Biryani", "Chicken Tikka Biryani", "Fish Biryani",
                            "Chicken 65", "Chicken Manchurian", "Chilli Chicken", "Chicken Lollipop", "Dragon Chicken",
                            "Butter Garlic Prawns", "Prawn Fry", "Squid Masala", "Crab Masala", "Surmai Fry",
                            "Rohu Curry", "Pomfret Fry", "Rawas Tikka", "Bangda Fry", "Bombil Fry",
                            "Chicken Shorba", "Mutton Shorba", "Chicken Haleem", "Nihari", "Payaa",
                            "Chicken Changezi", "Chicken Angara", "Mutton Raan", "Chicken Afghani", "Chicken Reshmi",
                            "Tandoori Fish", "Fish Amritsari", "Mutton Keema Kaleji", "Chicken Patiala", "Mutton Chaap",
                            "Egg Fried Rice", "Chicken Hakka Noodles", "Chicken Schezwan Rice", "Mutton Keema Paratha", "Chicken Keema Roll",
                            "Chicken Tandoori Momos", "Chicken Afghani Momos", "Mutton Galouti Kabab", "Shami Kabab", "Kakori Kabab",
                            "Chicken Achari", "Mutton Saag", "Chicken Mughlai", "Chicken Nawabi", "Mutton Shahi Korma",
                            "Chicken Methi Malai", "Chicken Badami", "Mutton Pasanda", "Chicken Lazeez", "Fish Kerala Style")
            ),
            new CuisineTemplate(
                    Cuisine.builder().name("Chinese").build(),
                    List.of("Veg Hakka Noodles", "Veg Schezwan Noodles", "Veg Chow Mein", "Veg Singapore Noodles", "Veg Pan Fried Noodles",
                            "Veg Fried Rice", "Veg Schezwan Rice", "Veg Triple Fried Rice", "Veg Burnt Garlic Rice", "Veg Hong Kong Rice",
                            "Veg Manchurian Gravy", "Veg Manchurian Dry", "Veg Sweet Corn Soup", "Veg Hot and Sour Soup", "Veg Manchow Soup",
                            "Veg Lemon Coriander Soup", "Veg Talumein Soup", "Veg Wonton Soup", "Veg Clear Soup", "Veg Noodle Soup",
                            "Veg Spring Roll", "Veg Cheese Roll", "Veg Pan Roll", "Veg Cigar Roll", "Veg Sesame Toast",
                            "Crispy Veg", "Veg Salt and Pepper", "Veg Chilli Dry", "Veg Garlic Sauce", "Veg Black Bean Sauce",
                            "Veg Oyster Sauce", "Veg Hunan Sauce", "Veg Szechuan Sauce", "Veg Kung Pao", "Veg Teriyaki",
                            "Veg Mapo Tofu", "Veg Chop Suey", "Veg Kway Teow", "Veg Pad Thai Style", "Veg Lo Mein",
                            "Veg Udon Noodles", "Veg Ramen Style", "Veg Glass Noodles", "Veg Rice Noodles", "Veg Vermicelli",
                            "Veg Dim Sum", "Veg Dumplings", "Veg Wontons", "Veg Bao Buns", "Veg Potstickers",
                            "Veg Tofu Stir Fry", "Veg Tofu in Black Bean Sauce", "Veg Tofu Kung Pao", "Veg Tofu Teriyaki", "Crispy Tofu",
                            "Veg Bean Curd Home Style", "Veg Bean Curd Szechuan Style", "Veg Eggplant in Garlic Sauce", "Veg Eggplant Yu Xiang", "Veg Bitter Melon Stir Fry",
                            "Veg Bok Choy", "Veg Chinese Broccoli", "Veg Snow Peas", "Veg Water Chestnuts", "Veg Bamboo Shoots",
                            "Veg Baby Corn", "Veg Straw Mushrooms", "Veg Black Fungus", "Veg Lily Buds", "Veg Lotus Root",
                            "Veg French Beans", "Veg Asparagus", "Veg Celery", "Veg Bell Peppers", "Veg Zucchini",
                            "Veg Pumpkin", "Veg Sweet Potato", "Veg Taro", "Veg Yam", "Veg Lotus Stem",
                            "Veg Schezwan Tofu", "Veg Crispy Lotus Stem", "Veg Water Spinach", "Veg Choy Sum", "Veg Napa Cabbage",
                            "Veg Shanghai Greens", "Veg Chinese Cabbage", "Veg Pak Choi", "Veg Kai Lan", "Veg Pea Shoots",
                            "Veg Enoki Mushrooms", "Veg Shiitake Mushrooms", "Veg Oyster Mushrooms", "Veg King Oyster", "Veg Wood Ear",
                            "Veg Hot Pot", "Veg Clay Pot Rice", "Veg Clay Pot Noodles", "Veg Clay Pot Tofu", "Veg Sizzler",
                            "Veg Mongolian", "Veg Cantonese Style", "Veg Shanghainese Style", "Veg Beijing Style", "Veg Sichuan Style"),
                    List.of("Chicken Hakka Noodles", "Chicken Schezwan Noodles", "Chicken Chow Mein", "Chicken Singapore Noodles", "Chicken Pan Fried Noodles",
                            "Chicken Fried Rice", "Chicken Schezwan Rice", "Chicken Triple Fried Rice", "Chicken Burnt Garlic Rice", "Chicken Hong Kong Rice",
                            "Chicken Manchurian Gravy", "Chicken Manchurian Dry", "Chicken Sweet Corn Soup", "Chicken Hot and Sour Soup", "Chicken Manchow Soup",
                            "Chicken Lemon Coriander Soup", "Chicken Talumein Soup", "Chicken Wonton Soup", "Chicken Clear Soup", "Chicken Noodle Soup",
                            "Chicken Spring Roll", "Chicken Cheese Roll", "Chicken Pan Roll", "Chicken Cigar Roll", "Chicken Sesame Toast",
                            "Crispy Chicken", "Chicken Salt and Pepper", "Chicken Chilli Dry", "Chicken Garlic Sauce", "Chicken Black Bean Sauce",
                            "Chicken Oyster Sauce", "Chicken Hunan Sauce", "Chicken Szechuan Sauce", "Chicken Kung Pao", "Chicken Teriyaki",
                            "Chicken Mapo Style", "Chicken Chop Suey", "Chicken Kway Teow", "Chicken Pad Thai Style", "Chicken Lo Mein",
                            "Chicken Udon Noodles", "Chicken Ramen Style", "Chicken Dim Sum", "Chicken Dumplings", "Chicken Wontons",
                            "Chicken Bao Buns", "Chicken Potstickers", "Chicken Feet", "Chicken Gizzard", "Chicken Liver",
                            "Roast Duck", "Duck Noodles", "Duck Rice", "Duck Pancakes", "Duck Spring Roll",
                            "Lamb Noodles", "Lamb Fried Rice", "Lamb in Black Bean Sauce", "Lamb Chop Suey", "Lamb Szechuan Style",
                            "Seafood Noodles", "Seafood Fried Rice", "Seafood Hot Pot", "Seafood Clay Pot", "Seafood Sizzler",
                            "Prawn Noodles", "Prawn Fried Rice", "Prawn Dim Sum", "Prawn Dumplings", "Prawn Wontons",
                            "Prawn Toast", "Prawn Crackers", "Prawn Spring Roll", "Prawn Tempura", "Prawn Salt and Pepper",
                            "Squid Noodles", "Squid Fried Rice", "Squid in Salt and Pepper", "Squid in Black Bean Sauce", "Squid Ring",
                            "Fish Fillet", "Steamed Fish", "Fried Fish", "Fish in Ginger Soy", "Fish in Black Bean Sauce",
                            "Fish with Tofu", "Fish Head Curry Style", "Fish Maw Soup", "Fish Ball Noodles", "Fish Ball Soup",
                            "Crab Noodles", "Crab Fried Rice", "Crab in Black Bean Sauce", "Crab in Salt and Pepper", "Crab Roe",
                            "Lobster Noodles", "Lobster Fried Rice", "Lobster in Ginger Spring Onion", "Lobster in Superior Broth", "Lobster Sashimi Style",
                            "Abalone", "Sea Cucumber", "Fish Maw", "Shark Fin", "Bird Nest",
                            "Oyster Omelette", "Clams in Black Bean Sauce", "Mussels in Ginger Spring Onion", "Scallops in XO Sauce", "Geoduck")
            ),
            new CuisineTemplate(
                    Cuisine.builder().name("Italian").build(),
                    List.of("Margherita Pizza", "Marinara Pizza", "Quattro Formaggi Pizza", "Capricciosa Pizza", "Vegetariana Pizza",
                            "Funghi Pizza", "Spinaci Pizza", "Patate Pizza", "Zucchini Pizza", "Melanzane Pizza",
                            "Pomodoro Pizza", "Bianca Pizza", "Rosemary Potato Pizza", "Rocket Parmesan Pizza", "Olive Pizza",
                            "Onion Pizza", "Pepper Pizza", "Artichoke Pizza", "Asparagus Pizza", "Broccoli Pizza",
                            "Penne Arrabbiata", "Penne Aglio Olio", "Penne Pesto", "Penne Primavera", "Penne Puttanesca",
                            "Spaghetti Aglio Olio", "Spaghetti Pomodoro", "Spaghetti Pesto", "Spaghetti Cacio e Pepe", "Spaghetti Carbonara Vegetarian",
                            "Fettuccine Alfredo", "Fettuccine Pesto", "Fettuccine Mushroom", "Fettuccine Spinach", "Fettuccine Primavera",
                            "Linguine Vongole Style Veg", "Linguine Pesto", "Linguine Arrabbiata", "Linguine Aglio Olio", "Linguine Puttanesca",
                            "Rigatoni Arrabbiata", "Rigatoni Bolognese Veg", "Rigatoni Pesto", "Rigatoni Amatriciana Veg", "Rigatoni Norma",
                            "Farfalle Pesto", "Farfalle Arrabbiata", "Farfalle Primavera", "Farfalle Aglio Olio", "Farfalle Salmon Style Veg",
                            "Fusilli Pesto", "Fusilli Arrabbiata", "Fusilli Primavera", "Fusilli Aglio Olio", "Fusilli Puttanesca",
                            "Macaroni Cheese", "Macaroni Tomato", "Macaroni Pesto", "Macaroni Primavera", "Macaroni Arrabbiata",
                            "Gnocchi Pesto", "Gnocchi Tomato", "Gnocchi Butter Sage", "Gnocchi Arrabbiata", "Gnocchi Four Cheese",
                            "Ravioli Spinach Ricotta", "Ravioli Mushroom", "Ravioli Four Cheese", "Ravioli Pumpkin", "Ravioli Artichoke",
                            "Tortellini Spinach", "Tortellini Cheese", "Tortellini Mushroom", "Tortellini Pesto", "Tortellini Tomato",
                            "Lasagna Vegetarian", "Lasagna Spinach", "Lasagna Mushroom", "Lasagna Four Cheese", "Lasagna Pumpkin",
                            "Cannelloni Spinach", "Cannelloni Ricotta", "Cannelloni Mushroom", "Cannelloni Four Cheese", "Cannelloni Pumpkin",
                            "Risotto Mushroom", "Risotto Asparagus", "Risotto Pumpkin", "Risotto Zucchini", "Risotto Artichoke",
                            "Risotto Saffron", "Risotto Four Cheese", "Risotto Tomato", "Risotto Spinach", "Risotto Primavera",
                            "Minestrone Soup", "Pasta e Fagioli Soup", "Ribollita Soup", "Zuppa Toscana Veg", "Stracciatella Soup",
                            "Caprese Salad", "Panzanella Salad", "Insalata Mista", "Rocket Salad", "Caesar Salad Vegetarian",
                            "Bruschetta", "Bruschetta Pomodoro", "Bruschetta Funghi", "Bruschetta Olive", "Crostini",
                            "Focaccia Plain", "Focaccia Rosemary", "Focaccia Olive", "Focaccia Onion", "Focaccia Tomato",
                            "Garlic Bread", "Cheese Garlic Bread", "Herb Bread", "Olive Bread", "Tomato Bread",
                            "Arancini", "Suppli", "Croquettes", "Zucchini Fritters", "Eggplant Parmigiana",
                            "Caponata", "Peperonata", "Ratatouille Style", "Stuffed Peppers", "Stuffed Zucchini",
                            "Stuffed Mushrooms", "Stuffed Tomatoes", "Stuffed Eggplant", "Melanzane alla Parmigiana", "Parmigiana di Zucchine"),
                    List.of("Pepperoni Pizza", "Chicken Pizza", "BBQ Chicken Pizza", "Hawaiian Pizza", "Meat Lovers Pizza",
                            "Prosciutto Pizza", "Salami Pizza", "Sausage Pizza", "Bacon Pizza", "Ham Pizza",
                            "Spaghetti Bolognese", "Spaghetti Carbonara", "Spaghetti Meatballs", "Spaghetti Amatriciana", "Spaghetti alle Vongole",
                            "Penne Bolognese", "Penne with Chicken", "Penne with Salmon", "Penne with Sausage", "Penne with Ham",
                            "Fettuccine with Chicken", "Fettuccine with Salmon", "Fettuccine with Prawns", "Fettuccine with Ham", "Fettuccine with Bacon",
                            "Linguine alle Vongole", "Linguine with Prawns", "Linguine with Crab", "Linguine with Lobster", "Linguine with Seafood",
                            "Rigatoni with Sausage", "Rigatoni with Meatballs", "Rigatoni with Chicken", "Rigatoni Amatriciana", "Rigatoni with Bacon",
                            "Ravioli Meat", "Ravioli Lobster", "Ravioli Prawn", "Ravioli Duck",
                            "Tortellini in Brodo", "Tortellini with Meat", "Tortellini with Chicken", "Tortellini with Prosciutto", "Tortellini with Bacon",
                            "Lasagna Bolognese", "Lasagna with Meat", "Lasagna with Chicken", "Lasagna with Ham", "Lasagna with Bacon",
                            "Cannelloni Meat", "Cannelloni Bolognese", "Cannelloni with Ham", "Cannelloni with Chicken", "Cannelloni with Prosciutto",
                            "Risotto with Prawns", "Risotto with Seafood", "Risotto with Chicken", "Risotto with Duck", "Risotto with Sausage",
                            "Risotto with Prosciutto", "Risotto with Bacon", "Risotto with Meat", "Risotto Milanese", "Risotto with Bone Marrow",
                            "Osso Buco", "Veal Scaloppine", "Veal Parmigiana", "Veal Saltimbocca", "Veal Marsala",
                            "Chicken Parmigiana", "Chicken Marsala", "Chicken Piccata", "Chicken Saltimbocca", "Chicken Cacciatore",
                            "Chicken Milanese", "Chicken Scarpariello", "Chicken Vesuvio", "Chicken Francese", "Chicken Sorrentino",
                            "Pollo alla Cacciatora", "Pollo alla Diavola", "Pollo alla Pizzaiola", "Pollo al Limone", "Pollo alla Griglia",
                            "Saltimbocca alla Romana", "Involtini", "Rollatini", "Braciole", "Spezzatino",
                            "Bistecca alla Fiorentina", "Tagliata", "Carne Cruda", "Straccetti", "Scaloppine al Limone",
                            "Vitello Tonnato", "Cotoletta alla Milanese", "Cotoletta alla Bolognese", "Costolette di Agnello", "Agnello Scottadito",
                            "Abbacchio", "Porchetta", "Salsiccia", "Cotechino", "Zampone",
                            "Bollito Misto", "Carpaccio", "Tartare", "Tonnato", "Peposo",
                            "Stinco di Maiale", "Costine di Maiale", "Maiale al Latte", "Arista", "Cinghiale",
                            "Anatra", "Faraona", "Quaglia", "Piccione", "Lepre",
                            "Prosciutto di Parma", "Prosciutto San Daniele", "Speck", "Bresaola", "Mortadella",
                            "Salami", "Pancetta", "Guanciale", "Lardo", "Coppa",
                            "Calamari Fritti", "Calamari Griglia", "Gamberoni", "Scampi", "Gamberetti",
                            "Cozze", "Vongole", "Capesante", "Astice", "Aragosta")
            )
    );

    private static final String[][] CITIES = {
            {"Mumbai", "400"},
            {"Pune", "411"},
            {"Bangalore", "560"}
    };

    private static final String[] STREET_PREFIXES = {
            "MG Road", "Main Street", "Station Road", "Market Street", "Highway",
            "Park Avenue", "Lake View", "Hill Road", "College Road", "Temple Street",
            "Church Road", "Hospital Lane", "Circle", "Square", "Plaza", "Centre",
            "Complex", "Nagar", "Colony", "Society", "Apartments", "Heights", "Towers",
            "Building", "Estate", "Vihar", "Enclave", "Gardens", "Residency"
    };

    private final Random random = new Random();
    private final RestaurantRepository restaurantRepository;
    private final FoodItemRepository foodItemRepository;
    private final CuisineRepository cuisineRepository;

    @Override
    public void run(String... args) {
        if (cuisineRepository.count() > 0) {
            return;
        }

        CUISINE_TEMPLATES.forEach(template -> cuisineRepository.save(template.cuisine));
        for (String[] cityData : CITIES) {
            String cityName = cityData[0];
            String pincode;

            System.out.println("Creating restaurants for " + cityName + "...");

            for (int i = 0; i < NO_OF_RESTAURANTS_PER_CITY; i++) {
                pincode = cityData[1] + random.nextInt(100, 999);
                Restaurant restaurant = restaurantRepository.save(createRandomRestaurant(cityName, pincode));
                addFoodItemsToRestaurant(restaurant);
            }
        }
        System.out.println("Seed data loaded successfully!");
        System.out.println("Cuisines: " + cuisineRepository.count());
        System.out.println("Restaurants: " + restaurantRepository.count());
        System.out.println("Food Items: " + foodItemRepository.count());
    }

    private Restaurant createRandomRestaurant(String cityName, String pincode) {
        return Restaurant.builder()
                .name(generateRestaurantName())
                .address(generateAddress(cityName))
                .pincode(pincode)
                .imageUrl(RESTAURANT_IMAGES.get(random.nextInt(RESTAURANT_IMAGES.size())))
                .rating(Math.round((3.0 + (random.nextDouble() * 2.0)) * 10.0) / 10.0)
                .ratingCount(random.nextInt(4901) + 100)
                .build();
    }

    private String generateRestaurantName() {
        int firstWordIndex = random.nextInt(RESTAURANT_NAME_WORDS.length);
        int secondWordIndex = firstWordIndex;
        while (secondWordIndex == firstWordIndex) {
            secondWordIndex = random.nextInt(RESTAURANT_NAME_WORDS.length);
        }
        return RESTAURANT_NAME_WORDS[firstWordIndex] + " " + RESTAURANT_NAME_WORDS[secondWordIndex];
    }

    private String generateAddress(String cityName) {
        int streetNumber = random.nextInt(1, 201);
        String street = STREET_PREFIXES[random.nextInt(STREET_PREFIXES.length)];
        return streetNumber + " " + street + ", " + cityName;
    }

    private String getImageForFoodItem(String name) {
        String lower = name.toLowerCase();
        List<String> pool;
        if (lower.contains("pizza")) {
            pool = PIZZA_IMAGES;
        } else if (lower.contains("spaghetti") || lower.contains("penne") || lower.contains("fettuccine")
                || lower.contains("linguine") || lower.contains("rigatoni") || lower.contains("farfalle")
                || lower.contains("fusilli") || lower.contains("macaroni") || lower.contains("gnocchi")
                || lower.contains("ravioli") || lower.contains("tortellini") || lower.contains("lasagna")
                || lower.contains("cannelloni") || lower.contains("pasta")) {
            pool = PASTA_IMAGES;
        } else if (lower.contains("risotto")) {
            pool = RISOTTO_IMAGES;
        } else if (lower.contains("biryani")) {
            pool = BIRYANI_IMAGES;
        } else if (lower.contains("dosa") || lower.contains("idli") || lower.contains("uttapam")
                || lower.contains("vada") || lower.contains("pongal") || lower.contains("upma")) {
            pool = SOUTH_INDIAN_IMAGES;
        } else if (lower.contains("noodles") || lower.contains("chow mein") || lower.contains("lo mein")
                || lower.contains("ramen") || lower.contains("udon")) {
            pool = NOODLES_IMAGES;
        } else if (lower.contains("fried rice")) {
            pool = FRIED_RICE_IMAGES;
        } else if (lower.contains("momos") || lower.contains("dumpling") || lower.contains("dim sum")
                || lower.contains("wonton") || lower.contains("bao") || lower.contains("potsticker")) {
            pool = DUMPLINGS_IMAGES;
        } else {
            pool = DEFAULT_FOOD_IMAGES;
        }
        return pool.get(random.nextInt(pool.size()));
    }

    private void addFoodItemsToRestaurant(Restaurant restaurant) {
        CuisineTemplate cuisineTemplate = CUISINE_TEMPLATES.get(random.nextInt(CUISINE_TEMPLATES.size()));
        cuisineTemplate.vegFoodItems
                .stream()
                .filter(x -> random.nextInt() % 5 == 0)
                .limit(10)
                .forEach(vegFood -> foodItemRepository.save(FoodItem.builder()
                        .name(vegFood)
                        .price(new BigDecimal(random.nextInt(401) + 100))
                        .isVeg(true)
                        .imageUrl(getImageForFoodItem(vegFood))
                        .restaurant(restaurant)
                        .cuisine(cuisineTemplate.cuisine)
                        .build()));
        cuisineTemplate.nonvegFoodItems
                .stream()
                .filter(x -> random.nextInt() % 5 == 0)
                .limit(10)
                .forEach(nonVegFood -> foodItemRepository.save(FoodItem.builder()
                        .name(nonVegFood)
                        .price(new BigDecimal(random.nextInt(401) + 100))
                        .isVeg(false)
                        .imageUrl(getImageForFoodItem(nonVegFood))
                        .restaurant(restaurant)
                        .cuisine(cuisineTemplate.cuisine)
                        .build()));
    }

    @AllArgsConstructor
    private static class CuisineTemplate {
        Cuisine cuisine;
        List<String> vegFoodItems;
        List<String> nonvegFoodItems;
    }
}