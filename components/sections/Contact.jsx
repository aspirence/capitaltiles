'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SHOWROOM } from '@/components/siteData'
import s from './Contact.module.css'

/* ---------------------------------------------------------------------------
   Contact page: head band, then a two-column body with the enquiry form on the
   left and the showroom details on the right, closing on the showroom band.

   The form POSTs to /api/enquiry and shows nothing but what came back. It used
   to hand the browser a mailto: and declare success in the same breath, which
   meant every visitor without a mail client configured was thanked for an
   enquiry that never left the machine. Success here is set from a 2xx and
   nowhere else, and `delivered: false` — the route accepted it but no mail
   provider is configured — says so instead of promising a reply.

   /contact-us/enquiry renders this same component with variant="enquiry".
   Every "Enquire" on the site lands there, so it says so: its own crumb, its
   own heading, and the form ahead of the showroom rail on a phone. Landing an
   enquiry on a page whose crumb reads "Contact Us" and whose H1 makes no
   mention of the thing you just pressed is how a shim leaks.
   ------------------------------------------------------------------------- */

const DIRECTIONS_HREF =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOWROOM.address)}`

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

/* The head band, written twice: once for the showroom's front door and once for
   the route the Enquire buttons point at. Keeping both here means the two pages
   cannot drift into telling a visitor two different things about the same
   form. */
const HEAD = {
  default: {
    crumb: 'Contact Us',
    eyebrow: 'We’d love to hear from you',
    title: 'Talk to the Capital Tiles team',
    lede:
      'Planning a renovation, pricing a build, or just want to see a full sheet before you ' +
      'commit? Send us a message, call the showroom, or drop into Mitchell — we will help you ' +
      'compare products, check slip ratings and sizes, and put together a clear quote with no ' +
      'obligation.',
  },
  enquiry: {
    crumb: 'Enquiry',
    eyebrow: 'Free measure & quote',
    title: 'Tell us about your project',
    lede:
      'Send through the rooms, the rough area and anything you have already picked out. We ' +
      'come back within one business day with product options, slip ratings and a clear ' +
      'quote — no obligation, and no visit needed to get started.',
  },
}

const ERROR_ID = 'enquiry-error'

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

/* EnquireLink sends visitors here carrying the range they were reading, so the
   showroom stops receiving "I want tiles" from someone who was three clicks
   deep in one collection.

   useSearchParams() drops out of the static prerender, and Next demands a
   <Suspense> above whatever calls it. Keeping the call in this invisible leaf
   means the boundary can wrap the leaf alone: the form itself still ships in
   the page's HTML, and only the prefill waits for the client. */
function QueryPrefill({ onRead }) {
  const params = useSearchParams()
  const range = params.get('range') || ''
  const subject = params.get('subject') || ''

  useEffect(() => {
    onRead(range, subject)
  }, [range, subject, onRead])

  return null
}

export default function Contact({ variant = 'default' }) {
  const head = HEAD[variant] || HEAD.default
  const isEnquiry = variant === 'enquiry'

  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState(null) // { message, field } as the route named it
  const [delivered, setDelivered] = useState(false)

  const [range, setRange] = useState('')
  const [enquiryType, setEnquiryType] = useState(SUBJECTS[0])
  const [message, setMessage] = useState('')

  const applyQuery = useCallback((nextRange, nextSubject) => {
    setRange(nextRange)
    /* Fills an empty box only: a visitor who has started typing keeps what
       they wrote if this ever runs again. */
    if (nextRange) {
      setMessage((m) => m || `I would like to enquire about ${nextRange}.`)
    }
    if (nextSubject) setEnquiryType(nextSubject)
  }, [])

  /* A subject that arrived in the URL will not be one of ours — show it rather
     than silently snapping the visitor back to the first option. */
  const options = SUBJECTS.includes(enquiryType) ? SUBJECTS : [enquiryType, ...SUBJECTS]

  const flag = (name) =>
    error?.field === name ? { 'aria-invalid': true, 'aria-describedby': ERROR_ID } : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const f = new FormData(e.currentTarget)
    setStatus('sending')
    setError(null)

    let res
    let data
    try {
      res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: f.get('firstName'),
          lastName: f.get('lastName'),
          email: f.get('email'),
          phone: f.get('phone'),
          subject: f.get('subject'),
          message: f.get('message'),
          range,
          website: f.get('website'),
        }),
      })
      data = await res.json()
    } catch {
      setError({ message: 'We could not send that just now — the connection dropped.' })
      setStatus('error')
      return
    }

    if (!res.ok || !data?.ok) {
      setError({
        message: data?.error || 'We could not send that just now. Please try again in a moment.',
        field: data?.field,
      })
      setStatus('error')
      return
    }

    /* The only place `sent` is set, and only ever from the response. Nothing
       here is cleared: if the visitor wants to check what they wrote, or the
       next state turns out to be an error, the form still holds it. */
    setDelivered(data.delivered === true)
    setStatus('sent')
  }

  return (
    <>
      <Suspense fallback={null}>
        <QueryPrefill onRead={applyQuery} />
      </Suspense>

      {/* ---------- head ---------- */}
      <section className={s.head}>
        <div className="container">
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            {isEnquiry && (
              <>
                <Link href="/contact-us">Contact Us</Link>
                <i aria-hidden="true">/</i>
              </>
            )}
            <span>{head.crumb}</span>
          </nav>

          <p className={s.eyebrow}>{head.eyebrow}</p>
          <h1 className={s.title}>{head.title}</h1>
          <p className={s.lede}>{head.lede}</p>
        </div>
      </section>

      {/* ---------- form + details ---------- */}
      <section className={'sectionPad ' + s.body}>
        {/* The phone order turns on the route: on /contact-us the showroom
            details come first, ahead of a nine-field form; on the enquiry route
            the visitor pressed a button to reach the form, so it leads. */}
        <div className={'container ' + s.grid} data-variant={variant}>
          {/* --- form --- */}
          <div className={s.formCard} data-reveal>
            <h2 className={s.formTitle}>Send us an enquiry</h2>
            <p className={s.formNote}>
              {range ? (
                <>
                  You were looking at <em className={s.rangeName}>{range}</em>, so we have carried
                  it across. Add anything else below and we will get back to you within one
                  business day.
                </>
              ) : (
                'Fill in the details below and we will get back to you within one business day.'
              )}
            </p>

            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.row}>
                <label className={s.field}>
                  <span>First name <i aria-hidden="true">*</i></span>
                  <input type="text" name="firstName" required autoComplete="given-name"
                    {...flag('firstName')} />
                </label>
                <label className={s.field}>
                  <span>Last name</span>
                  <input type="text" name="lastName" autoComplete="family-name"
                    {...flag('lastName')} />
                </label>
              </div>

              <div className={s.row}>
                <label className={s.field}>
                  <span>Email <i aria-hidden="true">*</i></span>
                  <input type="email" name="email" required autoComplete="email"
                    {...flag('email')} />
                </label>
                <label className={s.field}>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" {...flag('phone')} />
                </label>
              </div>

              <label className={s.field}>
                <span>What is your enquiry about?</span>
                <select name="subject" value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)} {...flag('subject')}>
                  {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label className={s.field}>
                <span>Message <i aria-hidden="true">*</i></span>
                <textarea name="message" rows={6} required value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Rooms, rough area, timeframe, and anything you have already picked out."
                  {...flag('message')} />
              </label>

              {/* Bots fill in every input they find; nobody else can see this
                  one. Announced to screen readers rather than hidden from them,
                  so the one visitor who does reach it is told to leave it. */}
              <div className={s.honeypot}>
                <label htmlFor="enquiry-website">Leave this field blank</label>
                <input id="enquiry-website" type="text" name="website" tabIndex={-1}
                  autoComplete="off" />
              </div>

              <div className={s.actions}>
                {status !== 'sent' && (
                  <button type="submit" className="cta" disabled={status === 'sending'}>
                    <span>{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</span>
                  </button>
                )}

                {status === 'sent' && (
                  <p className={s.sent} role="status">
                    {delivered ? (
                      <>
                        Thank you — your enquiry is with the showroom. We will get back to you
                        within one business day.
                      </>
                    ) : (
                      /* The route took it but has no mail provider wired up. It
                         is on the server, not in anyone's inbox, so say that
                         and hand over the phone number. */
                      <>
                        Thank you — your enquiry has been recorded. We cannot confirm it has
                        landed in the showroom inbox from here, so if it is time-sensitive please
                        call us on <a href={SHOWROOM.phoneHref}>{SHOWROOM.phone}</a>.
                      </>
                    )}
                  </p>
                )}

                {status === 'error' && (
                  <p className={s.error} id={ERROR_ID} role="alert">
                    {error.message}{' '}
                    <span className={s.errorAlt}>
                      Your message is still here, so you can try again — or call the showroom on{' '}
                      <a href={SHOWROOM.phoneHref}>{SHOWROOM.phone}</a> and we will take the
                      details over the phone.
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* --- details --- */}
          <aside className={s.side} data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className={s.detail}>
              <h3><IconPin /> Visit our showroom</h3>
              <p>
                {SHOWROOM.street}<br />{SHOWROOM.suburb}
              </p>
              <a
                className="linkUnder"
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>

            <div className={s.detail}>
              <h3><IconPhone /> Call us</h3>
              <p>
                <a href={SHOWROOM.phoneHref}>{SHOWROOM.phone}</a>
              </p>
            </div>

            <div className={s.detail}>
              <h3><IconMail /> Email us</h3>
              <p>
                <a href={'mailto:' + SHOWROOM.email}>{SHOWROOM.email}</a>
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
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
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

      {/* ---------- visit the showroom ---------- */}
      {/* This band was a keyless Google embed, and a keyless embed is blocked
          often enough that what the page actually closed on was 477px of empty
          --grey-bg between the white body and the black footer. The walk-in
          half of this page's job was riding on an iframe that paints nothing
          when it fails. A photograph, the address and a link out to Maps
          cannot fail that way — and the dark ground gives the page the
          light/dark alternation it was missing at the same time. */}
      <section className={'bandDark ' + s.visit} aria-labelledby="visit-showroom" data-reveal-scope>
        <div className={s.visitGrid}>
          <div className={s.visitCopy}>
            <p className={s.visitEyebrow} data-reveal>Mitchell showroom</p>
            <h2 id="visit-showroom" className={s.visitTitle} data-reveal
              style={{ '--reveal-delay': '80ms' }}>
              See the full sheet before you commit
            </h2>
            <address className={s.visitAddress} data-reveal style={{ '--reveal-delay': '140ms' }}>
              <span>{SHOWROOM.street}</span>
              <span>{SHOWROOM.suburb}</span>
            </address>
            <p className={s.visitHours} data-reveal style={{ '--reveal-delay': '180ms' }}>
              {SHOWROOM.hours}
            </p>
            <div className={s.visitActions} data-reveal style={{ '--reveal-delay': '220ms' }}>
              <a className="cta" href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer">
                <span>Get directions</span>
              </a>
              <a className={s.visitPhone} href={SHOWROOM.phoneHref}>{SHOWROOM.phone}</a>
            </div>
          </div>

          <div className={s.visitPlate} data-reveal="scale">
            <img src="/img/about/showroom.jpg" alt="A living room floored in patterned tiles"
              loading="lazy" />
          </div>
        </div>
      </section>
    </>
  )
}
