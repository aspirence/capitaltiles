import s from './Press.module.css'

/* Credibility band: the mastheads the ranges have appeared in. Lifted out of
   WhyChoose so it can sit on its own after the social rails. */

const PRESS = [
  { name: 'Grand Designs Australia', img: '/img/press/grand-designs.png' },
  { name: 'adore Home Magazine', img: '/img/press/adore-home.png' },
  { name: 'Home Design', img: '/img/press/home-design.png' },
  { name: 'Australian House & Garden', img: '/img/press/house-garden.png' },
]

export default function Press() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <p className={s.lead} data-reveal>Our product ranges have been featured in:</p>
        <ul className={s.logos}>
          {PRESS.map((p, i) => (
            <li key={p.name} data-reveal style={{ '--reveal-delay': i * 90 + 'ms' }}>
              <img src={p.img} alt={p.name} width="500" height="130" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
