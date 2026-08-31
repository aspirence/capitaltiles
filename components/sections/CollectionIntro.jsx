import Link from 'next/link'
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
  /* Opt-in: tightens the headline and lede on phones. Used by the flooring
     pages, whose intros ran to six lines at 375px. */
  compact = false,
  heroBg,
}) {
  const bg = heroBg || `/img/title-bg/${imageSlug(title)}.jpg`

  return (
    <section
      className={compact ? s.section + ' ' + s.compact : s.section}
      style={{ '--intro-bg': `url('${bg}')` }}
    >
      <div className="container">
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <i aria-hidden="true">/</i>
          <Link href={parent.href}>{parent.label}</Link>
          <i aria-hidden="true">/</i>
          <span>{crumb}</span>
        </nav>

        <h1 className={s.title}>{title}</h1>
        <p className={s.lede}>{lede}</p>
      </div>
    </section>
  )
}
