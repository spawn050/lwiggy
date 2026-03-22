import { Box, Container, Typography, Paper, Divider, Button, Avatar } from '@mui/material'
 import { useNavigate } from 'react-router-dom'
 import { useSelector, useDispatch } from 'react-redux'
 import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
 import LogoutIcon from '@mui/icons-material/Logout'
 import { logout } from '../store/authSlice.js'
 import { logout as logoutApi } from '../services/authService.js'

 export default function Profile() {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const user = useSelector((state) => state.auth.user)

     async function handleSignOut() {
         await logoutApi()
         dispatch(logout())
         navigate('/')
     }

     return (
         <Box sx={{ bgcolor: '#E9ECEE', minHeight: '100vh', py: 4 }}>
             <Container maxWidth="sm">
                 <Paper
                     elevation={0}
                     sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
                 >
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                         <Avatar sx={{ bgcolor: '#FF5200', width: 56, height: 56, fontSize: 24, fontWeight: 700 }}>
                             {user?.name?.charAt(0).toUpperCase()}
                         </Avatar>
                         <Box>
                             <Typography fontWeight={700} color="#3d4152" variant="h6">
                                 {user?.name}
                             </Typography>
                             <Typography variant="body2" color="#686b78">
                                 {user?.email}
                             </Typography>
                         </Box>
                     </Box>

                     <Divider />

                     <Box
                         onClick={() => navigate('/orders')}
                         sx={{
                             display: 'flex', alignItems: 'center', gap: 2,
                             px: 3, py: 2,
                             cursor: 'pointer',
                             '&:hover': { bgcolor: '#f7f7f7' },
                         }}
                     >
                         <ReceiptLongOutlinedIcon sx={{ color: '#3d4152' }} />
                         <Typography fontWeight={600} color="#3d4152">My Orders</Typography>
                     </Box>

                     <Divider />

                     <Box
                         onClick={handleSignOut}
                         sx={{
                             display: 'flex', alignItems: 'center', gap: 2,
                             px: 3, py: 2,
                             cursor: 'pointer',
                             '&:hover': { bgcolor: '#fff5f0' },
                         }}
                     >
                         <LogoutIcon sx={{ color: '#FF5200' }} />
                         <Typography fontWeight={600} color="#FF5200">Sign Out</Typography>
                     </Box>
                 </Paper>
             </Container>
         </Box>
     )
 }