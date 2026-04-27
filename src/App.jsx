import Header from './components/Header'
import HeroCarousel from './components/HeroCarousel'
import ProductShowcase from './components/ProductShowcase'
import MediaMentions from './components/MediaMentions'
import GlobalBrands from './components/GlobalBrands'
import Footer from './components/Footer'

function App() {
  return (
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
  )
}

export default App
