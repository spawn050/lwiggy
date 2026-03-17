import { Box, Container, Grid, Typography } from '@mui/material'
import RestaurantCard from '../components/RestaurantCard.jsx'

const mockRestaurants = [
    {
        id: 1,
        name: 'Tandoor Palace',
        address: 'Connaught Place, New Delhi',
        pincode: '110001',
        image_url: 'https://picsum.photos/seed/rest1/400/200',
        rating: 4.3,
        rating_count: 2341,
        cuisines: ['North Indian', 'Mughlai'],
    },
    {
        id: 2,
        name: 'Dosa Hut',
        address: 'Indiranagar, Bengaluru',
        pincode: '560038',
        image_url: 'https://picsum.photos/seed/rest2/400/200',
        rating: 4.1,
        rating_count: 987,
        cuisines: ['South Indian', 'Breakfast'],
    },
    {
        id: 3,
        name: 'Dragon Wok',
        address: 'Bandra West, Mumbai',
        pincode: '400050',
        image_url: 'https://picsum.photos/seed/rest3/400/200',
        rating: 3.9,
        rating_count: 654,
        cuisines: ['Chinese', 'Thai', 'Asian'],
    },
    {
        id: 4,
        name: 'The Burger Lab',
        address: 'Koramangala, Bengaluru',
        pincode: '560034',
        image_url: 'https://picsum.photos/seed/rest4/400/200',
        rating: 4.5,
        rating_count: 3120,
        cuisines: ['American', 'Fast Food'],
    },
    {
        id: 5,
        name: 'Spice Garden',
        address: 'Powai, Mumbai',
        pincode: '400076',
        image_url: 'https://picsum.photos/seed/rest5/400/200',
        rating: 4.0,
        rating_count: 1450,
        cuisines: ['North Indian', 'Chinese', 'Biryani'],
    },
    {
        id: 6,
        name: 'Pizza Roma',
        address: 'Jubilee Hills, Hyderabad',
        pincode: '500033',
        image_url: 'https://picsum.photos/seed/rest6/400/200',
        rating: 4.2,
        rating_count: 890,
        cuisines: ['Italian', 'Pizza', 'Pasta'],
    },
    {
        id: 7,
        name: 'Biryani Brothers',
        address: 'Hitech City, Hyderabad',
        pincode: '500081',
        image_url: 'https://picsum.photos/seed/rest7/400/200',
        rating: 4.6,
        rating_count: 5230,
        cuisines: ['Biryani', 'Mughlai'],
    },
    {
        id: 8,
        name: 'Green Bowl',
        address: 'Hauz Khas, New Delhi',
        pincode: '110016',
        image_url: 'https://picsum.photos/seed/rest8/400/200',
        rating: 4.4,
        rating_count: 720,
        cuisines: ['Healthy', 'Salads', 'Wraps'],
    },
]

export default function Home() {
    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" fontWeight={700} color="#3d4152" sx={{ mb: 3 }}>
                    Restaurants near you
                </Typography>
                <Grid container spacing={3}>
                    {mockRestaurants.map((restaurant) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={restaurant.id}>
                            <RestaurantCard restaurant={restaurant} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}