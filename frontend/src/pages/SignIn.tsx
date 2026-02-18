import { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../types";

export default function SignIn(){
  const [form, setForm] = useState<LoginForm>({ email:"", password:"" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form);
      if(res.ok){
        navigate("/dashboard"); 
      } else {
        const body = await res.json();
        setErrorMsg(body.message || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Network error");
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
        {errorMsg && <Typography color="error">{errorMsg}</Typography>}
      </Box>
    </Container>
  );
}
