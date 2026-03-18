import { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material'
import RestaurantCard from '../components/RestaurantCard.jsx'
import { getRestaurants } from '../services/restaurantService.js'

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const data = await getRestaurants('110001')
                setRestaurants(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchRestaurants()
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress sx={{ color: '#FF5200' }} />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" fontWeight={700} color="#3d4152" sx={{ mb: 3 }}>
                    Restaurants near you
                </Typography>
                <Grid container spacing={3}>
                    {restaurants.map((restaurant) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={restaurant.id}>
                            <RestaurantCard restaurant={restaurant} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}