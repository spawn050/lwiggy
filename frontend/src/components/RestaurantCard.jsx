import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";
export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      sx={{
        width: 300,
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6
        }
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="180"
        image={restaurant.image}
        alt={restaurant.name}
      />

      <CardContent>
        {/* Name + Rating */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography variant="h6" noWrap>
            {restaurant.name}
          </Typography>

          <Chip
            icon={<StarIcon sx={{ color: "white" }} />}
            label={restaurant.rating}
            sx={{
              bgcolor: "#267E3E",
              color: "white",
              fontWeight: "bold"
            }}
            size="small"
          />
        </Box>

        {/* Cuisine */}
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
        >
          {restaurant.cuisine}
        </Typography>

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          mt={1}
        >
          <Typography variant="body2">
            {restaurant.time}
          </Typography>
          <Typography variant="body2">
            ₹{restaurant.priceForTwo} for two
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
