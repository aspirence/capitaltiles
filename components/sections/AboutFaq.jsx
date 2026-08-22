'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './AboutFaq.module.css'

/* Questions lifted from the existing capitaltiles.com.au FAQ page, so the
   answers match what the business already publishes. */

const FAQS = [
  {
    q: 'What areas do you service?',
    a: 'We proudly service Canberra, Queanbeyan, Yass, Bungendore, Murrumbateman, Gungahlin, Belconnen, Tuggeranong, Woden and surrounds. If you are just outside these areas, contact us — we can often accommodate special requests.',
  },
  {
    q: 'Do you offer free measure & quotes?',
    a: 'Yes — we provide obligation-free site visits across the Canberra region. We measure accurately, recommend the best products for your space and budget, and provide a clear quote with no hidden costs.',
  },
  {
    q: 'Can I visit your showroom?',
    a: 'Yes. Our Mitchell showroom features a wide selection of hybrid flooring, vinyl planks, laminate, timber, porcelain and ceramic tiles, and feature mosaics. Our team will help you compare options, check samples and find the right solution.',
  },
  {
    q: 'What’s the difference between hybrid, vinyl and laminate flooring?',
    a: 'Hybrid flooring is 100% waterproof and ideal for open-plan areas and kitchens. Vinyl planks are softer underfoot, quiet and budget-friendly. Laminate is durable and gives you the look of timber at a lower price point.',
  },
  {
    q: 'Do you remove old flooring or tiles?',
    a: 'Yes — our team can remove old flooring or tiles and prepare the subfloor before installation, so your new products look and perform their best.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most projects are completed in a few days. Larger builds or specialty patterns such as herringbone may take longer, but we provide a clear timeline during quoting.',
  },
  {
    q: 'How do I look after my new flooring or tiles?',
    a: 'We provide care instructions tailored to your product. Hybrid and vinyl floors are easy to maintain with regular sweeping and damp mopping, while tiles benefit from pH-neutral cleaners. We can also seal grout and recommend aftercare products.',
  },
  {
    q: 'Do you work with builders, architects or designers?',
    a: 'Yes — we partner with builders, architects, interior designers and developers to supply and install products for residential and commercial projects of all sizes.',
  },
]

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function AboutFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.eyebrow} data-reveal>Everything you need to know</p>
          <h2 className={s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Frequently Asked Questions
          </h2>
          <p className={s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
            We&rsquo;ve gathered the most common questions from Canberra homeowners, renovators and
            builders so you can plan your project with confidence.
          </p>
        </header>

        <ul className={s.list}>
          {FAQS.map((item, i) => {
            const on = open === i
            return (
              <li key={item.q} className={on ? s.item + ' ' + s.itemOn : s.item}
                data-reveal style={{ '--reveal-delay': Math.min(i, 5) * 60 + 'ms' }}>
                <h3>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
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

        <p className={s.more} data-reveal>
          Still have a question?{' '}
          <Link href="/contact-us" className="linkUnder">Talk to our team</Link>
        </p>
      </div>
    </section>
  )
}
