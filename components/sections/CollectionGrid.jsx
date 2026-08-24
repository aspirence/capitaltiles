'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import s from './CollectionGrid.module.css'

/* Collection browser, to the Simpolo listing pattern: a filter rail on the
   left, and on the right a header row (title, item count, order-by) over a
   card grid. Each card shows the range name, a two-line blurb, its
   colour / finish / size counts, and View More / Enquire actions.

   Fully data-driven — every collection listing renders through this. */

/* Every distinct value across the range, most-used first. */
function facet(items, key) {
  const counts = new Map()
  items.forEach((p) => p[key].forEach((v) => counts.set(v, (counts.get(v) || 0) + 1)))
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

function brandFacet(items) {
  const counts = new Map()
  items.forEach((p) => p.brand && counts.set(p.brand, (counts.get(p.brand) || 0) + 1))
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
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
  const GROUPS = useMemo(
    () => [
      { key: 'brand', label: 'Brand', values: brandFacet(all) },
      { key: 'colours', label: 'Colour', values: facet(all, 'colours') },
      { key: 'finishes', label: 'Finish', values: facet(all, 'finishes') },
      { key: 'sizes', label: 'Size', values: facet(all, 'sizes') },
    ],
    [all],
  )

  const [open, setOpen] = useState('Colour')
  const [picked, setPicked] = useState({})   // { groupKey: Set(values) }
  const [order, setOrder] = useState('latest')
  const [drawer, setDrawer] = useState(false)

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
        const have = key === 'brand' ? [p.brand] : p[key]
        return [...set].some((v) => have.includes(v))
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
        return (
          <div className={on ? s.group + ' ' + s.groupOn : s.group} key={g.label}>
            <button type="button" className={s.groupBtn} aria-expanded={on}
              onClick={() => setOpen(on ? null : g.label)}>
              {g.label}
              <Chevron className={s.chev} />
            </button>
            <div className={s.groupPanel}>
              <ul>
                {/* Not every range publishes every facet. Say so rather than
                    opening onto nothing, which reads as a filter that is broken. */}
                {g.values.length === 0 && (
                  <li className={s.optNone}>Not listed for this range</li>
                )}
                {g.values.map(([value, count]) => {
                  const checked = picked[g.key]?.has(value) || false
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
        )
      })}
    </div>
  )

  /* A collection with nothing in it yet: there is nothing to filter or sort,
     so the rail and the controls are dropped and only the notice remains. */
  const bare = all.length === 0

  return (
    <section className={s.section}>
      <div className={'container ' + (bare ? s.layoutBare : s.layout)}>
        {/* ---- filter rail ---- */}
        {!bare && <aside className={s.railWrap}>{rail}</aside>}

        {/* ---- results ---- */}
        <div className={s.results}>
          <div className={s.head}>
            <h2 className={s.title}>{heading}</h2>

            {!bare && (
            <div className={s.meta}>
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
                      <span className={s.blurb}>{p.blurb}</span>
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
                    <Link href="/contact-us/enquiry" className={s.enquire}>Enquire Now</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---- filter drawer (small screens) ---- */}
      {!bare && (
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
