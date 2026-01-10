import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Divider, Button, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { restaurants } from "../data/restaurants";
import { useCart } from "../context/CartContext";

export default function RestaurantDetails() {
    const { id } = useParams();
    const { cart, addToCart, removeFromCart } = useCart();
    const restaurant = restaurants.find((r) => r.id === parseInt(id));

    const getQuantity = (itemId) => {
        const item = cart.find((i) => i.id === itemId);
        return item ? item.quantity : 0;
    };

    if (!restaurant) {
        return (
            <>
                <Navbar />
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h5">Restaurant not found</Typography>
                </Container>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
                {/* Header Section */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {restaurant.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {restaurant.cuisine}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {restaurant.location}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <AccessTimeIcon fontSize="small" />
                                <Typography fontWeight="bold">{restaurant.time}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <CurrencyRupeeIcon fontSize="small" />
                                <Typography fontWeight="bold">{restaurant.priceForTwo} for two</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 1, textAlign: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "green", gap: 0.5, mb: 1, borderBottom: "1px solid #e0e0e0", pb: 1 }}>
                            <StarIcon fontSize="small" />
                            <Typography fontWeight="bold">{restaurant.rating}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">1K+ ratings</Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderStyle: "dashed", mb: 4 }} />

                {/* Menu Section */}
                {restaurant.menu && restaurant.menu.map((category, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            {category.category} ({category.items.length})
                        </Typography>

                        {category.items.map((item) => (
                            <Box key={item.id}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", py: 3 }}>
                                    {/* Left Side: Info */}
                                    <Box sx={{ flex: 1, pr: 2 }}>
                                        {item.isVeg ? (
                                            <Box sx={{ border: "1px solid green", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                                                <Box sx={{ bgcolor: "green", width: 8, height: 8, borderRadius: "50%" }} />
                                            </Box>
                                        ) : (
                                            <Box sx={{ border: "1px solid red", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                                                <Box sx={{ bgcolor: "red", width: 8, height: 8, borderRadius: "50%" }} />
                                            </Box>
                                        )}
                                        <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>₹{item.price}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                    </Box>

                                    {/* Right Side: Image & Button */}
                                    <Box sx={{ position: "relative", width: 118, height: 96 }}>
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.name}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                                        />

                                        {getQuantity(item.id) > 0 ? (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    bottom: -12,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    bgcolor: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    borderRadius: 1,
                                                    border: "1px solid #2e7d32", // success color
                                                    minWidth: 80,
                                                    height: 36.5, // Match button height approx
                                                    boxShadow: 1
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    sx={{ minWidth: 25, color: "green", fontWeight: "bold" }}
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    -
                                                </Button>
                                                <Typography variant="body2" fontWeight="bold" color="success.main">
                                                    {getQuantity(item.id)}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    sx={{ minWidth: 25, color: "green", fontWeight: "bold" }}
                                                    onClick={() => addToCart(item)}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="success"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: -12,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    bgcolor: "white",
                                                    fontWeight: "bold",
                                                    minWidth: 80,
                                                    ":hover": { bgcolor: "white" }
                                                }}
                                                onClick={() => addToCart(item)}
                                            >
                                                ADD
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                ))}
            </Container >
            <Footer />
        </>
    );
}
