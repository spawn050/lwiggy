import { Button, Container, Typography } from "@mui/material";
import { logout } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/");
  // };

  return (
    <Container sx={{ mt: 8 }}>
      <Navbar></Navbar>
      <Typography variant="h5">Dashboard</Typography>
      {/* <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>Logout</Button> */}

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
