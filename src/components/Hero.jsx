import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const palette = {
  navy: '#1b2e3c',
  black: '#0c0c1e',
  crimson: '#4b0000',
  cream: '#f3e3e2',
}

export default function Hero() {
  const rootRef = useRef(null)
  const layersRef = useRef({})

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.4,
        },
      })

      tl.to(layersRef.current.bg, { yPercent: 10 }, 0)
        .to(layersRef.current.model, { yPercent: -8 }, 0)
        .to(layersRef.current.grain, { yPercent: 20 }, 0)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(243,227,226,0.05),transparent_60%)]" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${palette.black}, ${palette.navy})` }} />

      {/* Cinematic layers */}
      <div ref={(el) => (layersRef.current.bg = el)} className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-60"
          src="https://cdn.coverr.co/videos/coverr-silhouette-of-a-woman-wearing-a-hat-2748/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Editorial silhouette video"
        />
      </div>
      <div ref={(el) => (layersRef.current.grain = el)} className="absolute inset-0 mix-blend-overlay opacity-[0.18]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-120px_200px_rgba(12,12,30,0.95)]" />

      {/* Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-[28vh] pb-24">
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-cream"
        >
          Provided — Autumn/Winter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-xl text-cream/80"
        >
          Quiet layers. Cinematic textures. Crafted for lasting wear.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <SheenButton>Shop the Collection</SheenButton>
          <SheenButton variant="ghost">View Lookbook</SheenButton>
        </motion.div>
      </div>
    </section>
  )
}

function SheenButton({ children, variant = 'solid' }) {
  const base = 'relative inline-flex items-center justify-center h-11 px-6 rounded-full transition-transform duration-200 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 focus-visible:ring-offset-black/20'
  const styles =
    variant === 'solid'
      ? 'bg-cream text-black hover:-translate-y-0.5'
      : 'bg-white/0 text-cream border border-cream/20 hover:-translate-y-0.5'

  return (
    <button className={`${base} ${styles}`}>
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 [mask-image:linear-gradient(to_right,transparent,black,transparent)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
      </span>
    </button>
  )
}
