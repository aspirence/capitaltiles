import EnquireLink from '@/components/EnquireLink'
import s from './AboutIntro.module.css'

/* "Our Introduction": a two-shot collage on the left, and on the right the
   eyebrow, headline, copy, ticked list and the page's first ask.

   The collage used to be one supplied PNG — rounded corners, an off-palette
   red and the tagline baked into the raster, which on a phone rendered the
   card's headline at about 6px. It is assembled here instead, so the type is
   type and the corners are square. */

const POINTS = [
  'Supply and installation under one roof.',
  'Free measure and quote, with no obligation.',
  'Tiles, timber, hybrid, vinyl and carpet in stock.',
  'Local team that knows Canberra homes and climate.',
]

function Tick() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  )
}

export default function AboutIntro() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.grid}>
        {/* ---------- collage ---------- */}
        <div className={s.media} data-reveal="left">
          <span className={s.dots} aria-hidden="true" />

          <div className={'zoomFrame ' + s.shotA}>
            <img
              src="/img/about/showroom.jpg"
              alt="Patterned porcelain floor running through an open living room"
              width="1000"
              height="1000"
              loading="lazy"
            />
          </div>

          <div className={'zoomFrame ' + s.shotB}>
            <img
              src="/img/about/craft.jpg"
              alt="Timber-look plank tiles laid close up"
              width="1200"
              height="1200"
              loading="lazy"
            />
          </div>

          <p className={s.tagline}>
            <span className={s.taglineHead}>Quality flooring.<br />Expertly installed.</span>
            <span className={s.taglineSub}>
              Premium tiles and flooring, from selection to installation.
            </span>
          </p>
        </div>

        {/* ---------- copy ---------- */}
        <div>
          <p className={s.eyebrow} data-reveal>Our Introduction</p>

          <h2 className={s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Welcome to Capital Tiles &amp; Flooring
          </h2>
          <span className={s.rule} aria-hidden="true" />

          <p className={s.lede} data-reveal style={{ '--reveal-delay': '160ms' }}>
            We have supplied and laid Canberra floors since 1977 — tiles, timber, hybrid, vinyl
            and carpet, chosen in our Mitchell showroom and installed by our own team. Expert
            advice, personalised service and end-to-end project support keep a renovation or a
            new build moving from the first sample to the last sealed edge.
          </p>

          <ul className={s.points}>
            {POINTS.map((p, i) => (
              <li key={p} data-reveal style={{ '--reveal-delay': 220 + i * 80 + 'ms' }}>
                <span className={s.tick}><Tick /></span>
                {p}
              </li>
            ))}
          </ul>

          {/* The section that states what the business does now hands off to
              the ask, rather than to a decorative signature. */}
          <div className={s.actions} data-reveal style={{ '--reveal-delay': '560ms' }}>
            <EnquireLink subject="Free measure & quote" className="cta">
              <span>Book a free measure &amp; quote</span>
            </EnquireLink>
            <span className={s.signLine}>Supply &amp; Installation · Mitchell, ACT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
