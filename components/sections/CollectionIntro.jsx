import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import s from './CollectionIntro.module.css'

/* Page head for a collection listing: breadcrumb, H1 and a short lead. */
const imageSlug = (text) =>
  text
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function CollectionIntro({
  crumb,
  title,
  lede,
  parent = { label: 'Tiles', href: '/tiles' },
  heroBg,
  /* The band closed on "supplied and professionally installed" and then gave
     the reader nothing to press: on the 28 routes this heads, the first thing
     anyone could act on was the measure-and-quote slab in the closing copy,
     about 1,400px further down. The ask now sits with the claim it answers.
     A route with a better one passes it; a route with none passes null. */
  cta = 'Book a free measure & quote',
}) {
  const bg = heroBg || `/img/title-bg/${imageSlug(title)}.jpg`

  return (
    <section
      className={s.section}
      style={{ '--intro-bg': `url('${bg}')` }}
    >
      <div className="container">
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {/* The section landings — /tiles, /carpet, /flooring — sit directly
              under Home and name it as their parent, which printed it twice.
              Home is already the first crumb, so it is not repeated. */}
          {parent.href !== '/' && (
            <>
              <i aria-hidden="true">/</i>
              <Link href={parent.href}>{parent.label}</Link>
            </>
          )}
          <i aria-hidden="true">/</i>
          <span>{crumb}</span>
        </nav>

        <h1 className={s.title}>{title}</h1>
        <p className={s.lede}>{lede}</p>

        {cta && (
          <EnquireLink range={crumb} subject="Collection enquiry"
            className={'cta ' + s.cta}>
            <span>{cta}</span>
          </EnquireLink>
        )}
      </div>
    </section>
  )
}
