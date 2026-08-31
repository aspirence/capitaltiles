import Link from 'next/link'
import s from './PolicyPage.module.css'
import { BUSINESS, POLICIES } from '../policyData'

/* Long-form legal copy: a heading band, a jump rail so the longer policies are
   navigable, the sections themselves, and the other policies at the foot. */

export default function PolicyPage({ policy }) {
  const { slug, title, eyebrow, lede, sections } = policy
  const others = POLICIES.filter((p) => p.slug !== slug)

  return (
    <>
      <section className={s.head}>
        <div className="container">
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
      </section>

      <section className={'sectionPad ' + s.body}>
        <div className="container">
          <div className={s.layout}>
            {/* jump rail */}
            <aside className={s.railWrap}>
              <nav className={s.rail} aria-label="On this page">
                <p className={s.railHead}>On this page</p>
                <ul>
                  {sections.map((sec, i) => (
                    <li key={i}>
                      <a href={`#s${i}`}>{sec.heading}</a>
                    </li>
                  ))}
                </ul>
              </nav>
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
                <h2 className={s.h2}>Still need a hand?</h2>
                <p>
                  If anything here is unclear, ask us rather than guessing. Call{' '}
                  <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>, email{' '}
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>, or call into the
                  showroom at {BUSINESS.address}.
                </p>
                <Link href="/contact-us" className={'linkUnder ' + s.contactLink}>
                  Contact us
                </Link>
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
                  <span className={s.moreName}>{p.title}</span>
                  <span className={s.moreCopy}>{p.eyebrow}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
