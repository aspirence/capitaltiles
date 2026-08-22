'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './WhyChoose.module.css'

/* Closes the page the way both references do: a row of proof points over the
   long-form brand copy, with the tail collapsed behind a read-more. */

const USPS = [
  {
    title: 'NSF certified',
    copy: 'Every body meets NSF health and safety standards, batch after batch.',
    icon: (
      <>
        <path d="M12 3 4.5 6.2v5.1c0 4.5 3.1 8.7 7.5 9.7 4.4-1 7.5-5.2 7.5-9.7V6.2L12 3Z" />
        <path d="m8.8 12.1 2.2 2.2 4.2-4.4" />
      </>
    ),
  },
  {
    title: 'BIS licensed',
    copy: 'A live BIS licence and patented body composition back the whole range.',
    icon: (
      <>
        <circle cx="12" cy="9.5" r="5" />
        <path d="M8.4 13.6 7 21l5-2.4L17 21l-1.4-7.4" />
      </>
    ),
  },
  {
    title: "World's whitest tile",
    copy: 'First to nano-technology production, and to Alaska — the whitest body made.',
    icon: (
      <>
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      </>
    ),
  },
  {
    title: 'Strongest outdoors',
    copy: 'R11 grip and a 20mm body rated for decks, drives and full sun.',
    icon: (
      <>
        <path d="M3 20h18" />
        <path d="M6 20V9.5L12 5l6 4.5V20" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
]

export default function WhyChoose() {
  const [more, setMore] = useState(false)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <ul className={s.usps}>
          {USPS.map((u, i) => (
            <li key={u.title} data-reveal style={{ '--reveal-delay': i * 90 + 'ms' }}>
              <span className={s.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  {u.icon}
                </svg>
              </span>
              <h3>{u.title}</h3>
              <p>{u.copy}</p>
            </li>
          ))}
        </ul>

        <div className={s.prose}>
          <h2 className={'title ' + s.title} data-reveal>
            Why choose Capital Tiles: a trusted tiles manufacturer in India
          </h2>

          <div className={more ? s.copy + ' ' + s.copyOpen : s.copy} data-reveal
            style={{ '--reveal-delay': '90ms' }}>
            <p>
              Capital Tiles has been an exclusive tiles brand in India since 1977, with eight
              production lines across Morbi and Andhra Pradesh and more than 200 exclusive showrooms
              spread across India and Nepal. Our manufacturing units run cutting-edge technology —
              first to nano-technology production, and first to the world&rsquo;s whitest tile.
            </p>
            <p>
              Built with modern technology, Capital offers some of the strongest{' '}
              <Link href="/tiles/outdoor" className={s.inline}>outdoor floor tiles</Link> available,
              alongside a range manufactured in a wide spread of colours, textures and surfaces to
              suit every area of a space. Tiles made at our plants carry certifications such as NSF,
              confirming they meet rigorous health and safety standards, and we hold both a patent
              and a BIS licence covering compliance and safety.
            </p>
            <p>
              Beyond the surfaces themselves, Capital supports architects, contractors and
              homeowners through the whole specification — technical guides, installation support,
              a digital showroom for previewing at real scale, and a dealer network that carries
              stock rather than catalogues. That is what a tiles company should be: not just a
              product, but the confidence that the product will still look right in ten years.
            </p>
          </div>

          <button type="button" className={'linkUnder ' + s.toggle} onClick={() => setMore((m) => !m)}>
            {more ? 'Read less' : 'Read more'}
          </button>
        </div>
      </div>
    </section>
  )
}
