import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getAllRestaurants } from "../api/restaurant";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllRestaurants()
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load restaurants. Is backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <Container sx={{ mt: 4, textAlign: "center" }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4, textAlign: "center" }}><Typography color="error">{error}</Typography></Container>;

  return (
    <>
      <Navbar className="xyz" />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {restaurants.map(r => (
            <Grid item key={r.id}>
              <RestaurantCard restaurant={r} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
