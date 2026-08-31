'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './CollectionCopy.module.css'

/* Long-form range copy with a read-more, then the FAQ accordion and a related
   collections rail — the three blocks that close a collection listing. */

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
}) {
  const [more, setMore] = useState(false)
  const [open, setOpen] = useState(0)

  const copyBlock = (
    <>
      <div className={more ? s.copy + ' ' + s.copyOpen : s.copy}>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <button type="button" className={'linkUnder ' + s.toggle} onClick={() => setMore((m) => !m)}>
        {more ? 'Read less' : 'Read more'}
      </button>
    </>
  )

  return (
    <>
      {/* ---------- long-form copy ---------- */}
      <section className={'sectionPad ' + s.copySection}>
        <div className="container">
          <h2 className={'title ' + s.h2}>{heading}</h2>

          {image ? (
            <div className={s.copyGrid}>
              <div>{copyBlock}</div>
              <figure className={s.copyFigure}>
                <img src={image} alt={imageAlt} loading="lazy" />
              </figure>
            </div>
          ) : (
            copyBlock
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
