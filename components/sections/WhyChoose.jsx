'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './WhyChoose.module.css'

/* Closes the page the way both references do: a row of proof points over the
   long-form brand copy, with the tail collapsed behind a read-more. */

export default function WhyChoose() {
  const [more, setMore] = useState(false)

  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.inner}>
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

        <div className={s.media} data-reveal="right" style={{ '--reveal-delay': '120ms' }}>
          <div className="zoomFrame">
            <img
              src="/img/about/why-choose.jpg"
              alt="A Capital Tiles surface in a finished living space"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
