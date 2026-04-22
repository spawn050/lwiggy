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

    // Cities with their pincode prefixes
    private static final String[][] CITIES = {
            {"Mumbai", "400"},
            {"Pune", "411"},
            {"Bangalore", "560"}
    };

    // Street name prefixes/suffixes for addresses
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
        // skip if data already exists
        if (cuisineRepository.count() > 0) {
            return;
        }

        CUISINE_TEMPLATES.forEach(template -> cuisineRepository.save(template.cuisine));
        for (String[] cityData : CITIES) {
            String cityName = cityData[0];
            String pincode = cityData[1] + random.nextInt(100, 999);

            System.out.println("Creating restaurants for " + cityName + "...");

            for (int i = 0; i < NO_OF_RESTAURANTS_PER_CITY; i++) {
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
        String name = generateRestaurantName();
        return Restaurant.builder()
                .name(name)
                .address(generateAddress(cityName))
                .pincode(pincode)
                .imageUrl("https://placehold.co/400x200?text=" + name.replace(" ", "+"))
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