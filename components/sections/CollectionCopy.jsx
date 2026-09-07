'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './CollectionCopy.module.css'

/* Long-form range copy, then the FAQ accordion and a related collections rail —
   the three blocks that close a collection listing.

   The copy used to be clipped to 10.5rem behind a fade and a "Read more". It
   runs to four paragraphs on every one of the 28 pages that use this block and
   is the page's only real explanation of the range, so it is simply shown. */

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function CollectionCopy({
  heading,
  paragraphs,
  faqs = [],
  related = [],
  faqEyebrow = 'Everything you need to know',
  faqTitle = 'Frequently Asked Questions',
  faqLede,
  /* Optional: a photo for the space beside the copy. The copy runs to 86ch and
     leaves the right of the container empty, so a page with a shot worth
     showing passes one and the block becomes two columns. Pages that do not
     pass one render exactly as before. */
  image,
  imageAlt = '',
  /* The page's only ask used to be the last sentence of the copy, as plain
     grey text. These give it something to click; every caller gets the default. */
  ctaHref = '/contact-us/enquiry',
  ctaLabel = 'Book a free measure & quote',
}) {
  const [open, setOpen] = useState(0)

  /* The opening paragraph and the closing one, and nothing between.

     Measured across the 28 pages that use this block: they run to 270 words on
     average and 489 at the longest, in four paragraphs of roughly equal size.
     The first says what the range is; the last carries the measure-and-quote
     ask on 25 of the 28. The two in the middle are range detail, and the FAQ
     accordion directly below answers the same ground in six questions. Keeping
     the ends halves the block to about 133 words without losing either the
     opening or the ask.

     Pages with two paragraphs or fewer are left alone — there is no middle to
     drop, and first-and-last would print the same paragraph twice. */
  const shown = paragraphs.length > 2
    ? [paragraphs[0], paragraphs[paragraphs.length - 1]]
    : paragraphs

  const copyBlock = (
    <div className={s.copy}>
      {shown.map((para, i) => (
        <p key={i} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
          {para}
        </p>
      ))}
    </div>
  )

  return (
    <>
      {/* ---------- long-form copy ---------- */}
      <section className={'sectionPad ' + s.copySection}>
        <div className="container">
          {/* The heading rides inside the text column rather than sitting
              full-width above the grid. Centring the copy against a 4:3 plate
              pushed it down the row, and with the heading left up top the two
              drifted a long way apart. Kept together, the whole block centres
              as one and the heading stays tight to its first line. */}
          {image ? (
            <div className={s.copyGrid}>
              <div className={s.copyCol}>
                <h2 className={'title ' + s.copyH2} data-reveal>{heading}</h2>
                {copyBlock}
                {ctaHref && (
                  <Link href={ctaHref} className={'cta ' + s.copyCta} data-reveal
                    style={{ '--reveal-delay': '160ms' }}>
                    <span>{ctaLabel}</span>
                  </Link>
                )}
              </div>
              <figure className={s.copyFigure} data-reveal="right">
                <img src={image} alt={imageAlt} loading="lazy" />
              </figure>
            </div>
          ) : (
            /* No caller passes this today, but the measure it was written for
               is what used to leave a dead gutter beside every page that does.
               Scoped here so it cannot come back. */
            <div className={s.copySolo}>
              <h2 className={'title ' + s.copyH2} data-reveal>{heading}</h2>
              {copyBlock}
              {ctaHref && (
                <Link href={ctaHref} className={'cta ' + s.copyCta} data-reveal>
                  <span>{ctaLabel}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------- faqs ---------- */}
      {faqs.length > 0 && (
      <section className={'sectionPad ' + s.faqSection}>
        <div className={s.faqInner}>
          <header className={s.faqHead}>
            <p className={s.faqEyebrow} data-reveal>{faqEyebrow}</p>
            <h2 className={s.faqTitle} data-reveal style={{ '--reveal-delay': '80ms' }}>
              {faqTitle}
            </h2>
            {faqLede && (
              <p className={s.faqLede} data-reveal style={{ '--reveal-delay': '150ms' }}>
                {faqLede}
              </p>
            )}
          </header>

          <ul className={s.faqList}>
            {faqs.map((item, i) => {
              const on = open === i
              return (
                <li key={item.q} className={on ? s.faq + ' ' + s.faqOn : s.faq}
                  data-reveal style={{ '--reveal-delay': Math.min(i, 5) * 60 + 'ms' }}>
                  <h3>
                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
                      <span>{item.q}</span>
                      <span className={s.faqChev}><Chevron /></span>
                    </button>
                  </h3>
                  {/* single-child grid: 0fr→1fr only sizes the first row */}
                  <div className={s.faqPanel}>
                    <p>{item.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className={s.faqMore} data-reveal>
            Still have a question?{' '}
            <Link href="/contact-us" className="linkUnder">Talk to our team</Link>
          </p>
        </div>
      </section>
      )}

      {/* ---------- related ---------- */}
      {related.length > 0 && (
      <section className={'sectionPad ' + s.relSection}>
        <div className="container">
          <h2 className={'title ' + s.h2}>Related Collections</h2>
          <ul className={s.relGrid}>
            {related.map((r) => (
              <li key={r.label}>
                <Link href={r.href}>
                  <span className={'zoomFrame ' + s.relFrame}>
                    <img src={r.img} alt={r.label} loading="lazy" />
                  </span>
                  <span className={s.relLabel}>{r.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}
    </>
  )
}
