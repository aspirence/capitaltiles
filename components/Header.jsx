'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CORPORATE, NAV } from './navData'
import s from './Header.module.css'

/* --- icons ---------------------------------------------------------------- */
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6" />
    </svg>
  )
}

function IconCaret({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="12" height="12" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function Wordmark({ className }) {
  return (
    <span className={className ? s.mark + ' ' + className : s.mark}>
      <img src="/logo.webp" alt="Capital Tiles &amp; Flooring" width="480" height="150" />
    </span>
  )
}

export default function Header() {
  /* `solid` flips the transparent-over-hero treatment to the white bar. */
  const [solid, setSolid] = useState(false)
  /* Pages without a full-bleed dark hero need the solid bar from the top,
     otherwise white nav text lands on a light section. */
  const [hasHero, setHasHero] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [openNav, setOpenNav] = useState(null) // desktop mega panel
  const [tabIndex, setTabIndex] = useState({}) // active tab per mega panel
  const [drawer, setDrawer] = useState(false) // mobile drawer
  const [mobileOpen, setMobileOpen] = useState(null)

  const pathname = usePathname()
  const lastY = useRef(0)
  const closeTimer = useRef(null)

  /* Scroll state: go solid past the fold, and tuck the bar away while
     scrolling down so it reappears the moment the user heads back up. */
  useEffect(() => {
    setHasHero(!!document.querySelector('[data-hero]'))
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 60)
      setHidden(y > 420 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock the page behind the mobile drawer. */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpenNav(null)
      setDrawer(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* A short grace period on mouseleave lets the pointer cross the gap between
     a trigger and its panel without the panel snapping shut. */
  const openPanel = (label) => {
    clearTimeout(closeTimer.current)
    setOpenNav(label)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenNav(null), 160)
  }

  const headerClass = [
    s.header,
    solid || !hasHero ? s.solid : '',
    hidden && !openNav ? s.hidden : '',
    openNav ? s.panelOpen : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerClass}>
        {/* ---------- utility strip ---------- */}
        <div className={s.utility}>
          <div className={'container ' + s.utilityInner}>
            <div className={s.utilityLeft}>
              <div className={s.corporate}>
                <button type="button" className={s.corporateBtn}>
                  Corporate <IconCaret className={s.corporateCaret} />
                </button>
                <ul className={s.corporateMenu}>
                  {CORPORATE.map((c) => (
                    <li key={c.label}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/" className={s.logo} aria-label="Capital Tiles — home">
              <Wordmark />
            </Link>

            <div className={s.utilityRight}>
              <div className={s.search}>
                <input type="search" placeholder="Search tiles, collections…" aria-label="Search" />
                <button type="button" aria-label="Search">
                  <IconSearch />
                </button>
              </div>
              <span className={s.divider} aria-hidden="true" />
              <Link href="/where-to-buy" className={s.whereToBuy}>
                <IconPin /> Where to Buy
              </Link>
              <span className={s.divider} aria-hidden="true" />
              <Link href="/contact-us/enquiry" className={s.enquire}>
                Enquire
              </Link>

              <button
                type="button"
                className={s.burger}
                aria-label="Open menu"
                aria-expanded={drawer}
                onClick={() => setDrawer(true)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- main bar + mega panels ---------- */}
        <nav className={s.nav} aria-label="Primary">
          <div className={'container ' + s.navInner}>
            <ul className={s.navList}>
              {NAV.map((item) => {
                const active = openNav === item.label
                const tab = tabIndex[item.label] ?? 0
                /* Plain link menus drop a compact panel under their own item;
                   the card menus stay full-bleed across the bar. */
                const compact = item.type === 'list'
                const cls = [s.navItem, compact ? s.navItemCompact : '', active ? s.navItemOpen : '']
                  .filter(Boolean)
                  .join(' ')
                return (
                  <li
                    key={item.label}
                    className={cls}
                    onMouseEnter={() => openPanel(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <Link href={item.href} className={s.navLink}>
                      {item.label}
                      <span className={s.navPointer} aria-hidden="true" />
                    </Link>

                    <div
                      className={s.mega}
                      onMouseEnter={() => openPanel(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className={s.megaInner}>
                        {item.type === 'tabbed' && (
                          <>
                            <ul className={s.megaRail}>
                              {item.tabs.map((t, i) => (
                                <li key={t.label}>
                                  <button
                                    type="button"
                                    className={i === tab ? s.railOn : undefined}
                                    onMouseEnter={() =>
                                      setTabIndex((p) => ({ ...p, [item.label]: i }))
                                    }
                                    onFocus={() => setTabIndex((p) => ({ ...p, [item.label]: i }))}
                                  >
                                    {t.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                            <ul className={s.megaGrid}>
                              {item.tabs[tab].items.map((l, i) => (
                                <li key={l.label} style={{ '--i': i }}>
                                  <Link href={l.href}>
                                    <span className={'zoomFrame ' + s.megaThumb}>
                                      <img src={l.img} alt="" loading="lazy" />
                                    </span>
                                    <span className={s.megaLabel}>{l.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {item.type === 'grid' && (
                          <ul className={s.megaGrid + ' ' + s.megaGridFull}>
                            {item.items.map((l, i) => (
                              <li key={l.label} style={{ '--i': i }}>
                                <Link href={l.href}>
                                  <span className={'zoomFrame ' + s.megaThumb}>
                                    <img src={l.img} alt="" loading="lazy" />
                                  </span>
                                  <span className={s.megaLabel}>{l.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.type === 'list' && (
                          <ul className={s.megaList}>
                            {item.items.map((l, i) => (
                              <li key={l.label} style={{ '--i': i }}>
                                <Link href={l.href}>{l.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* ---------- mobile drawer ---------- */}
      <div
        className={drawer ? s.scrim + ' ' + s.scrimOn : s.scrim}
        onClick={() => setDrawer(false)}
        aria-hidden="true"
      />
      <aside className={drawer ? s.drawer + ' ' + s.drawerOn : s.drawer} aria-hidden={!drawer}>
        <div className={s.drawerTop}>
          <Wordmark className={s.markLight} />
          <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className={s.drawerNav} aria-label="Mobile">
          {NAV.map((item) => {
            const open = mobileOpen === item.label
            const links = item.type === 'tabbed' ? item.tabs.flatMap((t) => t.items) : item.items
            return (
              <div key={item.label} className={open ? s.acc + ' ' + s.accOpen : s.acc}>
                <button
                  type="button"
                  onClick={() => setMobileOpen(open ? null : item.label)}
                  aria-expanded={open}
                >
                  {item.label}
                  <IconCaret className={s.accCaret} />
                </button>
                {/* The 0fr→1fr collapse only sizes the first grid row, so the
                    list must be the panel's single child. */}
                <div className={s.accPanel}>
                  <ul>
                    {links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} onClick={() => setDrawer(false)}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}

          <div className={s.drawerCorporate}>
            <p>Corporate</p>
            <ul>
              {CORPORATE.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} onClick={() => setDrawer(false)}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/where-to-buy"
            className={'cta ctaLight ' + s.drawerCta}
            onClick={() => setDrawer(false)}
          >
            <span>Where to Buy</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
