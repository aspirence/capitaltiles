'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Contact.module.css'

/* ---------------------------------------------------------------------------
   Contact page: head band, then a two-column body with the enquiry form on the
   left and the showroom details on the right, closing on a full-width map.

   There is no form backend in this project yet, so submitting composes a
   pre-filled email to the showroom rather than pretending to have sent one.
   Swap `handleSubmit` for a POST once an endpoint exists.
   ------------------------------------------------------------------------- */

const EMAIL = 'cbr@capitaltiles.com.au'
const PHONE = '02 6253 8158'
const ADDRESS = '3 Pelle Street, Mitchell ACT 2911, Canberra'
const MAP_QUERY = '3 Pelle Street, Mitchell ACT 2911, Canberra'

const SUBJECTS = [
  'Free measure & quote',
  'Tiles',
  'Flooring',
  'Carpet',
  'Installation',
  'Something else',
]

const HOURS = [
  { day: 'Monday – Friday', time: '9:00am – 5:00pm' },
  { day: 'Saturday', time: '10:00am – 3:00pm' },
  { day: 'Sunday', time: 'Closed' },
]

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

/* --- icons ---------------------------------------------------------------- */
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}
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
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" strokeLinecap="round" />
    </svg>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = [f.get('firstName'), f.get('lastName')].filter(Boolean).join(' ')
    const body = [
      `Name: ${name}`,
      `Email: ${f.get('email')}`,
      `Phone: ${f.get('phone') || '—'}`,
      `Enquiry: ${f.get('subject')}`,
      '',
      f.get('message'),
    ].join('\n')

    window.location.href =
      `mailto:${EMAIL}` +
      `?subject=${encodeURIComponent('Website enquiry — ' + f.get('subject'))}` +
      `&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      {/* ---------- head ---------- */}
      <section className={s.head}>
        <div className="container">
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            <span>Contact Us</span>
          </nav>

          <p className={s.eyebrow}>We&rsquo;d love to hear from you</p>
          <h1 className={s.title}>Talk to the Capital Tiles team</h1>
          <p className={s.lede}>
            Planning a renovation, pricing a build, or just want to see a full sheet before you
            commit? Send us a message, call the showroom, or drop into Mitchell — we will help you
            compare products, check slip ratings and sizes, and put together a clear quote with no
            obligation.
          </p>
        </div>
      </section>

      {/* ---------- form + details ---------- */}
      <section className={'sectionPad ' + s.body}>
        <div className={'container ' + s.grid}>
          {/* --- form --- */}
          <div className={s.formCard} data-reveal>
            <h2 className={s.formTitle}>Send us an enquiry</h2>
            <p className={s.formNote}>
              Fill in the details below and we will get back to you within one business day.
            </p>

            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.row}>
                <label className={s.field}>
                  <span>First name <i aria-hidden="true">*</i></span>
                  <input type="text" name="firstName" required autoComplete="given-name" />
                </label>
                <label className={s.field}>
                  <span>Last name</span>
                  <input type="text" name="lastName" autoComplete="family-name" />
                </label>
              </div>

              <div className={s.row}>
                <label className={s.field}>
                  <span>Email <i aria-hidden="true">*</i></span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label className={s.field}>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>

              <label className={s.field}>
                <span>What is your enquiry about?</span>
                <select name="subject" defaultValue={SUBJECTS[0]}>
                  {SUBJECTS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label className={s.field}>
                <span>Message <i aria-hidden="true">*</i></span>
                <textarea name="message" rows={6} required
                  placeholder="Tell us about your project — rooms, rough area, timeframe, and anything you have already picked out." />
              </label>

              <div className={s.actions}>
                <button type="submit" className="cta">
                  <span>Send Enquiry</span>
                </button>
                {sent && (
                  <p className={s.sent} role="status">
                    Opening your email app with the enquiry ready to send. If nothing happens,
                    email us at <a href={'mailto:' + EMAIL}>{EMAIL}</a>.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* --- details --- */}
          <aside className={s.side} data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className={s.detail}>
              <h3><IconPin /> Visit our showroom</h3>
              <p>{ADDRESS}</p>
              <a
                className="linkUnder"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>

            <div className={s.detail}>
              <h3><IconPhone /> Call us</h3>
              <p>
                <a href={'tel:' + PHONE.replace(/[^+\d]/g, '')}>{PHONE}</a>
              </p>
            </div>

            <div className={s.detail}>
              <h3><IconMail /> Email us</h3>
              <p>
                <a href={'mailto:' + EMAIL}>{EMAIL}</a>
              </p>
            </div>

            <div className={s.detail}>
              <h3><IconClock /> Opening hours</h3>
              <ul className={s.hours}>
                {HOURS.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <em>{h.time}</em>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.detail}>
              <h3>Follow us</h3>
              <div className={s.socials}>
                {SOCIALS.map((so) => (
                  <a key={so.label} href={so.href} target="_blank" rel="noopener noreferrer"
                    aria-label={so.label} title={so.label}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                      aria-hidden="true">
                      <path d={so.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- map ---------- */}
      <section className={s.mapSection} aria-label="Showroom location">
        <iframe
          className={s.map}
          title="Capital Tiles & Flooring — 3 Pelle Street, Mitchell ACT"
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  )
}
