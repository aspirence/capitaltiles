import Link from 'next/link'
import s from './BlogArticle.module.css'

/* Article page for one journal post: banner, meta strip, body, then the other
   posts. Content comes from components/blogData.js so the homepage carousel and
   these pages can never drift apart. */

export default function BlogArticle({ post, more }) {
  return (
    <>
      {/* ---------- banner ---------- */}
      <section className={s.banner}>
        <img src={post.img} alt="" />
        <div className={s.bannerShade} aria-hidden="true" />
        <div className={'container ' + s.bannerInner}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            <Link href="/blogs">Journal</Link>
            <i aria-hidden="true">/</i>
            <span>{post.cat}</span>
          </nav>
          <p className={s.kicker}>
            <span className={s.cat}>{post.cat}</span>
            <time dateTime={post.iso}>{post.date}</time>
          </p>
          <h1 className={s.title}>{post.title}</h1>
        </div>
      </section>

      {/* ---------- body ---------- */}
      <article className={'sectionPad ' + s.body}>
        <div className={'container ' + s.bodyInner}>
          <div className={s.prose}>
            {post.intro.map((p, i) => (
              <p key={i} className={i === 0 ? s.lede : undefined} data-reveal>{p}</p>
            ))}

            {post.sections.map((sec) => (
              <section className={s.block} key={sec.heading} data-reveal>
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                {sec.bullets?.length > 0 && (
                  <ul className={s.points}>
                    {sec.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <p className={s.takeaway} data-reveal>{post.takeaway}</p>

            <div className={s.cta} data-reveal>
              <p>
                Planning something like this? Book a free measure and quote, or drop into the
                Mitchell showroom and we will talk it through.
              </p>
              <div className={s.ctaRow}>
                <Link href="/contact-us/enquiry" className="cta"><span>Free Measure &amp; Quote</span></Link>
                <a href="tel:0262538158" className={s.phone}>02 6253 8158</a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ---------- more ---------- */}
      {more.length > 0 && (
        <section className={'sectionPad ' + s.more}>
          <div className="container">
            <header className={s.moreHead}>
              <p className="eyebrow" data-reveal>Keep reading</p>
              <h2 className={'title ' + s.moreTitle} data-reveal>More from the journal</h2>
            </header>
            <ul className={s.moreGrid}>
              {more.map((m, i) => (
                <li key={m.slug} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
                  <Link href={`/blogs/${m.slug}`} className={s.card}>
                    <span className={'zoomFrame ' + s.frame}>
                      <img src={m.img} alt="" loading="lazy" />
                      <span className={s.cardCat}>{m.cat}</span>
                    </span>
                    <span className={s.cardDate}>{m.date}</span>
                    <span className={s.cardTitle}>{m.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
