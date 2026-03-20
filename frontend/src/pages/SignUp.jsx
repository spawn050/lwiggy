import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'

const CITIES = ['Mumbai', 'Bangalore', 'Pune']

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(login({ name, email }))
        navigate('/')
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f0f0f5',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h5" fontWeight={700} color="#3d4152">
                    Sign Up
                </Typography>

                <TextField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Area"
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    select
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    fullWidth
                >
                    {CITIES.map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    fullWidth
                    inputProps={{ maxLength: 6 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: '#FF5200',
                        '&:hover': { bgcolor: '#e04800' },
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    Sign Up
                </Button>

                <Typography variant="body2" textAlign="center" color="#686b78">
                    Already have an account?{' '}
                    <Link to="/signin" style={{ color: '#FF5200', fontWeight: 600 }}>
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}