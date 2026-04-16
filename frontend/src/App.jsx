import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import RestaurantPage from './pages/RestaurantPage.jsx'
import SignUp from './pages/SignUp.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import Orders from './pages/Orders.jsx'
import { login } from './store/authSlice.js'
import { getCurrentUser } from './services/authService.js'

function AppContent() {
  const location = useLocation()
  const hideFooter = ['/signin', '/signup'].includes(location.pathname)
  const dispatch = useDispatch()

  useEffect(() => {
    async function restoreAuth() {
      try {
        const data = await getCurrentUser()
        dispatch(login({ email: data.email, id: data.userId }))
      } catch {
        // No valid cookie — user is not logged in, nothing to do
      }
    }
    restoreAuth()
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Box>
      {!hideFooter && <Footer />}
    </Box>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}