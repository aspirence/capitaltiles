import s from './Social.module.css'

/* The Capital Tiles & Flooring Instagram feed, as an edge-to-edge marquee of two
   rails drifting in opposite directions. Purely decorative motion, so it pauses
   on hover. Every tile opens @capitaltilesandflooring in a new tab. */

const FEED = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  img: '/img/social/social-' + n + '.jpg',
  href: 'https://www.instagram.com/capitaltilesandflooring/',
}))

const ROW_A = FEED.slice(0, 4)
const ROW_B = FEED.slice(4)

function Rail({ items, reverse }) {
  return (
    <div className={reverse ? s.rail + ' ' + s.reverse : s.rail}>
      <div className={s.railTrack}>
        {[0, 1, 2].map((dup) => (
          <div className={s.railGroup} key={dup}>
            {items.map((item, i) => (
              <a
                key={dup + '-' + i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.tile}
                aria-label="Open on Instagram"
                tabIndex={dup === 0 ? 0 : -1}
                aria-hidden={dup !== 0}
              >
                <img src={item.img} alt="" loading="lazy" />
                <span className={s.tileIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                    strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Social() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className={'container ' + s.head}>
        <div>
          <p className="eyebrow" data-reveal>@capitaltilesandflooring</p>
          <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Ideas for your next room
          </h2>
        </div>
        <a
          className={'cta ' + s.cta}
          href="https://www.instagram.com/capitaltilesandflooring/"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={{ '--reveal-delay': '150ms' }}
        >
          <span>Follow us on Instagram</span>
        </a>
      </div>

      <div className={s.rails} data-reveal="scale">
        <Rail items={ROW_A} />
        <Rail items={ROW_B} reverse />
      </div>
    </section>
  )
}
