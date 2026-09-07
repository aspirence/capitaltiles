'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EnquireLink from '../EnquireLink'
import { SHOWROOM } from '../siteData'
import s from './Faqs.module.css'

/* Standalone FAQ page: banner, then a sticky chapter rail beside the questions.

   Three things shape this component:

   - The rail replaces a one-shot chip index. Six chapters and thirty-five
     questions run several thousand pixels; a chip block at the top can only be
     used before you have read anything, and once you are inside the document it
     is gone. The rail stays, and marks where you are.

   - Answers open independently. A single `open` string meant opening a second
     question silently shut the first, so you could not read two related answers
     — the measure and the quote, say — side by side.

   - Closed answers stay findable. The panel carries `hidden="until-found"`, so
     find-in-page still matches the thirty-four answers you cannot see, and the
     browser's `beforematch` event tells us which one to open.

     Two notes on that last one. React coerces `hidden` to a boolean, so
     `hidden="until-found"` in JSX renders as a plain `hidden` — the attribute
     has to be written to the DOM directly, which the effect below does. And
     because `until-found` hides the panel outright rather than clipping it, the
     old 0fr→1fr reveal no longer has a starting frame to animate from; the
     panel now opens instantly. That is the trade: thirty-four answers a reader
     can actually search, against a 400ms slide. */

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
  /* A Set, not a single key: opening one answer must not close another. */
  const [open, setOpen] = useState(() => new Set(['0:0']))
  const [active, setActive] = useState(0)

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const reveal = useCallback((key) => {
    setOpen((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))
  }, [])

  /* Chrome fires `beforematch` on a hidden="until-found" element just before it
     reveals it for a find-in-page hit. There is no onBeforeMatch prop, so the
     listener goes on through a ref. */
  const panels = useRef(new Map())
  const panelRef = useCallback(
    (node) => {
      if (!node) return undefined
      const key = node.dataset.key
      const onMatch = () => reveal(key)
      node.addEventListener('beforematch', onMatch)
      panels.current.set(key, node)
      return () => {
        node.removeEventListener('beforematch', onMatch)
        panels.current.delete(key)
      }
    },
    [reveal],
  )

  /* The server renders a plain `hidden` on every closed panel, so the page is
     correct before hydration and with JS off. This upgrades it to
     `until-found`, which is the value that keeps the text searchable. */
  useEffect(() => {
    panels.current.forEach((node, key) => {
      if (open.has(key)) node.removeAttribute('hidden')
      else node.setAttribute('hidden', 'until-found')
    })
  }, [open])

  /* Which chapter the rail should mark. */
  const groupIds = groups.map((g) => slug(g.category))
  const idsKey = groupIds.join('|')
  useEffect(() => {
    const els = idsKey.split('|').map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(els.indexOf(hit.target))
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [idsKey])

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
            <span>FAQs</span>
          </nav>
          <p className={s.bannerEyebrow}>Everything you need to know</p>
          <h1 className={s.bannerTitle}>Frequently Asked Questions</h1>
        </div>
      </section>

      {/* ---------- intro ---------- */}
      <section className={'sectionPad ' + s.intro}>
        <div className={'container ' + s.introInner}>
          <p className={s.lede} data-reveal>{lede}</p>
        </div>
      </section>

      {/* ---------- rail + groups ---------- */}
      <section className={'sectionPad ' + s.body} id="faq-top">
        <div className={'container ' + s.bodyInner}>
          <aside className={s.railWrap}>
            <nav className={s.rail} aria-label="On this page">
              <p className={s.railHead}>Jump to a section</p>
              <ul>
                {groups.map((g, i) => (
                  <li key={g.category}>
                    <a
                      href={'#' + slug(g.category)}
                      className={i === active ? s.railOn : undefined}
                      aria-current={i === active ? 'true' : undefined}
                    >
                      {g.category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className={s.groups}>
            {groups.map((g, gi) => (
              <div className={s.group} key={g.category} id={slug(g.category)}>
                <header className={s.groupHead} data-reveal>
                  <h2 className={s.groupTitle}>{g.category}</h2>
                  {g.intro && <p className={s.groupIntro}>{g.intro}</p>}
                </header>

                <ul className={s.list}>
                  {g.faqs.map((item, i) => {
                    const key = gi + ':' + i
                    const on = open.has(key)
                    return (
                      <li key={item.q} className={on ? s.item + ' ' + s.itemOn : s.item}
                        data-reveal style={{ '--reveal-delay': Math.min(i, 5) * 55 + 'ms' }}>
                        <h3>
                          <button type="button" aria-expanded={on}
                            onClick={() => toggle(key)}>
                            <span>{item.q}</span>
                            <span className={s.chev}><Chevron /></span>
                          </button>
                        </h3>
                        <div
                          className={s.panel}
                          data-key={key}
                          ref={panelRef}
                          hidden={!on}
                        >
                          <div className={s.answer}>
                            <p>{item.a}</p>
                            {item.link && (
                              <Link href={item.link.href} className={'linkUnder ' + s.answerLink}>
                                {item.link.label}
                              </Link>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                {/* Back to the rail, which is off-screen once the phone drops it. */}
                <a href="#faq-top" className={'linkUnder ' + s.backUp}>All questions</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- closing cta ---------- */}
      <section className="sectionPad bandDark">
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>Still not answered?</h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            Call the showroom or send us the details of your project. If it is a question about
            your own floor, a photo and a rough room size usually gets you a straight answer the
            same day.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <EnquireLink subject="Question from the FAQ page" className="cta">
              <span>Book a Free Measure &amp; Quote</span>
            </EnquireLink>
            <a href={SHOWROOM.phoneHref} className={s.phone}>{SHOWROOM.phone}</a>
          </div>
          {/* The other way to settle a question: turn up. */}
          <p className={s.ctaVisit} data-reveal style={{ '--reveal-delay': '220ms' }}>
            <Link href="/contact-us">{SHOWROOM.address}</Link>
            <span aria-hidden="true"> · </span>
            {SHOWROOM.hours}
          </p>
        </div>
      </section>
    </>
  )
}
