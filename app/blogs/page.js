import Link from 'next/link'
import { POSTS } from '@/components/blogData'
import s from './blogs.module.css'

export const metadata = {
  title: "Journal — Tile, Flooring & Carpet Advice | Capital Tiles",
  description:
    'Practical advice from the Capital Tiles & Flooring team in Canberra — slip ratings, carpet fibres, tiling over an existing floor, hybrid versus laminate, and looking after grout.',
}

export default function BlogsIndexPage() {
  const [lead, ...rest] = POSTS

  return (
    <>
      <section className={s.head}>
        <div className="container">
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            <span>Journal</span>
          </nav>
          <p className={s.eyebrow}>From the journal</p>
          <h1 className={s.title}>Advice from the showroom floor</h1>
          <p className={s.lede}>
            What we end up explaining most often — how a slip rating actually works, which carpet
            fibre survives a hallway, when tiling over the old floor is a false economy, and what a
            Canberra winter does to timber.
          </p>
        </div>
      </section>

      <section className={'sectionPad ' + s.body}>
        <div className="container">
          <Link href={`/blogs/${lead.slug}`} className={s.lead} data-reveal>
            <span className={'zoomFrame ' + s.leadFrame}>
              <img src={lead.img} alt="" />
              <span className={s.cat}>{lead.cat}</span>
            </span>
            <span className={s.leadBody}>
              <span className={s.date}>{lead.date}</span>
              <span className={s.leadTitle}>{lead.title}</span>
              <span className={s.excerpt}>{lead.excerpt}</span>
              <span className={'linkUnder ' + s.more}>Read more</span>
            </span>
          </Link>

          <ul className={s.grid}>
            {rest.map((p, i) => (
              <li key={p.slug} data-reveal style={{ '--reveal-delay': i * 70 + 'ms' }}>
                <Link href={`/blogs/${p.slug}`} className={s.card}>
                  <span className={'zoomFrame ' + s.frame}>
                    <img src={p.img} alt="" loading="lazy" />
                    <span className={s.cat}>{p.cat}</span>
                  </span>
                  <span className={s.date}>{p.date}</span>
                  <span className={s.cardTitle}>{p.title}</span>
                  <span className={s.excerpt}>{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
