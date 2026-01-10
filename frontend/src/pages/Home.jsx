import { Grid, Container } from "@mui/material";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { restaurants } from "../data/restaurants";

export default function Home() {
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
