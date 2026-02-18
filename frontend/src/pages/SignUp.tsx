import { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../types";

export default function SignUp(){
  const [form, setForm] = useState<RegisterForm>({ name:"", email:"", password:"" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form);
      if(res.ok) {
        setMsg("Registered — redirecting to sign in...");
        setTimeout(()=>navigate("/"), 800);
      } else {
        const body = await res.json();
        setMsg(body.message || "Registration failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h5">Create account</Typography>
        <TextField label="Full name" name="name" value={form.name} onChange={onChange} fullWidth />
        <TextField label="Email" name="email" value={form.email} onChange={onChange} fullWidth />
        <TextField label="Password" name="password" value={form.password} onChange={onChange} type="password" fullWidth />
        <Button variant="contained" onClick={onSubmit}>Sign up</Button>
        <Typography variant="body2">Already have an account? <Link to="/">Sign in</Link></Typography>
        {msg && <Typography color="error">{msg}</Typography>}
      </Box>
    </Container>
  );
}
