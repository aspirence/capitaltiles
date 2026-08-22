import Link from 'next/link'
import s from './CollectionIntro.module.css'

/* Page head for a collection listing: breadcrumb, H1 and a short lead. */
export default function CollectionIntro({
  crumb,
  title,
  lede,
  parent = { label: 'Tiles', href: '/tiles' },
}) {
  return (
    <section className={s.section}>
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
