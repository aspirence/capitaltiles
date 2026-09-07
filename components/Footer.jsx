'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Socials from './Socials'
import s from './Footer.module.css'
import { SHOWROOM } from './siteData'

/* ---------------------------------------------------------------------------
   Footer:

     1. a black link deck of five widget columns (each column may stack several
        titled groups, and some groups are single "static" links with no head),
     2. a white address band listing the offices with phone / e-mail / socials,
     3. a centred copyright rule.

   Below 900px the titled groups collapse into accordions, exactly as they do
   on the reference; the static links stay permanently open.
   ------------------------------------------------------------------------- */

const COLUMNS = [
  [
    {
      title: 'Explore by Range',
      links: [
        { label: 'Tiles', href: '/tiles' },
        { label: 'Flooring', href: '/flooring' },
        { label: 'Carpet', href: '/carpet' },
        { label: 'Installation', href: '/installation' },
        { label: 'Pavers', href: '/tiles/pavers' },
      ],
    },
    {
      title: 'Explore by Space',
      links: [
        { label: 'Living Room', href: '/tiles/living-room' },
        { label: 'Bathroom', href: '/tiles/bathroom' },
        { label: 'Kitchen', href: '/tiles/kitchen' },
        { label: 'Bedroom', href: '/tiles/bedroom' },
        { label: 'Outdoor', href: '/tiles/outdoor' },
      ],
    },
  ],
  [
    {
      title: 'Explore by Category',
      links: [
        { label: 'Floor Tiles', href: '/tiles/floor-tiles' },
        { label: 'Wall Tiles', href: '/tiles/wall' },
        { label: 'Pool Tiles', href: '/tiles/pool' },
        { label: 'Patio Tiles', href: '/tiles/patio' },
        { label: 'Mosaic', href: '/tiles/mosaic' },
        { label: 'Mega Slab', href: '/tiles/mega-slab' },
        { label: 'Subway', href: '/tiles/subway' },
        { label: 'Hybrid Flooring', href: '/flooring/hybrid-flooring' },
      ],
    },
  ],
  [
    { static: true, links: [{ label: 'Free Measure & Quote', href: '/contact-us/enquiry' }] },
    { static: true, links: [{ label: 'Installation Service', href: '/installation' }] },
    { static: true, links: [{ label: 'Mitchell Showroom', href: '/contact-us' }] },
    { static: true, links: [{ label: 'Laminate Flooring', href: '/flooring/laminate-flooring' }] },
    { static: true, links: [{ label: 'Engineered Timber', href: '/flooring/engineered-timber' }] },
  ],
  [
    {
      title: 'Customer Support',
      links: [
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Free Measure & Quote', href: '/contact-us/enquiry' },
        { label: 'Care & Aftercare', href: '/faqs' },
      ],
    },
  ],
  [
    { static: true, links: [{ label: 'About Capital Tiles', href: '/about' }] },
    {
      title: 'Other Links',
      links: [
        { label: 'Blogs', href: '/blogs' },
        { label: 'Carpet Ranges', href: '/carpet' },
        { label: 'Refund Policy', href: '/policies/refund-policy' },
        { label: 'Privacy Policy', href: '/policies/privacy-policy' },
        { label: 'Shipping Policy', href: '/policies/shipping-policy' },
        { label: 'Terms of Service', href: '/policies/terms-of-service' },
      ],
    },
  ],
]

const OFFICES = [
  {
    title: 'Visit Our Showroom',
    address: SHOWROOM.address,
  },
  {
    title: 'Call Us',
    phone: SHOWROOM.phone,
    tollFree: SHOWROOM.hours,
  },
  {
    title: 'Email Us',
    email: SHOWROOM.email,
  },
  {
    title: 'Follow Us',
    social: true,
  },
]

/* --- icons ---------------------------------------------------------------- */
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.5" aria-hidden="true">
      <path d="M4.5 4.2h3.2l1.4 3.6-2 1.4a12 12 0 0 0 5.7 5.7l1.4-2 3.6 1.4v3.2a1.5 1.5 0 0 1-1.7 1.5A15.6 15.6 0 0 1 3 5.9 1.5 1.5 0 0 1 4.5 4.2Z" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.6 6.6 8.4 6 8.4-6" />
    </svg>
  )
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}
function IconChevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}


export default function Footer() {
  /* Desktop keeps every group open; the accordion behaviour is added only
     below 900px so no link is ever hidden behind JS on a wide screen. The
     breakpoint has to match the one in Footer.module.css. */
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const apply = (matches) => {
      setIsMobile(matches)
      setOpen(null)
    }
    apply(mq.matches)
    const onChange = (e) => apply(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const isOpen = (key) => !isMobile || open === key

  return (
    <footer>
      {/* ---------- link deck ---------- */}
      <div className={s.deck}>
        <div className={'container ' + s.deckInner}>
          {COLUMNS.map((col, ci) => (
            <div className={s.col} key={'col-' + ci}>
              {col.map((group, gi) => {
                const key = ci + '-' + gi
                if (group.static) {
                  return (
                    <div className={s.group + ' ' + s.groupStatic} key={key}>
                      <div className={s.panel}>
                        <ul className={s.links}>
                          {group.links.map((l) => (
                            <li key={l.label}>
                              <Link href={l.href}>
                                {l.label}
                                <IconChevron className={s.rowArrow} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                }
                const shown = isOpen(key)
                return (
                  <div className={shown ? s.group + ' ' + s.groupOpen : s.group} key={key}>
                    <h2 className={s.groupTitle}>
                      <button
                        type="button"
                        onClick={() => isMobile && setOpen(shown ? null : key)}
                        aria-expanded={shown}
                      >
                        {group.title}
                        <span className={s.chev} aria-hidden="true" />
                      </button>
                    </h2>
                    {/* Single-child panel: the 0fr→1fr collapse only sizes the
                        first grid row, so the <ul> cannot be the grid itself. */}
                    <div className={s.panel}>
                      <ul className={s.links}>
                        {group.links.map((l) => (
                          <li key={l.label}>
                            <Link href={l.href}>{l.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- address band ---------- */}
      <div className={s.address}>
        <div className="container">
          <Link href="/" className={s.footLogo} aria-label="Capital Tiles &amp; Flooring — home">
            <img src="/logo.webp" alt="Capital Tiles &amp; Flooring" width="480" height="150" />
          </Link>

          <div className={s.offices}>
            {OFFICES.map((o) => (
              <div className={s.office} key={o.title}>
                <h3>{o.title}</h3>

                {o.address && (
                  <p>
                    <IconPin />
                    <span>{o.address}</span>
                  </p>
                )}
                {o.phone && (
                  <p>
                    <IconPhone />
                    <a href={'tel:' + o.phone.replace(/[^+\d]/g, '')}>
                      {o.phone}
                      {o.tollFree && <span className={s.tollFree}>{o.tollFree}</span>}
                    </a>
                  </p>
                )}
                {o.email && (
                  <p>
                    <IconMail />
                    <a href={'mailto:' + o.email}>{o.email}</a>
                  </p>
                )}

                {o.social && <Socials />}
              </div>
            ))}
          </div>

          <div className={s.copyright}>
            Copyright &copy; {new Date().getFullYear()} Capital Tiles &amp; Flooring. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
