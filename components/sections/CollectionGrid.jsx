'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import { useOverflow } from '@/components/useOverflow'
import s from './CollectionGrid.module.css'

/* Collection browser, to the Simpolo listing pattern: a filter rail on the
   left, and on the right a header row (title, item count, order-by) over a
   card grid. Each card shows the range name, a two-line blurb, its
   colour / finish / size counts, and View More / Enquire actions.

   Fully data-driven — every collection listing renders through this. */

/* An open panel caps at 17rem, which is eight option rows, and the site paints
   no scrollbar — so a list of forty colours looks exactly like a list that
   ends at eight. Past FACET_ROWS the list is given the bottom fade globals.css
   asks for, and past FACET_SEARCH a field as well, because forty values is not
   an overflow a customer solves by scrolling blind. */
const FACET_ROWS = 8
const FACET_SEARCH = 12

/* Every distinct value across the range, most-used first. */
function facet(items, key) {
  const counts = new Map()
  items.forEach((p) => p[key].forEach((v) => counts.set(v, (counts.get(v) || 0) + 1)))
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

/* The brand strings are typed by hand across the data files and the same maker
   appears more than one way — "Godfrey Hirst" and "God Freyhirst", "EC Carpets"
   and "EC carpets". Printed verbatim that is two checkboxes for one brand, each
   holding half the rows, so ticking either silently drops the other half. Keyed
   on a normalised form they merge; the first spelling seen is the one shown. */
const brandKey = (v) => v.trim().toLowerCase()

function brandFacet(items) {
  const counts = new Map()
  const label = new Map()
  items.forEach((p) => {
    if (!p.brand) return
    const key = brandKey(p.brand)
    if (!label.has(key)) label.set(key, p.brand.trim())
    counts.set(key, (counts.get(key) || 0) + 1)
  })
  return [...counts.entries()]
    .map(([key, n]) => [label.get(key), n])
    .sort((a, b) => b[1] - a[1])
}

/* The blurbs come off the old site's collection pages: an SEO page title run
   straight into the opening sentence, then a hard cut at ~150 characters that
   lands mid-word — "a luxurious travertine-look porcel". The clamp below then
   stacks its own ellipsis on that. Until the data is rewritten by hand, close
   the sentence on the last whole word and tidy the space the scrape left in
   front of its punctuation. A `short` field, once written, wins outright. */
function blurbOf(p) {
  if (p.short) return p.short
  const text = (p.blurb || '').replace(/\s+([.,;:])/g, '$1').trim()
  if (!text || /[.!?]$/.test(text)) return text
  return text.replace(/\s+\S*$/, '').replace(/[\s&,;:—-]+$/, '') + '…'
}

function Chevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="14" height="14" fill="currentColor"
      aria-hidden="true">
      <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
    </svg>
  )
}

export default function CollectionGrid({ items: all, heading, basePath, imgPath }) {
  /* A facet with one value narrows nothing — every item already carries it, so
     the count beside the checkbox equals the item count. Brand was the first
     group in the rail and on most ranges it is a single maker, which made the
     first thing a customer touched here a control that does nothing. Dropping
     them also retires the "not listed for this range" panel, which opened onto
     an apology. */
  const GROUPS = useMemo(
    () =>
      [
        { key: 'brand', label: 'Brand', values: brandFacet(all) },
        { key: 'colours', label: 'Colour', values: facet(all, 'colours') },
        { key: 'finishes', label: 'Finish', values: facet(all, 'finishes') },
        { key: 'sizes', label: 'Size', values: facet(all, 'sizes') },
      ].filter((g) => g.values.length > 1),
    [all],
  )

  const [open, setOpen] = useState('Colour')
  const [picked, setPicked] = useState({})   // { groupKey: Set(values) }
  const [find, setFind] = useState({})       // { groupLabel: query }
  const [order, setOrder] = useState('latest')
  const [drawer, setDrawer] = useState(false)

  /* Filters / count / order-by need about 340px and a 360px phone leaves the
     container 328, so the row is a rail there rather than something that pushes
     the page sideways. Its ground is the section's white, which is the fade's
     own default, so nothing has to be declared for it. */
  const { ref: metaRef, fade: metaFade } = useOverflow()

  const toggle = (key, value) => {
    setPicked((prev) => {
      const cur = new Set(prev[key] || [])
      if (cur.has(value)) cur.delete(value)
      else cur.add(value)
      const next = { ...prev }
      if (cur.size) next[key] = cur
      else delete next[key]
      return next
    })
  }

  const clearAll = () => setPicked({})
  const activeCount = Object.values(picked).reduce((n, set) => n + set.size, 0)

  const items = useMemo(() => {
    let list = all.filter((p) =>
      Object.entries(picked).every(([key, set]) => {
        /* Brand matches on the same normalised key the facet merged on, or a
           tick on the merged label would only return the spelling it was
           labelled with. */
        if (key === 'brand') {
          return !!p.brand && [...set].some((v) => brandKey(v) === brandKey(p.brand))
        }
        return [...set].some((v) => p[key].includes(v))
      }),
    )
    if (order === 'name_az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (order === 'name_za') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [all, picked, order])

  const rail = (
    <div className={s.rail}>
      <div className={s.railHead}>
        <span>Filters</span>
        {activeCount > 0 && (
          <button type="button" className={s.clear} onClick={clearAll}>
            Clear ({activeCount})
          </button>
        )}
      </div>

      {GROUPS.map((g) => {
        const on = open === g.label
        const chosen = picked[g.key]
        const query = (find[g.label] || '').trim().toLowerCase()
        /* A ticked value stays listed whatever is typed, so searching can never
           hide a filter that is already narrowing the results. */
        const shown = query
          ? g.values.filter(([v]) => chosen?.has(v) || v.toLowerCase().includes(query))
          : g.values
        return (
          <div className={on ? s.group + ' ' + s.groupOn : s.group} key={g.label}>
            <button type="button" className={s.groupBtn} aria-expanded={on}
              onClick={() => setOpen(on ? null : g.label)}>
              {/* The count is what says the panel holds more than it shows,
                  before anyone has opened it. */}
              <span className={s.groupLabel}>
                {g.label}
                <em>{g.values.length}</em>
              </span>
              <Chevron className={s.chev} />
            </button>
            <div className={s.groupPanel}>
              {/* One grid child, or the 0fr→1fr collapse would only size the
                  first row and leave the rest of the panel permanently open. */}
              <div className={s.panelInner}>
                {g.values.length > FACET_SEARCH && (
                  <input
                    className={s.find}
                    type="search"
                    value={find[g.label] || ''}
                    placeholder="Search"
                    aria-label={`Search ${g.label.toLowerCase()} options`}
                    onChange={(e) =>
                      setFind((prev) => ({ ...prev, [g.label]: e.target.value }))
                    }
                  />
                )}
                <ul className={shown.length > FACET_ROWS ? s.listCapped : undefined}>
                  {shown.length === 0 && (
                    <li className={s.optNone}>No match for “{find[g.label]}”</li>
                  )}
                  {shown.map(([value, count]) => {
                    const checked = chosen?.has(value) || false
                    return (
                      <li key={value}>
                        <label className={checked ? s.optOn : undefined}>
                          <input type="checkbox" checked={checked}
                            onChange={() => toggle(g.key, value)} />
                          <span>{value}</span>
                          <em>{count}</em>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  /* A collection with nothing in it yet: there is nothing to filter or sort,
     so the rail and the controls are dropped and only the notice remains. */
  const bare = all.length === 0

  /* Once single-value facets are dropped a small range can be left with no
     group at all, and a rail that is nothing but the word "Filters" reads as a
     panel that failed to load. The count and the order-by stay either way. */
  const showRail = !bare && GROUPS.length > 0

  return (
    <section className={s.section}>
      <div className={'container ' + (showRail ? s.layout : s.layoutBare)}>
        {/* ---- filter rail ---- */}
        {showRail && <aside className={s.railWrap}>{rail}</aside>}

        {/* ---- results ---- */}
        <div className={s.results}>
          <div className={s.head}>
            <h2 className={s.title}>{heading}</h2>

            {!bare && (
            <div className={'overflowFade ' + s.metaFade} data-fade={metaFade}>
              <div ref={metaRef} className={s.meta}>
                <button type="button" className={s.filterBtn} onClick={() => setDrawer(true)}>
                  Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                </button>
                <span className={s.count}>
                  <strong>{items.length}</strong> Items
                </span>
                <label className={s.order}>
                  <span>Order by</span>
                  <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="name_az">Name A-Z</option>
                    <option value="name_za">Name Z-A</option>
                  </select>
                </label>
              </div>
            </div>
            )}
          </div>

          {bare ? (
            <p className={s.empty}>
              Sorry, there are no products in this collection yet.{' '}
              <Link href="/contact-us">Talk to our team</Link> — we can order this range in,
              or show you what is on the floor at Mitchell.
            </p>
          ) : items.length === 0 ? (
            <p className={s.empty}>
              Nothing matches those filters.{' '}
              <button type="button" onClick={clearAll}>Clear them</button> to see the full range.
            </p>
          ) : (
            <ul className={s.grid}>
              {items.map((p) => (
                <li key={p.handle} className={s.card}>
                  <Link href={`${basePath}/${p.handle}`} className={s.cardMain}>
                    <span className={'zoomFrame ' + s.frame}>
                      <img src={`${imgPath}/${p.handle}.jpg`} alt={p.name} loading="lazy" />
                    </span>

                    <span className={s.info}>
                      <span className={s.name}>{p.name}</span>
                      <span className={s.blurb}>{blurbOf(p)}</span>
                    </span>

                    {p.colours.length + p.finishes.length + p.sizes.length > 0 && (
                    <span className={s.stats}>
                      {p.colours.length > 0 && (
                        <span><em>{p.colours.length}</em>Colour</span>
                      )}
                      {p.finishes.length > 0 && (
                        <span><em>{p.finishes.length}</em>Finish</span>
                      )}
                      {p.sizes.length > 0 && (
                        <span><em>{p.sizes.length}</em>Size</span>
                      )}
                    </span>
                    )}
                  </Link>

                  <div className={s.actions}>
                    <Link href={`${basePath}/${p.handle}`} className={s.more}>View More +</Link>
                    {/* The card's own range, not the collection: enquiring from
                        here is a question about this range, and the showroom
                        should not have to ring back to find out which. */}
                    <EnquireLink range={p.name} subject="Product enquiry" className={s.enquire}>
                      Enquire Now
                    </EnquireLink>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* ---- filter drawer (small screens) ---- */}
      {showRail && (
        <>
          <div className={drawer ? s.scrim + ' ' + s.scrimOn : s.scrim}
            onClick={() => setDrawer(false)} aria-hidden="true" />
          <aside className={drawer ? s.drawer + ' ' + s.drawerOn : s.drawer} aria-hidden={!drawer}>
            {rail}
            <div className={s.drawerFoot}>
              <button type="button" onClick={clearAll}>Clear</button>
              <button type="button" className={s.apply} onClick={() => setDrawer(false)}>
                Show {items.length}
              </button>
            </div>
          </aside>
        </>
      )}
    </section>
  )
}
