import Link from 'next/link'
import EnquireLink from '../EnquireLink'
import { SHOWROOM } from '../siteData'
import s from './BlogArticle.module.css'

/* Article page for one journal post: banner, meta strip, then the copy on the
   left with the other posts in a column beside it, so the next read stays in
   view the whole way down rather than waiting at the bottom of the page.
   Content comes from components/blogData.js so the homepage carousel and these
   pages can never drift apart.

   The ask used to sit in a grey box inside the reading column, which put it
   halfway up a desktop page and left the article to end on nothing. It closes
   the page now instead, in the band every other template ends on, with a
   compact second one at the top of the sticky rail — the rail rides the whole
   article, and every other thing in it points away from the piece. */

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
          </div>

          {/* ---------- other posts, beside the copy ---------- */}
          {more.length > 0 && (
            <aside className={s.aside} aria-label="More from the journal">
              <div className={s.asideInner}>
                {/* The ask is the head of the panel now, not a bordered box
                    inside it -- see the CSS for the 139px of rail that was
                    hanging below a laptop viewport. Generic on purpose: this
                    rail runs on every post, so the ask cannot lean on the
                    subject of any one of them. */}
                <p className={s.asideEyebrow}>Ask the showroom</p>
                <p className={s.askCopy}>Tell us the room, we will check the finish.</p>
                <EnquireLink
                  subject={`Question — "${post.title}"`}
                  className={'cta ' + s.askCta}
                >
                  <span>Ask about your room</span>
                </EnquireLink>

                {/* One eyebrow in the rail, not two: "Keep reading" said what the
                    heading under it already said, for 29px. */}
                <h2 className={s.asideTitle}>More from the journal</h2>

                <ul className={s.asideList}>
                  {more.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/blogs/${m.slug}`} className={s.asideCard}>
                        <span className={s.asideFrame}>
                          <img src={m.img} alt="" loading="lazy" />
                        </span>
                        {/* No date. Of the four fields it is the one that never
                            earns the click, and three of them cost 79px this rail
                            has to spend on staying inside the viewport. The date
                            is on the page the card opens. */}
                        <span className={s.asideText}>
                          <span className={s.asideCat}>{m.cat}</span>
                          <span className={s.asideName}>{m.title}</span>
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

      {/* ---------- closing cta ---------- */}
      <section className="sectionPad bandDark">
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>
            Want this checked on your own floor?
          </h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            A free measure takes about half an hour. We come to you, measure the rooms, check what
            is under the existing floor, and put a price in writing before anything is ordered.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <EnquireLink
              subject={`Free measure & quote — after "${post.title}"`}
              className={'cta ' + s.ctaBtn}
            >
              <span>Book a Free Measure</span>
            </EnquireLink>
            <a href={SHOWROOM.phoneHref} className={s.phone}>{SHOWROOM.phone}</a>
          </div>
        </div>
      </section>
    </>
  )
}
