import Link from 'next/link'
import s from './BlogArticle.module.css'

/* Article page for one journal post: banner, meta strip, then the copy on the
   left with the other posts in a column beside it, so the next read stays in
   view the whole way down rather than waiting at the bottom of the page.
   Content comes from components/blogData.js so the homepage carousel and these
   pages can never drift apart. */

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

          {/* ---------- other posts, beside the copy ---------- */}
          {more.length > 0 && (
            <aside className={s.aside} aria-label="More from the journal">
              <div className={s.asideInner}>
                <p className={s.asideEyebrow}>Keep reading</p>
                <h2 className={s.asideTitle}>More from the journal</h2>

                <ul className={s.asideList}>
                  {more.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/blogs/${m.slug}`} className={s.asideCard}>
                        <span className={s.asideFrame}>
                          <img src={m.img} alt="" loading="lazy" />
                        </span>
                        <span className={s.asideText}>
                          <span className={s.asideCat}>{m.cat}</span>
                          <span className={s.asideName}>{m.title}</span>
                          <span className={s.asideDate}>{m.date}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href="/blogs" className={'linkUnder ' + s.asideAll}>All journal posts</Link>
              </div>
            </aside>
          )}
        </div>
      </article>
    </>
  )
}
