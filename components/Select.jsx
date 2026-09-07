'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import s from './Select.module.css'

/* A listbox, because a native <select> cannot be styled where it matters.

   You can style the closed control all you like; the moment it opens, the
   option list is drawn by the operating system — Windows' blue highlight, its
   own font, its own metrics — and on a page this deliberate that popup is the
   one piece that looks like an unstyled form. So the list is rendered as real
   elements.

   Doing that means taking on what the native control gave for free, which is
   the whole keyboard contract:
     - Enter / Space / Alt+Down open it, Escape closes and returns focus
     - Up / Down move through options while open, and change the value while
       closed, which is how a native select behaves
     - Home / End jump to the ends
     - typing letters jumps to the next option starting with them
     - clicking outside closes without changing anything
   Screen readers get the same information through role="listbox",
   aria-activedescendant and aria-selected.

   The list is portalled to <body> and positioned fixed rather than absolutely
   inside the control. It has to be: the collection page puts this control in a
   horizontally scrolling meta rail (`overflow-x: auto`), and a scroll container
   clips its descendants on both axes — so an absolutely positioned list showed
   its first row and had the rest cut off. No ancestor can clip a portalled
   node, and fixed coordinates are re-measured whenever anything scrolls or
   resizes, which the capture-phase listener below catches even when the thing
   scrolling is that inner rail rather than the window. */

export default function Select({ value, onChange, options, label, id, className = '' }) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value)),
  )
  const rootRef = useRef(null)
  const btnRef = useRef(null)
  const listRef = useRef(null)
  const [box, setBox] = useState(null)
  const [mounted, setMounted] = useState(false)
  const typed = useRef({ str: '', at: 0 })
  const auto = useId()
  const baseId = id || 'sel' + auto.replace(/:/g, '')

  const selected = options.find((o) => o.value === value) || options[0]

  /* createPortal needs a DOM target, which does not exist during the server
     render. */
  useEffect(() => setMounted(true), [])

  /* Measure before paint so the list never shows at the wrong coordinates. */
  const place = useCallback(() => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const below = window.innerHeight - r.bottom
    /* Flip above when the control sits near the bottom of the window and the
       list would otherwise run off it. */
    const flip = below < 200 && r.top > below
    setBox({
      left: r.left,
      width: r.width,
      top: flip ? undefined : r.bottom - 1,
      bottom: flip ? window.innerHeight - r.top - 1 : undefined,
      max: Math.max(120, (flip ? r.top : below) - 16),
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) return undefined
    place()
    /* Capture phase: the control can sit inside a scrolling rail, and a scroll
       on that rail does not bubble to the window. */
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  const close = useCallback((refocus) => {
    setOpen(false)
    if (refocus && btnRef.current) btnRef.current.focus()
  }, [])

  const pick = useCallback(
    (i) => {
      const opt = options[i]
      if (!opt) return
      onChange(opt.value)
      close(true)
    },
    [options, onChange, close],
  )

  /* Clicking or tabbing away closes without committing anything.

     "Away" has to mean outside the control AND outside the list. Now that the
     list is portalled it is no longer a descendant of the control, so a check
     against the control alone counted a click on an option as a click away:
     the list unmounted on mousedown and the click never reached the option. */
  useEffect(() => {
    if (!open) return undefined
    const outside = (node) =>
      !(rootRef.current && rootRef.current.contains(node)) &&
      !(listRef.current && listRef.current.contains(node))
    const onDown = (e) => {
      if (outside(e.target)) setOpen(false)
    }
    const onFocus = (e) => {
      if (outside(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('focusin', onFocus)
    }
  }, [open])

  /* Keep the highlighted option in view when the list is longer than its box. */
  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.children[cursor]
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' })
  }, [open, cursor])

  const openAt = () => {
    setCursor(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }

  const typeAhead = (key) => {
    const now = Date.now()
    const t = typed.current
    t.str = now - t.at > 700 ? key : t.str + key
    t.at = now
    const from = open ? cursor : options.findIndex((o) => o.value === value)
    for (let n = 1; n <= options.length; n++) {
      const i = (from + n) % options.length
      if (options[i].label.toLowerCase().startsWith(t.str.toLowerCase())) {
        if (open) setCursor(i)
        else onChange(options[i].value)
        return
      }
    }
  }

  const onKeyDown = (e) => {
    const { key, altKey } = e
    if (!open) {
      if (key === 'Enter' || key === ' ' || (key === 'ArrowDown' && altKey)) {
        e.preventDefault()
        openAt()
        return
      }
      /* Closed arrows step the value, the way a native select does. */
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault()
        const i = options.findIndex((o) => o.value === value)
        const next = key === 'ArrowDown'
          ? Math.min(options.length - 1, i + 1)
          : Math.max(0, i - 1)
        onChange(options[next].value)
        return
      }
      if (key.length === 1 && /\S/.test(key)) typeAhead(key)
      return
    }

    if (key === 'Escape' || (key === 'ArrowUp' && altKey)) {
      e.preventDefault()
      close(true)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(options.length - 1, c + 1))
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
    } else if (key === 'Home') {
      e.preventDefault()
      setCursor(0)
    } else if (key === 'End') {
      e.preventDefault()
      setCursor(options.length - 1)
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      pick(cursor)
    } else if (key === 'Tab') {
      setOpen(false)
    } else if (key.length === 1 && /\S/.test(key)) {
      typeAhead(key)
    }
  }

  return (
    <div ref={rootRef} className={s.root + (className ? ' ' + className : '')}>
      <button
        ref={btnRef}
        type="button"
        id={baseId}
        className={open ? s.control + ' ' + s.controlOn : s.control}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? baseId + '-label ' + baseId : undefined}
        onClick={() => (open ? setOpen(false) : openAt())}
        onKeyDown={onKeyDown}
      >
        <span className={s.value}>{selected?.label}</span>
        <svg className={s.chev} viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && mounted && box && createPortal(
        <ul
          ref={listRef}
          className={s.list}
          role="listbox"
          tabIndex={-1}
          style={{
            left: box.left,
            width: box.width,
            top: box.top,
            bottom: box.bottom,
            maxHeight: box.max,
          }}
          aria-labelledby={label ? baseId + '-label' : undefined}
          aria-activedescendant={baseId + '-opt-' + cursor}
          onKeyDown={onKeyDown}
        >
          {options.map((o, i) => {
            const isSel = o.value === value
            return (
              <li
                key={o.value}
                id={baseId + '-opt-' + i}
                role="option"
                aria-selected={isSel}
                className={
                  s.option +
                  (i === cursor ? ' ' + s.optionCursor : '') +
                  (isSel ? ' ' + s.optionOn : '')
                }
                onMouseEnter={() => setCursor(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(i)}
              >
                <span>{o.label}</span>
                {isSel && (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>,
        document.body,
      )}
    </div>
  )
}
