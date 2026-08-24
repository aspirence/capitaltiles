'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import s from './FloatingActions.module.css'

/* The floating rail from the Hindware reference: enquiry, WhatsApp and a
   back-to-top button that only appears once the page has scrolled. */
export default function FloatingActions() {
  const [up, setUp] = useState(false)

  useEffect(() => {
    const onScroll = () => setUp(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={s.rail}>
      <Link href="/contact-us/enquiry" className={s.btn} aria-label="Send an enquiry" title="Enquire">
        <svg viewBox="0 0 36 36" width="23" height="23" fill="currentColor" aria-hidden="true">
          <path d="M6 12c0-2 2-4 4-4h16c2 0 4 2 4 4v10c0 2-2 4-4 4h-7l-6 4v-4h-3c-2 0-4-2-4-4V12Z" />
        </svg>
      </Link>

      <a
        href="https://wa.me/61262538158?text=Hi%20Capital%20Tiles"
        className={s.btn + ' ' + s.wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true">
          <path d="M20.5 3.5A10.4 10.4 0 0 0 3.9 16.1L2.6 21l5-1.3a10.4 10.4 0 0 0 15.3-9.1 10.3 10.3 0 0 0-2.4-7.1Zm-8.4 16a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.6 8.6 0 1 1 7.1 3.8Zm4.7-6.4c-.3-.1-1.5-.8-1.8-.9s-.4-.1-.6.1-.6.9-.8 1.1-.3.2-.6.1a7 7 0 0 1-3.5-3c-.3-.5.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 3.9c1.6.7 2.3.7 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      </a>

      <button
        type="button"
        className={up ? s.btn + ' ' + s.top + ' ' + s.topOn : s.btn + ' ' + s.top}
        aria-label="Back to top"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 15 7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
