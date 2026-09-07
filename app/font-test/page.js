'use client'

import { useState } from 'react'
import s from './fonttest.module.css'

/* A decision page, not a site page.

   The client rejected two pairings on names and one screenshot each, which is
   the slowest possible way to choose type. This puts the real copy — the real
   headline, the real nav caps, the real policy paragraph, the real button — in
   every candidate, on both the light and the dark ground the site actually
   alternates between, so the choice is made on what it will look like rather
   than on what the font is called.

   Not linked from anywhere and marked noindex; delete the folder once a
   pairing is chosen. */

const PAIRS = [
  {
    key: 'current',
    name: 'Current — Playfair Display + Open Sans',
    display: "'Playfair Display', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
    why: 'What is live now. Playfair is a high-contrast display serif: thin hairlines, strong thick/thin swing. It is the default "premium" face on most templates, which is why it reads as generic rather than expensive.',
  },
  {
    key: 'fraunces',
    name: 'Option 1 — Fraunces + DM Sans',
    display: "'Fraunces', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    why: 'Warm, soft-cornered serif with a swash ampersand. Reads hospitality — restaurant, venue, wedding. Rejected for exactly that reason; kept here for comparison.',
  },
  {
    key: 'archivo-inter',
    name: 'Option 3 — Archivo + Inter',
    display: "'Archivo', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    why: 'A grotesque with slightly squared shoulders and tight caps. This is the register European and Australian tile and stone brands actually sit in — Artedomus, Signorino, Mutina. Architectural rather than decorative: the personality comes from scale and letter-spacing, not from the letterforms showing off.',
  },
  {
    key: 'archivo-solo',
    name: 'Option 4 — Archivo throughout',
    display: "'Archivo', system-ui, sans-serif",
    body: "'Archivo', system-ui, sans-serif",
    why: 'One family for everything, hierarchy carried by weight, size and tracking alone. The most disciplined option, and the closest to showroom signage. No serif anywhere.',
  },
  {
    key: 'instrument',
    name: 'Option 5 — Instrument Sans',
    display: "'Instrument Sans', system-ui, sans-serif",
    body: "'Instrument Sans', system-ui, sans-serif",
    why: 'Contemporary and faintly technical, with narrower caps than Archivo. Feels current without feeling like a startup. Less common than Inter, so less anonymous.',
  },
  {
    key: 'schibsted',
    name: 'Option 6 — Schibsted Grotesk + Inter',
    display: "'Schibsted Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    why: 'A grotesque with a little more character in the a, g and R than Inter has. Warmer than Archivo without going anywhere near a serif.',
  },
]

const NAV = ['Home', 'Tiles', 'Flooring', 'Carpet', 'Installation', 'FAQs']

function Specimen({ pair, ground }) {
  return (
    <div
      className={s.card + ' ' + (ground === 'dark' ? s.dark : s.light)}
      style={{ '--tf-display': pair.display, '--tf-body': pair.body }}
    >
      <div className={s.navRow}>
        {NAV.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      <p className={s.eyebrow2}>Capital Tiles &amp; Flooring</p>
      <h2 className={s.h1}>Free Measure &amp; Quote</h2>
      <p className={s.body}>
        Indoors or out, anywhere in Canberra and Queanbeyan — we come to you, measure up and
        check the subfloor, then put the numbers in writing.
      </p>

      <h3 className={s.h2}>Supplied and installed by our own team</h3>
      <p className={s.small}>
        Take your order away and arrange your own trades, or hand the whole job to our
        installers — measure, removal, preparation and finish, right across Canberra and the
        surrounding districts. Tiles, flooring and carpet share the one room at 3 Pelle Street,
        Mitchell, so you can hold a wall tile against a floorboard against a carpet without
        driving anywhere else.
      </p>

      <div className={s.statRow}>
        <span className={s.stat}>
          <span className={s.statVal}>
            9<em>+</em>
          </span>
          <span className={s.statLab}>Areas we service</span>
        </span>
        <span className={s.stat}>
          <span className={s.statVal}>1977</span>
          <span className={s.statLab}>Supplying Canberra since</span>
        </span>
        <span className={s.stat}>
          <span className={s.statVal}>600&times;1200</span>
          <span className={s.statLab}>Formats on the floor</span>
        </span>
      </div>

      <div className={s.btnRow}>
        <span className={s.btn}>Book a free measure &amp; quote</span>
        <span className={s.btn + ' ' + s.btnGhost}>Hours and directions</span>
      </div>
    </div>
  )
}

export default function FontTest() {
  const [active, setActive] = useState(null)
  const shown = active ? PAIRS.filter((p) => p.key === active) : PAIRS

  return (
    <div className={s.page}>
      <div className={s.head}>
        <p className={s.kicker}>Type decision</p>
        <h1 className={s.pageTitle}>Which pairing should the site run?</h1>
        <p className={s.note}>
          Same copy, same sizes, same colours in every block — only the typeface changes. Each
          pairing is shown on both grounds because the site alternates light and dark down every
          page, and a face that holds on white can go weak on near-black. Pick a tab to see one
          on its own.
        </p>
      </div>

      <div className={s.picker}>
        <button
          type="button"
          className={active === null ? s.tab + ' ' + s.tabOn : s.tab}
          onClick={() => setActive(null)}
        >
          Show all
        </button>
        {PAIRS.map((p) => (
          <button
            key={p.key}
            type="button"
            className={active === p.key ? s.tab + ' ' + s.tabOn : s.tab}
            onClick={() => setActive(p.key)}
          >
            {p.name.split('—')[1]?.trim() || p.name}
          </button>
        ))}
      </div>

      <div className={s.specimen}>
        {shown.map((p) => (
          <section key={p.key}>
            <p className={s.pairName}>{p.name}</p>
            <p className={s.pairWhy}>{p.why}</p>
            <div className={s.pairGrid}>
              <Specimen pair={p} ground="light" />
              <Specimen pair={p} ground="dark" />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
