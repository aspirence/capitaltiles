'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Spaces.module.css'

/* "Explore by Space" as an expanding panel rack: the hovered panel takes the
   extra width and reveals its copy. On narrow screens the same panels stack
   and all copy stays visible. */

const SPACES = [
  {
    label: 'Bathroom',
    copy: 'Wall and floor tiles made for wet areas — subway, mosaic or large-format, laid, grouted and sealed by our team.',
    href: '/tiles/bathroom',
    img: '/img/spaces/bathroom.jpg',
  },
  {
    label: 'Kitchen',
    copy: 'Slip-resistant floor tiles and easy-clean splashbacks, or hybrid and vinyl boards that shrug off spills.',
    href: '/tiles/kitchen',
    img: '/img/spaces/kitchen-wide.jpg',
  },
  {
    label: 'Living Room',
    copy: 'Large-format tiles and warm timber-look hybrid boards for open living, plus wool and Triexta carpet when you want it softer.',
    href: '/flooring/hybrid-flooring',
    img: '/img/spaces/livingroom.jpg',
  },
  {
    label: 'Outdoor',
    copy: 'Slip-rated outdoor tiles and pavers for patios, alfresco areas and pool surrounds, chosen to handle a Canberra winter.',
    href: '/tiles/outdoor',
    img: '/img/spaces/outdoor.jpg',
  },
  {
    label: 'Hallway & Entry',
    copy: 'Hard-wearing wall and floor tiles where the traffic lands, or laminate and vinyl that takes wet boots in its stride.',
    href: '/tiles/wall',
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
            Every room asks something different underfoot. Start with the space and we will narrow it
            down to the tiles, flooring or carpet that belong there — then measure and quote it free.
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
