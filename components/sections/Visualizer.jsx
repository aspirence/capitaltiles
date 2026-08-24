import Link from 'next/link'
import s from './Visualizer.module.css'

/* Two ways to get started: a statement, then two full-height doors that lift
   their label and brighten their plate on hover. */

const DOORS = [
  {
    kicker: 'Free',
    title: 'Measure & Quote',
    copy: 'We come to you, measure up and check the subfloor, then put the numbers in writing.',
    href: '/contact-us/enquiry',
    img: '/img/visualizer/showroom.webp',
  },
  {
    kicker: 'Mitchell',
    title: 'Showroom',
    copy: 'Full sheets under proper light, boards you can walk on, samples to take home.',
    href: '/contact-us',
    img: '/img/spaces/commercial.jpg',
  },
]

export default function Visualizer() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>Two ways to start</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Get the measure of your project
            </h2>
          </div>
          <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '160ms' }}>
            Book a free measure and quote and we&rsquo;ll come to you, check the subfloor and price
            the job in writing — supply only, or supply and install. Or call into the Mitchell
            showroom, see full sheets and boards at proper size and take samples home to sit them
            against your own light and colours.
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
                  Find out more
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
          <span>Free measure and quote across Canberra and Queanbeyan</span>
          <Link href="/contact-us" className="linkUnder">Showroom hours and directions</Link>
        </div>
      </div>
    </section>
  )
}
