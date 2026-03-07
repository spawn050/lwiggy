import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { fetchRestaurants } from "../../api/Api";

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    console.log("useEffect called")
    const loadRestaurants = async () => {
      const response = await fetchRestaurants();
      const data = await response.json();
      setRestaurants(data.data as any);
    };
    loadRestaurants();
  }, []);

  return (
    <Container sx={{ mt: 8 }}>
      <Navbar></Navbar>

      {restaurants.map(restaurant => {
        return (
          <Card variant="outlined" sx={{display: 'flex'}}>
            <Stack direction="row" sx={{ width: '100%' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>{restaurant.name}</CardContent>
            </Stack>
          </Card>
        );
      })}

      {/* // adding some dummy text to extend the page for dev testing */}
      {(() => {
        var list: any[] = [];
        for (var i = 1; i < 0; i++) {
          list = list.concat(<Typography>Dummy</Typography>)
        }
        return list;
      })()}
    </Container>
  );
}
