import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [location, setLocation] = useState("Mumbai, India");
  const open = Boolean(anchorEl);

  const handleLocationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
    handleClose();
  };

  const handleLogout = async () => {
    // call backend logout later (cookie removal)
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ff5200" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Left side logo */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Lwiggy
          </Typography>
        </Box>

        {/* Location Tab */}
        <Box
          sx={{ display: "flex", alignItems: "center", ml: 4, cursor: "pointer", flexGrow: 1 }}
          onClick={handleLocationClick}
        >
          <LocationOnIcon sx={{ mr: 1, color: "white" }} />
          <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
            {location}
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "white" }} />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: { width: 320, maxWidth: '100%' }
          }}
        >
          <MenuItem onClick={() => handleLocationSelect("Mumbai, India")}>
            <ListItemIcon>
              <MyLocationIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Detect current location"
              secondary="Using GPS"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
            />
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">
              SAVED ADDRESSES
            </Typography>
          </Box>

          <MenuItem onClick={() => handleLocationSelect("B-404, Oberoi Springs")}>
            <ListItemIcon>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              secondary="B-404, Oberoi Springs"
            />
          </MenuItem>

          <MenuItem onClick={() => handleLocationSelect("WeWork, BKC")}>
            <ListItemIcon>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Work"
              secondary="WeWork, BKC"
            />
          </MenuItem>
        </Menu>

        {/* Right side buttons */}
        <Box>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)"
              }
            }}
          >
            Logout
          </Button>

          <Button
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingBagIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
