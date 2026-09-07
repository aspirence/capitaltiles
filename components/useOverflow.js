'use client'

import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Tells a horizontally scrolling rail which of its edges still has content
   beyond it, so the .overflowFade wrapper in globals.css can shade that edge.

   The site hides every scrollbar, which means a rail gives no sign at all that
   it scrolls — the fade is the only affordance left, and it is only honest if
   it tracks the real scroll position rather than being painted permanently.

     const { ref, fade } = useOverflow()
     <div className="overflowFade" data-fade={fade}>
       <div ref={ref} className={s.rail}>…</div>
     </div>

   fade is 'none' | 'start' | 'end' | 'both'. It starts at 'none' so the server
   render and the first client render agree; the real value lands on mount.
   ------------------------------------------------------------------------- */

/* Sub-pixel layout leaves scrollLeft a fraction short of the true maximum, and
   a rail that fits its content by half a pixel still reports overflow. Two
   pixels of slack is enough to stop either from painting a phantom edge. */
const TOL = 2

export function useOverflow() {
  const ref = useRef(null)
  const [fade, setFade] = useState('none')

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const sync = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= TOL) {
        setFade('none')
        return
      }
      const start = el.scrollLeft > TOL
      const end = el.scrollLeft < max - TOL
      setFade(start && end ? 'both' : start ? 'start' : end ? 'end' : 'none')
    }

    sync()
    el.addEventListener('scroll', sync, { passive: true })

    /* The rail's own box is only half of it. Filtering a grid or swapping a tab
       changes scrollWidth while the box stands perfectly still, and a card that
       reflows once its image has a size does the same — so the children are
       measured too, and the watched set is rebuilt whenever they change. */
    let ro
    let mo
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', sync)
    } else {
      ro = new ResizeObserver(sync)
      const watch = () => {
        ro.disconnect()
        ro.observe(el)
        Array.from(el.children).forEach((child) => ro.observe(child))
      }
      watch()
      mo = new MutationObserver(watch)
      mo.observe(el, { childList: true })
    }

    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      if (ro) ro.disconnect()
      if (mo) mo.disconnect()
    }
  }, [])

  return { ref, fade }
}
