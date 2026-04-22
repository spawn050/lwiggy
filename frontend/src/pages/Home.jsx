import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material'
import RestaurantCard from '../components/RestaurantCard.jsx'
import { getRestaurants, searchRestaurants } from '../services/restaurantService.js'

const DEFAULT_PINCODE = '400439'

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const userPincode = useSelector((state) => state.auth.user?.pincode)

    const pincode = isLoggedIn && userPincode ? userPincode : DEFAULT_PINCODE

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true)
            setError('')
            try {
                const data = query.trim()
                    ? await searchRestaurants(pincode, query.trim())
                    : await getRestaurants(pincode)
                setRestaurants(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [query, pincode])

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
                    {query ? `Results for "${query}"` : 'Restaurants near you'}
                </Typography>
                {restaurants.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography variant="h6" color="#93959f">No restaurants found</Typography>
                        {query && (
                            <Typography variant="body2" color="#93959f" sx={{ mt: 1 }}>
                                Try searching for something else
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {restaurants.map((restaurant) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={restaurant.id}>
                                <RestaurantCard restaurant={restaurant} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}