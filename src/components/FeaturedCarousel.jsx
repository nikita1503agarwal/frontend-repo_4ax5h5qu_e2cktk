import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedCarousel({ items = [] }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = wrapRef.current

    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tween = gsap.to('.carousel-track', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: '+=120%',
          scrub: 0.4,
        },
      })
      return () => tween.kill()
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapRef} className="relative py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-cream font-serif text-2xl tracking-wide mb-6">Featured Collections</h2>
      </div>
      <div className="overflow-x-auto will-change-transform">
        <div className="carousel-track flex gap-6 px-6">
          {(items.length ? items : defaultItems).map((item, i) => (
            <article key={i} className="relative w-72 sm:w-80 md:w-96 flex-shrink-0 group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-3 text-cream/90">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className="text-cream/60 text-sm">{item.cta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const defaultItems = [
  {
    title: 'Autumn/Winter',
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1400&auto=format&fit=crop',
    cta: 'Explore',
  },
  {
    title: 'Tailored',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1400&auto=format&fit=crop',
    cta: 'Shop',
  },
  {
    title: 'Evening',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
    cta: 'View',
  },
]
