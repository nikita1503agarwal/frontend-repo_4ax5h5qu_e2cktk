import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'

const colors = {
  navy: '#1b2e3c',
  black: '#0c0c1e',
  crimson: '#4b0000',
  cream: '#f3e3e2',
}

export default function Navbar({ onCartToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <motion.nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={false}
        animate={{}}
      >
        <div
          className={`mt-4 rounded-xl border transition-all ${
            scrolled ? 'backdrop-blur-md border-white/10 bg-white/5' : 'bg-transparent border-transparent'
          }`}
          style={{ boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.25)' : 'none' }}
        >
          <div className="flex items-center justify-between h-14 px-4">
            <button
              aria-label="Open menu"
              className="lg:hidden text-cream/80 hover:text-cream"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {['Womens', 'Mens', 'Collections', 'Lookbook'].map((item) => (
                <a key={item} href="#" className="text-cream/80 hover:text-cream transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <a href="#" className="text-cream tracking-[0.08em] font-serif text-xl">
              Provided
            </a>

            <div className="flex items-center gap-4">
              <button aria-label="Search" className="text-cream/80 hover:text-cream">
                <Search />
              </button>
              <button
                aria-label="Open cart"
                className="text-cream/80 hover:text-cream relative"
                onClick={onCartToggle}
              >
                <ShoppingBag />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label="Menu"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-0 left-0 h-full w-[80%] max-w-sm bg-[rgba(12,12,30,0.9)] backdrop-blur-xl border-r border-white/10 p-6"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-cream font-serif text-xl tracking-[0.08em]">Provided</span>
                <button aria-label="Close menu" className="text-cream/80 hover:text-cream" onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>
              <motion.ul initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
                {['New Arrivals', 'Womens', 'Mens', 'Collections', 'Lookbook', 'Stories'].map((item) => (
                  <motion.li key={item} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
                    <a href="#" className="block py-3 text-cream/90 hover:text-cream">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
