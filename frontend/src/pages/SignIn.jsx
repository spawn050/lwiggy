import React, {useState} from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
  const [form, setForm] = useState({ email:"", password:"" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const body = await res.json();
      if(res.ok){
        navigate("/dashboard"); 
      } else {
        setMsg(body.message || "Login failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h5">Sign in</Typography>
        <TextField label="Email" name="email" value={form.email} onChange={onChange} fullWidth />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={onChange} fullWidth />
        <Button variant="contained" onClick={onSubmit}>Sign in</Button>
        <Typography variant="body2">Don't have an account? <a href="/signup">Sign up</a></Typography>
        {msg && <Typography color="error">{msg}</Typography>}
      </Box>
    </Container>
  );
}
