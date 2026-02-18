import { Button, Container, Typography } from "@mui/material";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5">Dashboard</Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
}
