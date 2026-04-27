import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Header from './components/Header'
import HeroCarousel from './components/HeroCarousel'
import ProductShowcase from './components/ProductShowcase'
import MediaMentions from './components/MediaMentions'
import GlobalBrands from './components/GlobalBrands'
import Footer from './components/Footer'

const paypalOptions = {
  'client-id': 'test',
  currency: 'USD',
  intent: 'capture',
};

function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroCarousel />
          <ProductShowcase />
          <MediaMentions />
          <GlobalBrands />
        </main>
        <Footer />
      </div>
    </PayPalScriptProvider>
  )
}

export default App
