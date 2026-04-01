import { Box, Container, Typography, Paper, Divider, Chip } from '@mui/material'
     import { useNavigate } from 'react-router-dom'
     import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'

     const DUMMY_ORDERS = [
         {
             id: 1,
             restaurant: {
                 id: 1,
                 name: 'Tandoor Palace',
                 address: 'Connaught Place, New Delhi',
                 image_url: 'https://picsum.photos/seed/rest1/800/400',
             },
             items: [
                 { name: 'Butter Chicken', quantity: 2, price: 280 },
                 { name: 'Garlic Naan', quantity: 3, price: 60 },
             ],
             total_price: 740,
             order_placed_time: '2026-03-20T10:30:00.000Z',
             status: 'DELIVERED',
             user_rating: null,
         },
         {
             id: 2,
             restaurant: {
                 id: 4,
                 name: 'The Burger Lab',
                 address: 'Koramangala, Bengaluru',
                 image_url: 'https://picsum.photos/seed/rest4/800/400',
             },
             items: [
                 { name: 'Classic Burger', quantity: 1, price: 220 },
                 { name: 'Fries', quantity: 2, price: 100 },
             ],
             total_price: 420,
             order_placed_time: '2026-03-18T19:00:00.000Z',
             status: 'PLACED',
             user_rating: null,
         },
     ]

     const STATUS_COLORS = {
         PLACED: '#1976d2',
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

         if (DUMMY_ORDERS.length === 0) {
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

                     {DUMMY_ORDERS.map((order) => (
                         <Paper
                             key={order.id}
                             elevation={0}
                             sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
                         >
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                                 <Box
                                     component="img"
                                     src={order.restaurant.image_url}
                                     alt={order.restaurant.name}
                                     sx={{ width: 80, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                                 />
                                 <Box>
                                     <Typography
                                         fontWeight={700}
                                         color="#FF5200"
                                         sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                         onClick={() => navigate(`/restaurants/${order.restaurant.id}`)}
                                     >
                                         {order.restaurant.name}
                                     </Typography>
                                     <Typography variant="body2" color="#686b78">
                                         {order.restaurant.address}
                                     </Typography>
                                 </Box>
                             </Box>

                             <Divider />

                             <Box sx={{ px: 2, py: 1 }}>
                                 {order.items.map((item, index) => (
                                     <Box
                                         key={index}
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
                                         bgcolor: `${STATUS_COLORS[order.status]}20`,
                                         color: STATUS_COLORS[order.status],
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