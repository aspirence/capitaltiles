'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import s from './SearchBox.module.css'

/* Type in the bar, the matches drop down underneath, click one and it opens
   that page. Whole collections come first — "tiles" or "bathroom" usually means
   the collection, not one range inside it — then the individual ranges. */

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

export default function SearchBox({ className = '', placeholder = 'Search tiles, collections…', onNavigate }) {
  const [q, setQ] = useState('')
  const [pages, setPages] = useState([])
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const box = useRef(null)
  const router = useRouter()

  /* One flat list behind the two groups, so the arrow keys run straight
     through collections into ranges. */
  const rows = [
    ...pages.map((p) => ({ href: p.href, img: p.img, title: p.label, meta: p.section ? `${p.section} collection` : 'Collection' })),
    ...products.map((p) => ({ href: p.href, img: p.img, title: p.name, meta: `${p.collection}${p.brand ? ` · ${p.brand}` : ''}` })),
  ]

  /* Wait for a pause in typing rather than firing on every keystroke, and drop
     any answer that comes back after a newer one. */
  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) { setPages([]); setProducts([]); return }
    let live = true
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`)
        .then((r) => (r.ok ? r.json() : { pages: [], products: [] }))
        .then((d) => {
          if (!live) return
          setPages(d.pages || [])
          setProducts(d.products || [])
          setCursor(-1)
        })
        .catch(() => {})
    }, 150)
    return () => { live = false; clearTimeout(timer) }
  }, [q])

  /* Clicking anywhere else puts the panel away. */
  useEffect(() => {
    const away = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [])

  const go = (href) => {
    setOpen(false)
    setQ('')
    onNavigate?.()
    router.push(href)
  }

  const onKeyDown = (e) => {
    if (!rows.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setCursor((c) => (c + 1) % rows.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => (c <= 0 ? rows.length - 1 : c - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); go(rows[cursor >= 0 ? cursor : 0].href) }
    else if (e.key === 'Escape') { setOpen(false) }
  }

  const Row = ({ row, i }) => (
    <li key={row.href}>
      <button
        type="button"
        className={i === cursor ? s.row + ' ' + s.rowOn : s.row}
        onMouseEnter={() => setCursor(i)}
        onClick={() => go(row.href)}
      >
        <span className={s.thumb}>{row.img ? <img src={row.img} alt="" loading="lazy" /> : null}</span>
        <span className={s.text}>
          <span className={s.name}>{row.title}</span>
          <span className={s.meta}>{row.meta}</span>
        </span>
      </button>
    </li>
  )

  const show = open && q.trim().length >= 2

  return (
    <div ref={box} className={s.wrap + (className ? ' ' + className : '')}>
      <div className={s.field}>
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search the range"
          autoComplete="off"
        />
        <span className={s.icon} aria-hidden="true"><IconSearch /></span>
      </div>

      {show && (
        <div className={s.panel}>
          {rows.length === 0 ? (
            <p className={s.none}>Nothing matches “{q.trim()}”.</p>
          ) : (
            <>
              {pages.length > 0 && (
                <>
                  <p className={s.groupTitle}>Collections</p>
                  <ul>{pages.map((p, i) => <Row key={p.href} row={rows[i]} i={i} />)}</ul>
                </>
              )}
              {products.length > 0 && (
                <>
                  <p className={s.groupTitle}>Ranges</p>
                  <ul>
                    {products.map((p, i) => <Row key={p.href} row={rows[pages.length + i]} i={pages.length + i} />)}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
