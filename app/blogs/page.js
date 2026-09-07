import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import { POSTS } from '@/components/blogData'
import { SHOWROOM } from '@/components/siteData'
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
          {/* No dates on the index. None of this advice is perishable, the six
              posts are one 41-day burst, and a stamped list would read as a
              journal that stopped. The article page still carries
              <time dateTime={iso}> where search can use it. */}
          <Link href={`/blogs/${lead.slug}`} className={s.lead} data-reveal>
            <span className={'zoomFrame ' + s.leadFrame}>
              <img src={lead.img} alt="" />
              <span className={s.cat}>{lead.cat}</span>
            </span>
            <span className={s.leadBody}>
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
                  <span className={s.cardTitle}>{p.title}</span>
                  <span className={s.excerpt}>{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Somebody reading the index is browsing, not deciding, so the ask that
          fits is the showroom rather than a quote request. */}
      <section className="sectionPad bandDark">
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>Easier to judge in person</h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            Everything these posts talk about is on the floor at {SHOWROOM.address} — tiles,
            flooring and carpet side by side, under one roof. Open {SHOWROOM.hours}, and there is
            no appointment to make.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <EnquireLink subject="Showroom visit — from the journal" className="cta">
              <span>Plan a Visit</span>
            </EnquireLink>
            <a href={SHOWROOM.phoneHref} className={s.phone}>{SHOWROOM.phone}</a>
          </div>
        </div>
      </section>
    </>
  )
}
