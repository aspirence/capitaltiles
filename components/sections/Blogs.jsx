import Link from 'next/link'
import Carousel from '../Carousel'
import { POSTS } from '../blogData'
import s from './Blogs.module.css'

/* The rail is a window onto components/blogData.js — the same source the /blogs
   index and every article page read from, so a card can never advertise a title
   the article no longer has. */

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
            <li key={p.slug} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
              <Link href={`/blogs/${p.slug}`} className={s.card}>
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
