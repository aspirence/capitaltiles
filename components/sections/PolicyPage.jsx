import Link from 'next/link'
import EnquireLink from '../EnquireLink'
import PolicyRail from './PolicyRail'
import s from './PolicyPage.module.css'
import { BUSINESS, POLICIES } from '../policyData'
import { SHOWROOM } from '../siteData'

/* Long-form legal copy: a heading band, a jump rail so the longer policies are
   navigable, the sections themselves, the other policies at the foot, and a
   closing band. Nobody reads a policy idly — they are either about to order or
   already have a problem — so the page ends on the two things that actually
   move either of those along: the showroom number and a measure booking. */

export default function PolicyPage({ policy }) {
  const { slug, title, eyebrow, lede, sections } = policy
  const others = POLICIES.filter((p) => p.slug !== slug)

  return (
    <>
      <section className={s.head}>
        <div className="container">
          {/* Same 54rem track the body's rail-and-prose pair occupies, so the
              page keeps one left edge from the breadcrumb to the last
              paragraph instead of a full-width header over a centred body. */}
          <div className={s.headInner}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i>/</i>
            <span>Store Policies</span>
            <i>/</i>
            <span>{title}</span>
          </nav>

          <p className="eyebrow">{eyebrow}</p>
          <h1 className={s.title}>{title}</h1>
          <p className={s.lede}>{lede}</p>
          <p className={s.updated}>Last reviewed {BUSINESS.updated}</p>
          </div>
        </div>
      </section>

      <section className={'sectionPad ' + s.body}>
        <div className="container">
          <div className={s.layout}>
            {/* jump rail */}
            <aside className={s.railWrap}>
              <PolicyRail sections={sections} />
            </aside>

            {/* the policy itself */}
            <div className={s.prose}>
              {sections.map((sec, i) => (
                <section key={i} id={`s${i}`} className={s.block}>
                  <h2 className={s.h2}>{sec.heading}</h2>
                  {sec.paragraphs?.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {sec.bullets?.length > 0 && (
                    <ul className={s.bullets}>
                      {sec.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className={s.contact}>
                <div className={s.contactCopy}>
                  <h2 className={s.h2}>Still need a hand?</h2>
                  <p>
                    If anything here is unclear, ask us rather than guessing. Call{' '}
                    <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>, email{' '}
                    <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>, or call into the
                    showroom at {BUSINESS.address}.
                  </p>
                </div>
                <EnquireLink
                  subject={`Question about the ${title}`}
                  className={'cta ' + s.contactCta}
                >
                  <span>Book a Free Measure</span>
                </EnquireLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={'sectionPad ' + s.more}>
        <div className="container">
          <p className="eyebrow">The rest of them</p>
          <h2 className={'title ' + s.moreTitle}>Other store policies</h2>
          <ul className={s.moreGrid}>
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} className={s.moreCard}>
                  <span className={s.moreText}>
                    <span className={s.moreName}>{p.title}</span>
                    <span className={s.moreCopy}>{p.eyebrow}</span>
                  </span>
                  <svg
                    className={s.moreChevron}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    <path d="M6 3.5 11.5 9 6 14.5" strokeLinecap="square" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sectionPad bandDark">
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>Rather just ask someone?</h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            This page covers the general case. If yours is the exception — a delivery that arrived
            short, a batch that does not match the sample, or a floor you have not ordered yet —
            the showroom will settle it faster than the fine print will.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <EnquireLink subject={`Free measure & quote — from the ${title} page`} className="cta">
              <span>Book a Free Measure</span>
            </EnquireLink>
            <a href={SHOWROOM.phoneHref} className={s.phone}>{SHOWROOM.phone}</a>
          </div>
        </div>
      </section>
    </>
  )
}
