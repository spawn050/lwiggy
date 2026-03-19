import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography, Divider, Chip, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { getRestaurantById } from '../services/restaurantService.js'

export default function RestaurantPage() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                const data = await getRestaurantById(id)
                setRestaurant(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchRestaurant()
    }, [id])

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
        <Box>
            <Box
                component="img"
                src={restaurant.image_url}
                alt={restaurant.name}
                sx={{ width: '100%', height: { xs: 200, md: 300 }, objectFit: 'cover', display: 'block' }}
            />

            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Box
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 3,
                        border: '1px solid rgba(2,6,12,0.08)',
                        boxShadow: '0 2px 8px rgba(27,30,36,0.08)',
                        p: 3,
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" fontWeight={800} color="#3d4152" sx={{ mb: 1 }}>
                        {restaurant.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 0.3,
                                bgcolor: '#48c479', borderRadius: 1, px: 0.8, py: 0.3,
                            }}
                        >
                            <StarIcon sx={{ color: '#fff', fontSize: 14 }} />
                            <Typography variant="body2" color="#fff" fontWeight={700}>
                                {restaurant.rating}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="#686b78">
                            ({restaurant.rating_count.toLocaleString()} ratings)
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                        {restaurant.cuisines.map((cuisine) => (
                            <Chip
                                key={cuisine}
                                label={cuisine}
                                size="small"
                                sx={{ bgcolor: '#fff5f0', color: '#FF5200', fontWeight: 600, fontSize: 12 }}
                            />
                        ))}
                    </Box>

                    <Typography variant="body2" color="#686b78">
                        {restaurant.address}
                    </Typography>
                </Box>

                <Typography variant="h6" fontWeight={700} color="#3d4152" sx={{ mb: 2 }}>
                    Menu
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box>
                    {restaurant.menu.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}