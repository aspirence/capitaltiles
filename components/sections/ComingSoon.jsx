import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import s from './ComingSoon.module.css'

/* The "still being built" page. It backs the catch-all route, and also the
   product routes: /tiles/<handle> and its siblings sit in front of the
   catch-all, so an address that is not a product — the Living Room and Bedroom
   links in the footer, for one — would otherwise hard 404 instead of landing
   here.

   Everybody who arrives clicked something they wanted, so the page is composed
   as a junction rather than an apology. It used to offer one route out and
   point it at the homepage twice over — the crumb and the button went to the
   same place — while the two things the business actually sells sat in the
   footer, entirely below the fold on a 1440 frame and behind two collapsed
   toggles on a phone. */

/* Stop words stay lowercase unless they open the line. The titles here are
   built out of URL segments and set at --f-title in Playfair, where a slug like
   care-and-aftercare reading "Care And Aftercare" is hard to miss. */
const STOP_WORDS = new Set(['a', 'and', 'of', 'the', 'to'])

export function titleFromSlug(slug = []) {
  const last = slug[slug.length - 1] || 'Page'
  return last
    .split('-')
    .map((w, i) =>
      i > 0 && STOP_WORDS.has(w.toLowerCase())
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(' ')
}

/* The three sections that render this page from their own [handle] route, which
   always calls it with exactly ['<section>', '<handle>']. A miss there is a
   range the visitor asked for by name — renamed or retired — and worth carrying
   into the enquiry form. Any other shape is just a wrong address, and
   prefilling from it would send the showroom "I am interested in Not a Real
   Page". */
const RANGE_SECTIONS = new Set(['tiles', 'flooring', 'carpet'])

export default function ComingSoon({ slug = [] }) {
  const title = titleFromSlug(slug)
  const asked = slug.length === 2 && RANGE_SECTIONS.has(slug[0]) ? title : ''

  /* Hrefs built cumulatively. On /tiles/outdoor/some-range both /tiles and
     /tiles/outdoor are real pages, and the trail already knows them — rendering
     them as grey text threw away two live destinations on the one page whose
     whole job is putting people back into the site. */
  const trail = [
    { label: 'Home', href: '/' },
    ...slug.map((part, i) => ({
      label: titleFromSlug([part]),
      href: '/' + slug.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <section className={s.wrap}>
      <div className={s.grid}>
        <div className={s.copy}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            {trail.map((step, i) =>
              i < trail.length - 1 ? (
                <span key={step.href}>
                  <Link href={step.href}>{step.label}</Link>
                  <i aria-hidden="true">/</i>
                </span>
              ) : (
                <span key={step.href} aria-current="page">
                  {step.label}
                </span>
              ),
            )}
          </nav>

          <p className="eyebrow" data-reveal>
            In production
          </p>
          <h1 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '60ms' }}>
            {title}
          </h1>
          <p className={'lede ' + s.lede} data-reveal style={{ '--reveal-delay': '120ms' }}>
            This section is still being built. Everything else is open: book a free measure and
            quote, come and stand on the samples in Mitchell, or head back to the homepage for the
            full range.
          </p>

          <div className={s.actions} data-reveal style={{ '--reveal-delay': '180ms' }}>
            <Link href="/" className="cta">
              <span>Back to Home</span>
            </Link>

            <EnquireLink
              range={asked}
              subject={asked ? 'Product enquiry' : 'Free measure & quote — page in production'}
              className={'cta ' + s.ctaOutline}
            >
              <span>Book a free measure &amp; quote</span>
            </EnquireLink>
          </div>

          <Link
            href="/contact-us"
            className="linkUnder"
            data-reveal
            style={{ '--reveal-delay': '240ms' }}
          >
            Visit the Mitchell showroom
          </Link>
        </div>

        {/* The band was the only one on the site with no picture in it at all,
            which is most of why it read as a browser error screen set in
            Playfair rather than a page of this site. */}
        <div className={s.plate} data-reveal="scale">
          <img src="/img/about/showroom.jpg" alt="A living room floored in patterned tiles" />
        </div>
      </div>
    </section>
  )
}
