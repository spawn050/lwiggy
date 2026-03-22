import { useState } from 'react'
import { Box, Container, Typography, Paper, Divider, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { clearRestaurantItems } from '../store/cartSlice.js'
import { placeOrder } from '../services/orderService.js'

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const [loadingGroupId, setLoadingGroupId] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const groups = cartItems.reduce((acc, item) => {
        if (!acc[item.restaurantId]) {
            acc[item.restaurantId] = {
                restaurantId: item.restaurantId,
                restaurantName: item.restaurantName,
                restaurantAddress: item.restaurantAddress,
                restaurantImageUrl: item.restaurantImageUrl,
                items: [],
            }
        }
        acc[item.restaurantId].items.push(item)
        return acc
    }, {})

    const groupList = Object.values(groups)

    async function handleOrderNow(group, total) {
        if (!isLoggedIn) {
            navigate('/signin')
            return
        }

        setLoadingGroupId(group.restaurantId)
        try {
            await placeOrder({
                restaurant_id: group.restaurantId,
                total_price: total,
                items: group.items.map((item) => ({
                    food_item_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            })
            dispatch(clearRestaurantItems(group.restaurantId))
            setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' })
        } catch (err) {
            setSnackbar({ open: true, message: err.message, severity: 'error' })
        } finally {
            setLoadingGroupId(null)
        }
    }

    return (
        <Box sx={{ bgcolor: '#E9ECEE', minHeight: '100vh', py: 4 }}>
            {groupList.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6" color="#3d4152" fontWeight={700} sx={{ mb: 1 }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body2" color="#686b78" sx={{ mb: 3 }}>
                            You can go to home page to view more restaurants
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/')}
                            sx={{ borderColor: '#FF5200', color: '#FF5200', fontWeight: 600, '&:hover': { bgcolor: '#fff5f0', borderColor: '#FF5200' } }}
                        >
                            Browse Restaurants
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Container maxWidth="sm">
                    {groupList.map((group) => {
                        const total = group.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                        const isOrdering = loadingGroupId === group.restaurantId

                        return (
                            <Paper
                                key={group.restaurantId}
                                elevation={0}
                                sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                                    <Box
                                        component="img"
                                        src={group.restaurantImageUrl}
                                        alt={group.restaurantName}
                                        sx={{ width: 80, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                                    />
                                    <Box>
                                        <Typography
                                            fontWeight={700}
                                            color="#FF5200"
                                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                            onClick={() => navigate(`/restaurants/${group.restaurantId}`)}
                                        >
                                            {group.restaurantName}
                                        </Typography>
                                        <Typography variant="body2" color="#686b78">
                                            {group.restaurantAddress}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider />

                                <Box sx={{ px: 2, py: 1 }}>
                                    {group.items.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}
                                        >
                                            <Typography color="#3d4152">
                                                {item.quantity} x {item.name}
                                            </Typography>
                                            <Typography fontWeight={600} color="#3d4152">
                                                ₹{item.price * item.quantity}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider />

                                <Box sx={{ px: 2, py: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography fontWeight={700} color="#3d4152">Total</Typography>
                                        <Typography fontWeight={700} color="#3d4152">₹{total}</Typography>
                                    </Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        disabled={isOrdering}
                                        onClick={() => handleOrderNow(group, total)}
                                        sx={{
                                            bgcolor: '#FF5200',
                                            color: '#fff',
                                            fontWeight: 700,
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontSize: 16,
                                            '&:hover': { bgcolor: '#e04a00' },
                                            '&.Mui-disabled': { bgcolor: '#ffb399', color: '#fff' },
                                        }}
                                    >
                                        {isOrdering ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Order Now'}
                                    </Button>
                                </Box>
                            </Paper>
                        )
                    })}
                </Container>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}