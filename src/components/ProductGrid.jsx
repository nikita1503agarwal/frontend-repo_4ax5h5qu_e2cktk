import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductGrid({ products = [] }) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.from(card, {
          y: 24,
          opacity: 0,
          delay: i * 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const items = products.length ? products : fallback

  return (
    <section ref={ref} className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-cream font-serif text-2xl tracking-wide mb-8">For Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p, idx) => (
            <article key={idx} className="card group relative">
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-3 flex items-center justify-between text-cream/90">
                <div>
                  <h3 className="font-medium leading-tight">{p.title}</h3>
                  <p className="text-cream/60 text-sm">${p.price.toFixed(2)}</p>
                </div>
                <button aria-label="Quick add" className="px-3 py-1.5 rounded-full bg-cream text-black text-sm opacity-0 group-hover:opacity-100 transition-opacity">Add</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const fallback = [
  {
    title: 'Cashmere Overcoat',
    price: 1680,
    images: ['https://images.unsplash.com/photo-1548883354-cab52747f867?w=1200&auto=format&fit=crop&q=80'],
  },
  {
    title: 'Silk Blend Shirt',
    price: 420,
    images: ['https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1200&auto=format&fit=crop&q=80'],
  },
  {
    title: 'Japanese Denim',
    price: 360,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&auto=format&fit=crop&q=80'],
  },
  {
    title: 'Merino Turtleneck',
    price: 320,
    images: ['https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&auto=format&fit=crop&q=80'],
  },
]
