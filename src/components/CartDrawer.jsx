import { AnimatePresence, motion } from 'framer-motion'

export default function CartDrawer({ open, onClose, items = [] }) {
  const subtotal = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0)
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          aria-label="Cart"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[rgba(12,12,30,0.98)] backdrop-blur-xl border-l border-white/10 flex flex-col"
            initial={{ x: 60 }}
            animate={{ x: 0 }}
            exit={{ x: 60 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            <header className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-cream font-serif text-xl">Your Cart</h3>
              <button onClick={onClose} className="text-cream/70 hover:text-cream">Close</button>
            </header>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <p className="text-cream/70">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-3 border border-white/10 rounded-lg p-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <img src={item.image} alt="" className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-cream/90 truncate">{item.title}</p>
                        <p className="text-cream/60 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <button className="text-cream/60 hover:text-cream">Remove</button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <footer className="p-5 border-t border-white/10">
              <div className="flex items-center justify-between text-cream mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full h-11 rounded-full bg-cream text-black font-medium">Checkout</button>
            </footer>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
