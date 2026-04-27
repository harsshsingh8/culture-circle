import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'

const paypalOptions = {
  'client-id': 'test',
  currency: 'USD',
  intent: 'capture',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/signup', '/profile'].includes(pathname);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {!isAuthPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PayPalScriptProvider options={paypalOptions}>
            <AppContent />
          </PayPalScriptProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
