'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Spaces.module.css'

/* Hindware's "Explore by Space", rebuilt as an expanding panel rack: the
   hovered panel takes the extra width and reveals its copy. On narrow screens
   the same panels stack and all copy stays visible. */

const SPACES = [
  {
    label: 'Bathroom',
    copy: 'Sanitaryware, surfaces and fittings that hold up to daily use — specified as one coordinated set.',
    href: '/spaces/bathroom',
    img: '/img/spaces/bathroom-wide.jpg',
  },
  {
    label: 'Kitchen',
    copy: 'Slip-resistant floors, stain-proof walls and countertop-grade slabs for the hardest-working room.',
    href: '/spaces/kitchen',
    img: '/img/spaces/kitchen-wide.jpg',
  },
  {
    label: 'Living Room',
    copy: 'Large-format surfaces with minimal grout lines, so the floor reads as one continuous plane.',
    href: '/spaces/living-room',
    img: '/img/spaces/livingroom.jpg',
  },
  {
    label: 'Outdoor',
    copy: 'R11-rated grip, frost resistance and a 20mm body built for decks, drives and patios.',
    href: '/spaces/outdoor',
    img: '/img/spaces/outdoor.jpg',
  },
  {
    label: 'Facade',
    copy: 'Elevation tiles and ventilated cladding that keep a building looking new through every monsoon.',
    href: '/spaces/facade',
    img: '/img/spaces/elevation.jpg',
  },
]

export default function Spaces() {
  const [active, setActive] = useState(0)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>Room by room</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Explore by Space
            </h2>
          </div>
          <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '150ms' }}>
            Every space asks something different of a surface. Start with the room and we will narrow
            the range down to what actually belongs there.
          </p>
        </div>

        <div className={s.rack} data-reveal="scale">
          {SPACES.map((sp, i) => (
            <Link
              key={sp.label}
              href={sp.href}
              className={i === active ? s.panel + ' ' + s.panelOn : s.panel}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <img src={sp.img} alt="" loading="lazy" />
              <span className={s.shade} aria-hidden="true" />

              <span className={s.panelBody}>
                <span className={s.panelIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.panelLabel}>{sp.label}</span>
                <span className={s.panelCopy}>{sp.copy}</span>
                <span className={s.panelCta}>
                  Explore
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
