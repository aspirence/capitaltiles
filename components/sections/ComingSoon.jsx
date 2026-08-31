import Link from 'next/link'
import s from './ComingSoon.module.css'

/* The "still being built" page. It backs the catch-all route, and also the
   product routes: /tiles/<handle> and its siblings sit in front of the
   catch-all, so an address that is not a product — the Living Room and Bedroom
   links in the footer, for one — would otherwise hard 404 instead of landing
   here. */

export function titleFromSlug(slug = []) {
  const last = slug[slug.length - 1] || 'Page'
  return last
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function ComingSoon({ slug = [] }) {
  const title = titleFromSlug(slug)
  const trail = ['Home', ...slug.map((part) => titleFromSlug([part]))]

  return (
    <section className={s.wrap}>
      <div className={'container ' + s.inner}>
        <nav className={s.crumbs} aria-label="Breadcrumb">
          {trail.map((t, i) => (
            <span key={t + i}>
              {i === 0 ? <Link href="/">{t}</Link> : t}
              {i < trail.length - 1 && <i aria-hidden="true">/</i>}
            </span>
          ))}
        </nav>

        <p className="eyebrow">In production</p>
        <h1 className={'title ' + s.title}>{title}</h1>
        <p className={'lede ' + s.lede}>
          This section is being built. The homepage is live — head back there to explore the
          collections, spaces and design tools.
        </p>

        <Link href="/" className="cta">
          <span>Back to Home</span>
        </Link>
      </div>
    </section>
  )
}
