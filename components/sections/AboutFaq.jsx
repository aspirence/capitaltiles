'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FAQ_GROUPS } from '@/components/faqData'
import s from './AboutFaq.module.css'

/* One source of answers. This block used to inline its own eight questions,
   written in a thinner voice than the 35 on /faqs and free to drift away from
   them. It slices the two groups an About page actually owes a visitor — the
   showroom visit, and the free measure and quote — straight out of faqData. */

const group = (name) => (FAQ_GROUPS.find((g) => g.category === name)?.faqs ?? []).slice(0, 4)

/* One <ul> per column, not one grid across both: with a shared grid, opening a
   card stretched its row and left a hole under its neighbour. */
const COLUMNS = [group('Visiting & getting started'), group('Measure, quote & pricing')]


function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function AboutFaq() {
  const [open, setOpen] = useState('0-0')

  return (
    <section className={'sectionPad ' + s.section}>
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.eyebrow} data-reveal>Everything you need to know</p>
          <h2 className={s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Frequently Asked Questions
          </h2>
          <p className={s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
            Visiting the Mitchell showroom, and what a free measure and quote actually covers —
            the two things people ask us about before anything else.
          </p>
        </header>

        <div className={s.cols}>
          {COLUMNS.map((items, col) => (
            <ul key={col} className={s.list}>
              {items.map((item, i) => {
                const id = col + '-' + i
                const on = open === id
                return (
                  <li key={item.q} className={on ? s.item + ' ' + s.itemOn : s.item}
                    data-reveal style={{ '--reveal-delay': Math.min(i, 5) * 60 + 'ms' }}>
                    <h3>
                      <button type="button" aria-expanded={on} onClick={() => setOpen(on ? '' : id)}>
                        <span>{item.q}</span>
                        <span className={s.chev}><Chevron /></span>
                      </button>
                    </h3>
                    {/* single-child grid: 0fr→1fr only sizes the first row */}
                    <div className={s.panel}>
                      <p>{item.a}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>

        <p className={s.more} data-reveal>
          Still have a question?{' '}
          <Link href="/contact-us" className="linkUnder">Talk to our team</Link>
        </p>
      </div>
    </section>
  )
}
