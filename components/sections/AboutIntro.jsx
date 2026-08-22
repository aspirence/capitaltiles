import s from './AboutIntro.module.css'

/* "Our Introduction": the collage on the left is supplied as one composed
   artwork; the right column carries the eyebrow, headline, copy, ticked list
   and signature strip. */

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
        {/* ---------- collage (supplied as one composed artwork) ---------- */}
        <div className={s.media} data-reveal="left">
          <img
            src="/our.png"
            alt="Capital Tiles interiors — crafting spaces, creating trust"
            width="1341"
            height="1173"
            loading="lazy"
          />
        </div>

        {/* ---------- copy ---------- */}
        <div className={s.copy}>
          <p className={s.eyebrow} data-reveal>Our Introduction</p>

          <h2 className={s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Welcome to Capital Tiles &amp; Flooring
          </h2>
          <span className={s.rule} aria-hidden="true" />

          <p className={s.lede} data-reveal style={{ '--reveal-delay': '160ms' }}>
            We specialise in high-quality tile and flooring solutions with expert advice,
            personalised service and end-to-end project support. Proudly based in Canberra, we
            supply and professionally install premium surfaces — making your renovation or build
            seamless from start to finish.
          </p>

          <ul className={s.points}>
            {POINTS.map((p, i) => (
              <li key={p} data-reveal style={{ '--reveal-delay': 220 + i * 80 + 'ms' }}>
                <span className={s.tick}><Tick /></span>
                {p}
              </li>
            ))}
          </ul>

          <div className={s.sign} data-reveal style={{ '--reveal-delay': '560ms' }}>
            <span className={s.signMark}>
              <img src="/icon.png" alt="" width="512" height="512" loading="lazy" />
            </span>
            <span className={s.signText}>
              <em>Capital Tiles &amp; Flooring</em>
              <small>Supply &amp; Installation · Mitchell, ACT</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
