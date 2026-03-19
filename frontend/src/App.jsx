import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'   
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import RestaurantPage from './pages/RestaurantPage.jsx'

function AppContent() {
  const location = useLocation()
  const hideLayout = ['/signin', '/signup'].includes(location.pathname)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideLayout && <Navbar />}
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
        </Routes>
      </Box>
      {!hideLayout && <Footer />}
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