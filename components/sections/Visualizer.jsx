import Link from 'next/link'
import s from './Visualizer.module.css'

/* Simpolo's digital-showroom block: a statement, then two full-height doors
   that lift their label and brighten their plate on hover. */

const DOORS = [
  {
    kicker: 'Digital',
    title: 'Showroom',
    copy: 'Walk the full range in 3D and see every tile at real scale before you commit.',
    href: '/visualizer/showroom',
    img: '/img/visualizer/showroom.webp',
  },
  {
    kicker: 'Virtual',
    title: 'Space Creator',
    copy: 'Lay your own floor plan, drop in furniture and light it — then export the spec.',
    href: '/visualizer/space-creator',
    img: '/img/visualizer/space-creator.webp',
  },
]

export default function Visualizer() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>Design tools</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Transform your spaces effortlessly
            </h2>
          </div>
          <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '160ms' }}>
            Capital&rsquo;s Digital Showroom and Virtual Space Creator let you select tiles online and
            design your home from anywhere. Browse the complete range, preview surfaces in 3D and
            check how floor and wall tiles read together — furniture, fixtures and budget included,
            in ultra-realistic detail.
          </p>
        </div>

        <div className={s.doors}>
          {DOORS.map((d, i) => (
            <Link
              key={d.title}
              href={d.href}
              className={s.door}
              data-reveal={i === 0 ? 'left' : 'right'}
              style={{ '--reveal-delay': i * 120 + 'ms' }}
            >
              <img src={d.img} alt="" loading="lazy" />
              <span className={s.doorShade} aria-hidden="true" />

              <span className={s.doorBody}>
                <span className={s.doorKicker}>{d.kicker}</span>
                <span className={s.doorTitle}>{d.title}</span>
                <span className={s.doorCopy}>{d.copy}</span>
                <span className={s.doorCta}>
                  Discover
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className={s.strip} data-reveal style={{ '--reveal-delay': '200ms' }}>
          <span>Capital tiles design, at your fingertips</span>
          <Link href="/visualizer/calculator" className="linkUnder">Try the tiles calculator</Link>
        </div>
      </div>
    </section>
  )
}
