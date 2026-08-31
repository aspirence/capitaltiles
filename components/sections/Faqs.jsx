'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Faqs.module.css'

/* Standalone FAQ page: banner, a jump rail, then the questions grouped by
   category. Only one answer is open at a time, keyed by "group:index" so the
   groups do not fight each other. */

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function Faqs({ groups, lede }) {
  const [open, setOpen] = useState('0:0')

  return (
    <>
      {/* ---------- banner ---------- */}
      <section className={s.banner}>
        <img src="/img/title-bg/frequently-asked-questions.jpg" alt="" />
        <div className={s.bannerShade} aria-hidden="true" />
        <div className={'container ' + s.bannerInner}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            <span>FAQ&rsquo;s</span>
          </nav>
          <p className={s.bannerEyebrow}>Everything you need to know</p>
          <h1 className={s.bannerTitle}>Frequently Asked Questions</h1>
        </div>
      </section>

      {/* ---------- intro + jump rail ---------- */}
      <section className={'sectionPad ' + s.intro}>
        <div className={'container ' + s.introInner}>
          <p className={s.lede} data-reveal>{lede}</p>
          <ul className={s.jump} data-reveal style={{ '--reveal-delay': '100ms' }}>
            {groups.map((g) => (
              <li key={g.category}>
                <a href={'#' + slug(g.category)}>{g.category}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- groups ---------- */}
      <section className={'sectionPad ' + s.body}>
        <div className={'container ' + s.bodyInner}>
          {groups.map((g, gi) => (
            <div className={s.group} key={g.category} id={slug(g.category)}>
              <header className={s.groupHead} data-reveal>
                <h2 className={s.groupTitle}>{g.category}</h2>
                {g.intro && <p className={s.groupIntro}>{g.intro}</p>}
              </header>

              <ul className={s.list}>
                {g.faqs.map((item, i) => {
                  const key = gi + ':' + i
                  const on = open === key
                  return (
                    <li key={item.q} className={on ? s.item + ' ' + s.itemOn : s.item}
                      data-reveal style={{ '--reveal-delay': Math.min(i, 5) * 55 + 'ms' }}>
                      <h3>
                        <button type="button" aria-expanded={on}
                          onClick={() => setOpen(on ? null : key)}>
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
            </div>
          ))}
        </div>
      </section>

      {/* ---------- closing cta ---------- */}
      <section className={'sectionPad ' + s.cta}>
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>Still not answered?</h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            Call the showroom or send us the details of your project. If it is a question about
            your own floor, a photo and a rough room size usually gets you a straight answer the
            same day.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <Link href="/contact-us/enquiry" className="cta">
              <span>Ask Us a Question</span>
            </Link>
            <a href="tel:0262538158" className={s.phone}>02 6253 8158</a>
          </div>
        </div>
      </section>
    </>
  )
}
