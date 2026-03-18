import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AppBar, Toolbar, Container, Box, InputBase,
    IconButton, Button, Badge, Drawer, List,
    ListItem, ListItemButton, ListItemText, Divider,
    Menu, MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice.js'
import { logout as logoutApi } from '../services/authService.js'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const cartCount = useSelector((state) => state.cart.count)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleSignOut() {
        await logoutApi()
        dispatch(logout())
        setAnchorEl(null)
        navigate('/')
    }

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                bgcolor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>

                <Toolbar
                    disableGutters
                    sx={{ height: 80, justifyContent: 'space-between', gap: 3 }}
                >
                    {mobileSearchOpen ? (
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, flex: 1, alignItems: 'center', gap: 1 }}>
                            <IconButton onClick={() => setMobileSearchOpen(false)} sx={{ color: '#3d4152' }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', bgcolor: '#f0f0f5', borderRadius: 2, px: 2, py: 0.75, gap: 1 }}>
                                <SearchIcon sx={{ color: '#686b78', fontSize: 20 }} />
                                <InputBase
                                    autoFocus
                                    placeholder="Search for restaurants and food"
                                    sx={{ flex: 1, fontSize: 14, color: '#3d4152' }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Box
                                onClick={() => navigate('/')}
                                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                            >
                                <Box component="img" src="/logo.svg" alt="Lwiggy" sx={{ height: 40 }} />
                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    bgcolor: '#f0f0f5',
                                    borderRadius: 2,
                                    px: 2, py: 0.75, gap: 1,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#e8e8ee' },
                                }}
                            >
                                <SearchIcon sx={{ color: '#686b78', fontSize: 20 }} />
                                <InputBase
                                    placeholder="Search for restaurants and food"
                                    sx={{ flex: 1, fontSize: 14, color: '#3d4152' }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Box>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexShrink: 0 }}>
                                <IconButton onClick={() => navigate('/cart')} sx={{ color: '#3d4152' }}>
                                    <Badge badgeContent={cartCount} color="primary">
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                </IconButton>

                                {isLoggedIn ? (
                                    <>
                                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: '#3d4152' }}>
                                            <AccountCircleOutlinedIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={() => setAnchorEl(null)}
                                        >
                                            <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null) }}>Profile</MenuItem>
                                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/signin')}
                                        sx={{ borderColor: '#FF5200', color: '#FF5200', fontWeight: 600, '&:hover': { bgcolor: '#fff5f0', borderColor: '#FF5200' } }}
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </Box>

                            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
                                <IconButton onClick={() => setMobileSearchOpen(true)} sx={{ color: '#3d4152' }}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#3d4152' }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
            >
                <Box sx={{ width: 250, pt: 2 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { navigate('/cart'); setMobileOpen(false) }}>
                                <ShoppingCartOutlinedIcon sx={{ mr: 2 }} />
                                <ListItemText primary="Cart" />
                                {cartCount > 0 && (
                                    <Box
                                        sx={{
                                            bgcolor: '#FF5200', color: '#fff',
                                            borderRadius: '50%', width: 20, height: 20,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 12, fontWeight: 700,
                                        }}
                                    >
                                        {cartCount}
                                    </Box>
                                )}
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        {isLoggedIn ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate('/profile'); setMobileOpen(false) }}>
                                        <AccountCircleOutlinedIcon sx={{ mr: 2 }} />
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { handleSignOut(); setMobileOpen(false) }}>
                                        <ListItemText primary="Sign Out" sx={{ color: '#FF5200' }} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => { navigate('/signin'); setMobileOpen(false) }}>
                                    <ListItemText primary="Sign In" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}