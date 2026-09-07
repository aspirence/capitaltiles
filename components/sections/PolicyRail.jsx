'use client'

import { useEffect, useState } from 'react'
import s from './PolicyPage.module.css'

/* The "On this page" rail.

   It is sticky, so on a long policy it sits beside the reader for the whole
   document — nearly 5,000px on the refund policy. Without a current-section
   state that is eleven identical grey links for the entire scroll, and the one
   question the rail exists to answer (where am I?) is the one it cannot.

   Split out of PolicyPage so the page itself stays a server component; only
   the rail needs to be client-side. */
export default function PolicyRail({ sections }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const blocks = sections
      .map((_, i) => document.getElementById('s' + i))
      .filter(Boolean)
    if (!blocks.length) return

    /* Headings cross the top of the viewport, so the interesting band is the
       top of the screen, not its middle: a section counts as current once its
       heading passes under the fixed header and until the next one does. The
       bottom inset keeps the last section from being unreachable on a short
       document. */
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(blocks.indexOf(hit.target))
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    blocks.forEach((b) => io.observe(b))
    return () => io.disconnect()
  }, [sections])

  return (
    <nav className={s.rail} aria-label="On this page">
      <p className={s.railHead}>On this page</p>
      <ul>
        {sections.map((sec, i) => (
          <li key={i}>
            <a
              href={`#s${i}`}
              className={i === active ? s.railOn : undefined}
              aria-current={i === active ? 'true' : undefined}
            >
              {sec.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
