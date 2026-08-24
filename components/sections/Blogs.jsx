import Link from 'next/link'
import Carousel from '../Carousel'
import s from './Blogs.module.css'

/* Titles track the artwork: each card is matched to the room or surface its
   photo actually shows, so the copy never argues with the image. */
const POSTS = [
  {
    title: 'Slip ratings explained: choosing tiles for wet areas',
    date: '12 Aug 2026',
    cat: 'Technical',
    href: '/blogs/slip-ratings-wet-areas',
    img: '/img/blogs/blog-1.jpg',
  },
  {
    title: 'Wool, triexta or nylon: which carpet fibre suits you',
    date: '04 Aug 2026',
    cat: 'Carpet',
    href: '/blogs/carpet-fibres-compared',
    img: '/img/blogs/blog-2.jpg',
  },
  {
    title: 'Tiling over an existing floor: what we check first',
    date: '28 Jul 2026',
    cat: 'Renovation',
    href: '/blogs/tiling-over-an-existing-floor',
    img: '/img/blogs/blog-3.jpg',
  },
  {
    title: 'Hybrid or laminate: choosing the right floor for your home',
    date: '19 Jul 2026',
    cat: 'Flooring',
    href: '/blogs/hybrid-or-laminate',
    img: '/img/blogs/blog-4.jpg',
  },
  {
    title: 'Getting your floors ready for a Canberra winter',
    date: '09 Jul 2026',
    cat: 'Seasonal',
    href: '/blogs/floors-ready-for-canberra-winter',
    img: '/img/blogs/blog-5.jpg',
  },
  {
    title: 'Caring for grout: sealing, cleaning and regrouting',
    date: '02 Jul 2026',
    cat: 'Care',
    href: '/blogs/caring-for-grout',
    img: '/img/blogs/blog-6.jpg',
  },
]

export default function Blogs() {
  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <Carousel
          cols={3}
          colsTablet={1.9}
          colsMobile={1.1}
          arrows="head"
          label="Latest articles"
          headSlot={
            <div className={s.head}>
              <div>
                <p className="eyebrow" data-reveal>From the journal</p>
                <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
                  Latest Blogs
                </h2>
              </div>
              <Link href="/blogs" className={'linkUnder ' + s.viewAll}>View all</Link>
            </div>
          }
        >
          {POSTS.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
              <Link href={p.href} className={s.card}>
                <span className={'zoomFrame ' + s.frame}>
                  <img src={p.img} alt="" loading="lazy" />
                  <span className={s.cat}>{p.cat}</span>
                </span>
                <span className={s.date}>{p.date}</span>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <span className={s.more}>
                  Read more
                  <i aria-hidden="true">+</i>
                </span>
              </Link>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
