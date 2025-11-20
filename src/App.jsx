import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCarousel from './components/FeaturedCarousel'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'

const palette = {
  navy: '#1b2e3c',
  black: '#0c0c1e',
  crimson: '#4b0000',
  cream: '#f3e3e2',
}

function App() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const api = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${api}/api/products?featured=true`)
        const json = await res.json()
        setProducts(json.products || [])
      } catch (e) {
        // ignore
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(80%_80%_at_50%_20%,rgba(75,0,0,0.2),transparent)]" style={{ backgroundColor: palette.black }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 40% -20%, rgba(27,46,60,0.6), transparent 60%)' }} />

      <Navbar onCartToggle={() => setCartOpen(true)} />
      <main className="relative">
        <Hero />
        <FeaturedCarousel />
        <ProductGrid products={products} />
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={[]} />

      <footer className="relative border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-10 text-cream/60 text-sm">
          Provided — Luxury in quiet confidence
        </div>
      </footer>
    </div>
  )
}

export default App
