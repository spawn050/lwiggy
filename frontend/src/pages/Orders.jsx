import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Divider, Chip, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import { getOrders } from '../services/orderService.js'

const STATUS_COLORS = {
    PLACED: '#1976d2',
    PREPARING: '#FF5200',
    OUT_FOR_DELIVERY: '#f57c00',
    DELIVERED: '#48c479',
    CANCELLED: '#e43b4f',
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
    })
}

export default function Orders() {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin')
            return
        }

        async function fetchOrders() {
            try {
                const data = await getOrders()
                setOrders(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [isLoggedIn, navigate])

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

    if (orders.length === 0) {
        return (
            <Box sx={{ bgcolor: '#E9ECEE', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <ReceiptLongOutlinedIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                    <Typography variant="h6" color="#3d4152" fontWeight={700} sx={{ mb: 1 }}>
                        No orders yet
                    </Typography>
                    <Typography variant="body2" color="#686b78">
                        Your past orders will appear here
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{ bgcolor: '#E9ECEE', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="sm">
                <Typography variant="h6" fontWeight={700} color="#3d4152" sx={{ mb: 3 }}>
                    Your Orders
                </Typography>

                {orders.map((order) => (
                    <Paper
                        key={order.id}
                        elevation={0}
                        sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                            <Box
                                component="img"
                                src="https://placehold.co/80x64?text=Food"
                                alt={order.restaurant_name}
                                sx={{ width: 80, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                            />
                            <Box>
                                <Typography fontWeight={700} color="#FF5200">
                                    {order.restaurant_name}
                                </Typography>
                                <Typography variant="body2" color="#686b78">
                                    {order.delivery_address}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <Box sx={{ px: 2, py: 1 }}>
                            {order.items.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}
                                >
                                    <Typography color="#3d4152">
                                        {item.quantity} x {item.food_item_name}
                                    </Typography>
                                    <Typography fontWeight={600} color="#3d4152">
                                        ₹{item.price * item.quantity}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Divider />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                            <Typography fontWeight={700} color="#3d4152">
                                ₹{order.total_price}
                            </Typography>
                            <Typography variant="body2" color="#686b78">
                                {formatDate(order.order_placed_time)}
                            </Typography>
                            <Chip
                                label={order.status}
                                size="small"
                                sx={{
                                    bgcolor: `${STATUS_COLORS[order.status] ?? '#686b78'}20`,
                                    color: STATUS_COLORS[order.status] ?? '#686b78',
                                    fontWeight: 700,
                                    fontSize: 11,
                                }}
                            />
                        </Box>

                        {order.status === 'DELIVERED' && order.user_rating === null && (
                            <>
                                <Divider />
                                <Box sx={{ px: 2, py: 1.5 }}>
                                    <Typography
                                        variant="body2"
                                        color="#FF5200"
                                        fontWeight={600}
                                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                    >
                                        Rate this order
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Paper>
                ))}
            </Container>
        </Box>
    )
}