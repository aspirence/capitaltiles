import Link from 'next/link'
import Carousel from '../Carousel'
import s from './Blogs.module.css'

/* Titles track the artwork: several of these hero images carry the article
   headline baked in, so the card copy has to match what the image says. */
const POSTS = [
  {
    title: 'Grip tiles for outdoor: durable non-slip floors that last',
    date: '12 Aug 2026',
    cat: 'Technical',
    href: '/blogs/grip-tiles-outdoor',
    img: '/img/blogs/blog-1.jpg',
  },
  {
    title: 'Bedroom tile ideas that make a small room feel larger',
    date: '04 Aug 2026',
    cat: 'Bedroom',
    href: '/blogs/bedroom-tile-ideas',
    img: '/img/blogs/blog-2.jpg',
  },
  {
    title: 'Easy living room decor ideas to transform your home fast',
    date: '28 Jul 2026',
    cat: 'Living',
    href: '/blogs/living-room-decor-ideas',
    img: '/img/blogs/blog-3.jpg',
  },
  {
    title: 'Top 10 kitchen sink designs for modern Indian homes',
    date: '19 Jul 2026',
    cat: 'Kitchen',
    href: '/blogs/kitchen-sink-designs',
    img: '/img/blogs/blog-4.jpg',
  },
  {
    title: 'Modern basin design ideas worth specifying this year',
    date: '09 Jul 2026',
    cat: 'Bathware',
    href: '/blogs/modern-basin-designs',
    img: '/img/blogs/blog-5.jpg',
  },
  {
    title: 'Creative tile patterns for every room in your house',
    date: '02 Jul 2026',
    cat: 'Inspiration',
    href: '/blogs/creative-tile-patterns',
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
