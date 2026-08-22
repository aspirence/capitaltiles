'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import s from './Footer.module.css'

/* ---------------------------------------------------------------------------
   Footer, rebuilt to the Hindware pattern:

     1. a black link deck of five widget columns (each column may stack several
        titled groups, and some groups are single "static" links with no head),
     2. a white address band listing the offices with phone / e-mail / socials,
     3. a centred copyright rule.

   Below 768px the titled groups collapse into accordions, exactly as they do
   on the reference; the static links stay permanently open.
   ------------------------------------------------------------------------- */

const COLUMNS = [
  [
    {
      title: 'Explore by Range',
      links: [
        { label: 'Capital Tiles', href: '/tiles' },
        { label: 'Capital Bathware', href: '/bathware' },
        { label: 'Capital Surfaces', href: '/tiles/surfaces' },
        { label: 'Capital Slabs', href: '/tiles/slabs' },
        { label: 'Adhesives & Grouts', href: '/tiles/adhesives' },
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
        { label: 'Glazed Vitrified Tiles', href: '/tiles/gvt' },
        { label: 'Double Charge Tiles', href: '/tiles/double-charge' },
        { label: 'Full Body Tiles', href: '/tiles/full-body' },
        { label: 'Wall Tiles', href: '/tiles/wall' },
        { label: 'Large Format Slabs', href: '/tiles/slabs' },
        { label: 'Wash Basins', href: '/bathware/basins' },
        { label: 'EWC & Pans', href: '/bathware/ewc' },
        { label: 'Cisterns', href: '/bathware/cisterns' },
      ],
    },
  ],
  [
    { static: true, links: [{ label: 'Institutional Business', href: '/professional/institutional' }] },
    { static: true, links: [{ label: 'International Business', href: '/professional/international' }] },
    { static: true, links: [{ label: 'Capital Experience Centre', href: '/experience-centre' }] },
    { static: true, links: [{ label: 'Store Locator', href: '/where-to-buy' }] },
    { static: true, links: [{ label: 'Explore Catalogue', href: '/downloads/catalogues' }] },
    { static: true, links: [{ label: 'Digital Visualizer', href: '/visualizer' }] },
  ],
  [
    {
      title: 'Customer Support',
      links: [
        { label: 'Service & Support', href: '/support' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Warranty & Return Policy', href: '/warranty' },
        { label: 'Installation Service', href: '/solutions/installation' },
        { label: 'Raise a Complaint', href: '/contact-us/complaints' },
      ],
    },
  ],
  [
    { static: true, links: [{ label: 'About Capital Tiles', href: '/about' }] },
    {
      title: 'Other Links',
      links: [
        { label: 'Blogs', href: '/blogs' },
        { label: 'Certifications', href: '/solutions/certifications' },
        { label: 'Investors', href: '/investors' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Site Map', href: '/site-map' },
        { label: 'Authorised Resellers', href: '/authorised-resellers' },
      ],
    },
  ],
]

const OFFICES = [
  {
    title: 'Visit Our Showroom',
    address: '3 Pelle Street, Mitchell ACT 2911, Canberra',
  },
  {
    title: 'Call Us',
    phone: '02 6253 8158',
    tollFree: 'Mon–Fri 9:00am–5:00pm · Sat 10:00am–3:00pm',
  },
  {
    title: 'Email Us',
    email: 'cbr@capitaltiles.com.au',
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

/* Only the two profiles the business actually runs. */
const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/capitaltilesandflooring/',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/capitaltilesandflooring/',
    path: 'M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.57-1.58 1.58 1.58 0 0 1 1.57 1.58Z',
  },
]

export default function Footer() {
  /* Desktop keeps every group open; the accordion behaviour is added only
     below 768px so no link is ever hidden behind JS on a wide screen. */
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
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
                              <Link href={l.href}>{l.label}</Link>
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
                        <IconChevron className={s.chev} />
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

                {o.social && (
                  <div className={s.socials}>
                    {SOCIALS.map((so) => (
                      <a
                        key={so.label}
                        href={so.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={so.label}
                        title={so.label}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"
                          aria-hidden="true">
                          <path d={so.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
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
