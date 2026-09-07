'use client'

import { useEffect, useRef, useState } from 'react'
import EnquireLink from '@/components/EnquireLink'
import s from './EnquireBar.module.css'

/* The floating ask, shared by the product and collection templates.

   It rides in once `watch` has scrolled off the top — the hero's own Enquire
   button on a product page, the results header on a collection — so the page
   never shows the same ask twice at once, and a reader sixty ranges deep never
   has to scroll back for it.

   `range` and `subject` travel with the click, so the enquiry that lands in the
   showroom already says which range or collection the sender was looking at. */
export default function EnquireBar({ watch, name, meta, image, range, subject }) {
  const barRef = useRef(null)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const el = watch?.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        /* Only once it has gone off the TOP. Before you reach it the button is
           simply below the fold, and a bar offering the same thing then would
           be arguing with itself. */
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [watch])

  /* The bar is a centred card, so on a wide screen the floating rail clears it
     on its own and should stay put. On a narrow one the card grows to nearly
     the full width and the two collide. Rather than guess a breakpoint, measure
     both and lift the rail only when their horizontal ranges actually overlap.
     The lift is the card's real distance from the bottom of the viewport, so it
     holds whatever the card's height or offset turns out to be. */
  useEffect(() => {
    document.body.dataset.enquireBar = showBar ? 'on' : 'off'

    const sync = () => {
      const bar = barRef.current
      const rail = document.querySelector('[data-floating-rail]')
      if (!showBar || !bar || !rail) {
        document.body.style.removeProperty('--rail-lift')
        return
      }
      const b = bar.getBoundingClientRect()
      const r = rail.getBoundingClientRect()
      /* Horizontal only: translateX(-50%) is part of the resting transform, so
         left/right are already right, but the card is mid-slide when this
         first runs and its top is still below the fold. Height and the CSS
         bottom offset are both immune to the transform, so the lift is
         measured from those rather than from a rect that is still moving. */
      const overlaps = r.right > b.left && r.left < b.right
      if (overlaps) {
        const bottom = parseFloat(getComputedStyle(bar).bottom) || 0
        document.body.style.setProperty('--rail-lift', Math.round(bar.offsetHeight + bottom + 12) + 'px')
      } else {
        document.body.style.removeProperty('--rail-lift')
      }
    }

    sync()
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('resize', sync)
      delete document.body.dataset.enquireBar
      document.body.style.removeProperty('--rail-lift')
    }
  }, [showBar])

  return (
    <div ref={barRef} className={showBar ? s.bar + ' ' + s.barOn : s.bar}>
      <div className={'container ' + s.barInner}>
        {image && (
          <span className={s.barThumb} aria-hidden="true">
            <img src={image} alt="" />
          </span>
        )}
        <span className={s.barText}>
          <span className={s.barName}>{name}</span>
          {meta && <span className={s.barMeta}>{meta}</span>}
        </span>
        {/* The global .cta, like every other primary ask on the site. The label
            is wrapped because .cta's hover wipe is a ::before at z-index 0 —
            a bare text node paints under it and disappears mid-hover. */}
        <EnquireLink range={range} subject={subject} className={'cta ' + s.barCta}>
          <span>Enquire Now</span>
        </EnquireLink>
      </div>
    </div>
  )
}
