'use client'

import { useEffect } from 'react'

/* ---------------------------------------------------------------------------
   One observer for the whole page.

   Any element carrying `data-reveal` starts hidden (see globals.css) and gets
   `data-shown="true"` the first time it crosses into view. Sections add
   `--reveal-delay` inline to stagger their children. Nodes added later (tab
   switches, carousel re-renders) are picked up by a MutationObserver.

   `data-reveal-scope` exists for content inside a scroll container. A carousel
   card parked outside its track is clipped away by that track, so it never
   intersects the viewport and would stay invisible until dragged into view.
   Marking the track as a scope reveals everything inside it the moment the
   track itself appears — each child still honouring its own delay.
   ------------------------------------------------------------------------- */
export default function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pending = () => document.querySelectorAll('[data-reveal]:not([data-shown])')
    const scopes = () => document.querySelectorAll('[data-reveal-scope]:not([data-scope-shown])')

    const showAll = () => {
      pending().forEach((el) => el.setAttribute('data-shown', 'true'))
      scopes().forEach((el) => el.setAttribute('data-scope-shown', 'true'))
    }

    if (reduced || typeof IntersectionObserver === 'undefined') {
      showAll()
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          io.unobserve(el)

          if (el.hasAttribute('data-reveal-scope')) {
            el.setAttribute('data-scope-shown', 'true')
            el.querySelectorAll('[data-reveal]').forEach((child) => {
              child.setAttribute('data-shown', 'true')
              io.unobserve(child)
            })
          }
          if (el.hasAttribute('data-reveal')) el.setAttribute('data-shown', 'true')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    const observeAll = () => {
      scopes().forEach((el) => io.observe(el))
      pending().forEach((el) => io.observe(el))
    }
    observeAll()

    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
