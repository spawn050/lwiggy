import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material'
import { login } from '../store/authSlice.js'
import { login as loginApi } from '../services/authService.js'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { user } = await loginApi(email, password)
            dispatch(login(user))   
            navigate('/')           
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
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
                    Sign In
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

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

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        bgcolor: '#FF5200',
                        '&:hover': { bgcolor: '#e04800' },
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
                </Button>

                <Typography variant="body2" textAlign="center" color="#686b78">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#FF5200', fontWeight: 600 }}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}