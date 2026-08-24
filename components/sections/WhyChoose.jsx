'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './WhyChoose.module.css'

/* Closes the page with the long-form showroom and installation copy, the tail
   collapsed behind a read-more. */

export default function WhyChoose() {
  const [more, setMore] = useState(false)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.inner}>
        <div className={s.prose}>
          <h2 className={'title ' + s.title} data-reveal>
            Why choose Capital Tiles: your local Canberra supplier and installer
          </h2>

          <div className={more ? s.copy + ' ' + s.copyOpen : s.copy} data-reveal
            style={{ '--reveal-delay': '90ms' }}>
            <p>
              Capital Tiles &amp; Flooring is a Canberra showroom you can walk into. Our space at
              3 Pelle Street, Mitchell keeps full sheets and full boards on display, so you can see
              a colour at real scale, run a hand over the finish and carry it to the doorway to
              check it in daylight — tiles, flooring and carpet in the one room. We are open
              Monday to Friday, 9am to 5pm, and Saturday, 10am to 3pm.
            </p>
            <p>
              Buy supply-only if you have your own trade lined up, or let our
              installers see it through: lifting the old floor, preparing the subfloor, laying,
              grouting, sealing and showing you how to look after the surface once we are done.
              The people who quote the job are the people who lay it, so nothing is lost between
              the showroom and the site — whether that is{' '}
              <Link href="/tiles/outdoor" className={s.inline}>outdoor tiles</Link> around a pool
              and patio, hybrid or timber flooring through the living areas, or carpet in the
              bedrooms.
            </p>
            <p>
              Every project starts with a free measure and quote at your place, so the metres,
              the falls and the tricky corners are settled before anything is ordered. We service
              Canberra and Queanbeyan, out to Yass, Bungendore and Murrumbateman, and across
              Gungahlin, Belconnen, Tuggeranong and Woden. Call 02 6253 8158 or send your enquiry
              to cbr@capitaltiles.com.au and we will find a time that suits you.
            </p>
          </div>

          <button type="button" className={'linkUnder ' + s.toggle} onClick={() => setMore((m) => !m)}>
            {more ? 'Read less' : 'Read more'}
          </button>
        </div>

        <div className={s.media} data-reveal="right" style={{ '--reveal-delay': '120ms' }}>
          <div className="zoomFrame">
            <img
              src="/img/about/why-choose.jpg"
              alt="A living room with large-format stone-look floor and wall tiles"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
