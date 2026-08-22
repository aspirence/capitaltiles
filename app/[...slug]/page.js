import Link from 'next/link'
import s from './comingSoon.module.css'

/* Only the homepage is built out so far. This catch-all gives every link on it
   a real destination — without it, Next prefetches ~60 dead routes on load and
   each nav click lands on a 404. */

function titleFromSlug(slug = []) {
  const last = slug[slug.length - 1] || 'Page'
  return last
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  return { title: titleFromSlug(slug) + ' — Capital Tiles' }
}

export default async function CatchAll({ params }) {
  const { slug } = await params
  const title = titleFromSlug(slug)
  const trail = ['Home', ...(slug || []).map(titleFromSlug)]

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
