'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import s from './ProductDetail.module.css'

/* Single product page: gallery + key facts, the spec strip, long-form copy,
   the full size/finish table and a related rail. Every block renders only when
   the range actually publishes that data — half of our ranges ship without a
   spec grid or a slip rating, and an empty panel reads as a broken page. */

function Icon({ d, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  )
}

const ARROW = <path d="M5 12h14M13 6l6 6-6 6" />

/* The variant feed publishes raw option values — "Tranquility - Ashen Mist",
   "600 x 600", "AC5 Surface Finish" — while the chips show the tidied name.
   Compare on letters and digits alone, and treat the range-name prefix the feed
   sometimes carries as optional, so the two sides still line up. */
const norm = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9]/g, '')

function sameOption(a, b) {
  const x = norm(a)
  const y = norm(b)
  if (!x || !y) return false
  return x === y || x.endsWith(y) || y.endsWith(x)
}

/* Map a raw variant value back onto the label we actually display. */
function matchOption(value, list = []) {
  return list.find((item) => sameOption(value, item)) || value
}

function Facts({ items }) {
  if (!items.length) return null
  return (
    <dl className={s.facts}>
      {items.map((f) => (
        <div key={f.label} className={s.fact}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function ProductDetail({ product, collection, related = [] }) {
  const {
    name, brand, tagline, short, overview = [],
    images = [], colours = [], sizes = [], finishes = [],
    thickness = [], slip = [], material = [],
    specCols = [], specRows = [], rooms = [],
    liveGallery = false,
  } = product
  const isHybrid = product.productType === 'hybrid'
  const isLaminate = product.productType === 'laminate'
  const isFlooring = isHybrid || isLaminate

  /* A collection can name its own parent crumb; the hybrid and laminate ranges
     predate that prop and still infer it from the product type. */
  const parentCrumb = collection.parent ||
    (isFlooring ? { label: 'Flooring', href: '/flooring' } : { label: 'Tiles', href: '/tiles' })

  /* A carpet's only "size" is its roll width, and a board's is its profile.
     The collection can say so; tiles keep the plain label. */
  const sizeLabel = collection.sizeLabel || (isFlooring ? 'Profile' : 'Size')

  const [active, setActive] = useState(0)
  const [galleryImages, setGalleryImages] = useState(images)
  const [selectedColour, setSelectedColour] = useState(colours[0] || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [selectedFinish, setSelectedFinish] = useState(finishes[0] || '')
  const [variants, setVariants] = useState([])
  const shot = galleryImages[active] || galleryImages[0]
  /* The editorial band wants a different frame from the one the gallery is
     currently showing; fall back to the hero shot when there is only one. */
  const aboutShot = galleryImages.find((img) => img !== shot) || shot

  useEffect(() => {
    let current = true
    fetch(`/api/product-variants/${product.handle}`)
      .then((response) => response.ok ? response.json() : { variants: [] })
      .then((data) => {
        if (!current || !data.variants?.length) return
        const nextImages = liveGallery && data.images?.length ? data.images : galleryImages
        if (liveGallery && data.images?.length) setGalleryImages(data.images)
        setVariants(data.variants)
        const first = data.variants.find((variant) => variant.available) || data.variants[0]
        // Show the tidied label, not the raw feed value.
        setSelectedColour(first.colour ? matchOption(first.colour, colours) : (colours[0] || ''))
        setSelectedSize(first.size ? matchOption(first.size, sizes) : (sizes[0] || ''))
        setSelectedFinish(first.finish ? matchOption(first.finish, finishes) : (finishes[0] || ''))
        if (first.imagePosition && nextImages[first.imagePosition - 1]) setActive(first.imagePosition - 1)
      })
      .catch(() => {})
    return () => { current = false }
  }, [product.handle])

  const setFor = { colour: setSelectedColour, size: setSelectedSize, finish: setSelectedFinish }

  const chooseOption = (key, value) => {
    // The chip always wins: whatever the variant feed does or does not know
    // about, clicking an option must select it. Anything else reads as a dead
    // control, which is what these were doing on the flooring ranges.
    setFor[key](value)

    if (!variants.length) return

    const wanted = { colour: selectedColour, size: selectedSize, finish: selectedFinish, [key]: value }
    const fits = (variant, field) => !wanted[field] || sameOption(variant[field], wanted[field])
    const exact = variants.find((v) => v.available &&
      fits(v, 'colour') && fits(v, 'size') && fits(v, 'finish'))
    const compatible = exact || variants.find((v) => v.available && sameOption(v[key], value))
    if (!compatible) return

    // Keep showing the tidy chip label rather than the raw variant string
    // ("Tranquility - Ashen Mist"), but follow the variant for the other axes.
    for (const field of ['colour', 'size', 'finish']) {
      if (field === key || !compatible[field]) continue
      const list = field === 'colour' ? colours : field === 'size' ? sizes : finishes
      setFor[field](matchOption(compatible[field], list))
    }

    let pictured = compatible
    if (!pictured.imagePosition) {
      pictured = variants.find((v) => v.available &&
        sameOption(v.colour, compatible.colour) && v.imagePosition) || compatible
    }
    if (pictured.imagePosition && galleryImages[pictured.imagePosition - 1]) setActive(pictured.imagePosition - 1)
  }

  const normaliseSize = (value) => value.toLowerCase().replace(/\s|mm|×/g, '').replace(/x/g, 'x')
  const selectedSpecRows = useMemo(() => {
    if (!specRows.length) return []
    const sizeColumn = specCols.findIndex((column) => /size/i.test(column))
    const finishColumn = specCols.findIndex((column) => /finish/i.test(column))
    const matches = specRows.filter((row) => {
      const sizeMatches = sizeColumn < 0 || !selectedSize || normaliseSize(row[sizeColumn] || '') === normaliseSize(selectedSize)
      const finishCell = finishColumn < 0 ? '' : String(row[finishColumn] || '').toLowerCase()
      const finishMatches = finishColumn < 0 || !selectedFinish || finishCell.includes(selectedFinish.toLowerCase())
      return sizeMatches && finishMatches
    })
    return matches.length ? matches : specRows
  }, [selectedSize, selectedFinish, specCols, specRows])

  const isPlaceholder = (value) => typeof value === 'string' && value.startsWith('Placeholder')
  const displayTagline = !isPlaceholder(tagline)
    ? tagline
    : isHybrid
      ? 'Waterproof performance with the warmth and character of timber.'
      : isLaminate
        ? 'Timber character with a durable, easy-care surface for everyday living.'
        : `A considered tile range for practical, beautifully finished spaces.`
  const displayShort = !isPlaceholder(short)
    ? short
    : isHybrid
      ? `${name} combines a stable rigid core with an easy-care surface designed for busy Australian homes. ${colours.length ? `Choose from ${colours.length} timber-inspired colour${colours.length === 1 ? '' : 's'}` : 'View the surface and tone in person'}, then compare the board under natural light in our Mitchell showroom.`
      : isLaminate
        ? `${name} offers the look and texture of timber with a hard-wearing surface suited to active interiors. Compare the grain, tone and finish on a full board in our Mitchell showroom before choosing for your space.`
        : `${name} brings together ${finishes.length ? finishes.join(' and ').toLowerCase() + ' finishes' : 'a versatile surface'}${colours.length ? ` in ${colours.length} carefully selected colour${colours.length === 1 ? '' : 's'}` : ''}. Explore the available formats below, then view the full tile in our Mitchell showroom before making your final selection.`
  const displayOverview = overview.filter((p) => !isPlaceholder(p))
  const aboutCopy = displayOverview.length ? displayOverview : isHybrid ? [
    `${name} is made for homes that need the visual warmth of timber with simpler day-to-day care. Its rigid hybrid construction provides a stable foundation underfoot and helps the floor cope with the spills, traffic and temperature changes that come with everyday living.`,
    `Every timber-look floor responds differently to room size, daylight and surrounding finishes. Compare the available boards in person, view several planks together for natural variation, and let our team confirm installation requirements, transitions and subfloor preparation for your project.`,
  ] : isLaminate ? [
    `${name} is a practical timber-look floor for rooms that see regular foot traffic. A detailed decorative surface creates natural grain character, while the protective wear layer makes routine cleaning and maintenance straightforward.`,
    `Colour and plank variation can look different across a full room than on a small sample. View several boards together in natural light, then let our team check the subfloor, transitions and installation direction before quantities are confirmed.`,
  ] : [
    `${name} is designed to give bathrooms a composed, lasting finish while remaining straightforward to coordinate with tapware, cabinetry and adjoining surfaces. ${material.length ? `Made in ${material.join(' and ').toLowerCase()}, the range balances visual character with dependable everyday performance.` : 'Its versatile surface makes it a confident starting point for both renovations and new builds.'}`,
    `Choose from ${sizes.length ? sizes.join(', ') : 'the formats available through our showroom'}${finishes.length ? `, with ${finishes.join(' and ')} finish options` : ''}. Because tone, pattern and texture can change under different lighting, we recommend comparing full-size samples in person and confirming the right specification for your wall, floor or wet-area application with our team.`,
  ]
  /* What the band actually prints. Two paragraphs at most — the section was
     running to three and standing taller than anything else on the page.

     Counted across the 417 ranges that publish an overview: 88 second
     paragraphs are a formats-and-finishes recital, which the spec table below
     already sets out properly, and 232 of 299 third paragraphs are the same
     invitation the link at the foot of the band makes. Both are dropped. The
     rest of the second paragraphs are not filler at all — Australian Made,
     Godfrey Hirst, where the wool comes from — so they stay. A blanket "keep
     only the first" would have cost nearly three hundred ranges their one
     distinguishing line. */
  const isSpecRecital = (para) =>
    /published for this range|^Formats published/.test(para)
  const isShowroomPitch = (para) => /showroom/i.test(para)

  const bandCopy = (() => {
    const kept = aboutCopy.filter(
      (para, i) => i === 0 || (!isSpecRecital(para) && !isShowroomPitch(para)),
    )
    /* A range whose only paragraph is a recital still needs something to say. */
    return (kept.length ? kept : aboutCopy).slice(0, 2)
  })()

  /* The strip only earns its space when there is something in it. */
  const strip = [
    { label: isFlooring ? 'Profile' : 'Sizes', value: sizes, note: 'mm' },
    { label: 'Finishes', value: finishes },
    { label: 'Colours', value: colours },
    { label: 'Thickness', value: thickness },
    { label: 'Slip rating', value: slip },
  ].filter((x) => x.value.length)

  const heroFacts = [
    { label: 'Brand', value: brand },
    rooms.length && { label: 'Suitable for', value: rooms.map((r) => r.label).join(', ') },
    colours.length && { label: 'Colours', value: colours.join(', ') },
    material.length && { label: 'Material', value: material.join(', ') },
  ].filter(Boolean)

  /* The enquire bar rides in once the hero's own Enquire button has scrolled
     off, so the page never shows the same ask twice at once. It replaced a
     full closing CTA section that only a reader who made it to the bottom ever
     saw. */
  const actionsRef = useRef(null)
  const barRef = useRef(null)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const el = actionsRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        /* Only once it has gone off the TOP. Before you reach it the button is
           simply below the fold, and a bar offering the same thing then would
           be arguing with itself. */
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* The bar is a centred card, so on a wide screen the floating rail clears it
     on its own and should stay put. On a narrow one the card grows to nearly
     the full width and the two collide. Rather than guess a breakpoint, measure
     both and lift the rail only when their horizontal ranges actually overlap.
     The lift is the card's real distance from the bottom of the viewport, so it
     holds whatever the card's height or offset turns out to be. */
  useEffect(() => {
    document.body.dataset.enquireBar = showBar ? 'on' : 'off'

    const sync = () => {
      const bar = barRef.current
      const rail = document.querySelector('[data-floating-rail]')
      if (!showBar || !bar || !rail) {
        document.body.style.removeProperty('--rail-lift')
        return
      }
      const b = bar.getBoundingClientRect()
      const r = rail.getBoundingClientRect()
      /* Horizontal only: translateX(-50%) is part of the resting transform, so
         left/right are already right, but the card is mid-slide when this
         first runs and its top is still below the fold. Height and the CSS
         bottom offset are both immune to the transform, so the lift is
         measured from those rather than from a rect that is still moving. */
      const overlaps = r.right > b.left && r.left < b.right
      if (overlaps) {
        const bottom = parseFloat(getComputedStyle(bar).bottom) || 0
        document.body.style.setProperty('--rail-lift', Math.round(bar.offsetHeight + bottom + 12) + 'px')
      } else {
        document.body.style.removeProperty('--rail-lift')
      }
    }

    sync()
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('resize', sync)
      delete document.body.dataset.enquireBar
      document.body.style.removeProperty('--rail-lift')
    }
  }, [showBar])

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className={s.hero}>
        <div className="container">
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i>/</i>
            <Link href={parentCrumb.href}>{parentCrumb.label}</Link>
            <i>/</i>
            <Link href={collection.href}>{collection.label}</Link>
            <i>/</i>
            <span>{name}</span>
          </nav>

          <div className={s.heroGrid}>
            {/* gallery */}
            <div className={s.gallery}>
              <div className={s.stage}>
                {shot ? (
                  <img
                    src={shot}
                    alt={`${name} ${isFlooring ? 'flooring' : 'tiles'}`}
                    width="1400"
                    height="1050"
                  />
                ) : (
                  <span className={s.noShot}>Images available in our Mitchell showroom</span>
                )}
              </div>

              {galleryImages.length > 1 && (
                <ul className={s.thumbs}>
                  {galleryImages.map((src, i) => (
                    <li key={src}>
                      <button
                        type="button"
                        className={i === active ? s.thumb + ' ' + s.thumbOn : s.thumb}
                        onClick={() => setActive(i)}
                        aria-label={`View image ${i + 1} of ${galleryImages.length}`}
                        aria-current={i === active}
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className={isFlooring ? s.flooringThumb : undefined}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* key facts */}
            <div className={s.intro}>
              <p className={s.eyebrow}>{brand}</p>
              <h1 className={s.title}>{name}</h1>
              {displayTagline && <p className={s.tagline}>{displayTagline}</p>}
              {displayShort && <p className={s.short}>{displayShort}</p>}

              <div className={s.choices} aria-label="Product options">
                {colours.length > 0 ? (
                  <fieldset className={s.choiceGroup}>
                    <legend>Colour: <strong>{selectedColour}</strong></legend>
                    <div className={s.optionList}>
                      {colours.map((colour) => (
                        <button key={colour} type="button"
                          className={selectedColour === colour ? `${s.option} ${s.optionOn}` : s.option}
                          onClick={() => chooseOption('colour', colour)} aria-pressed={selectedColour === colour}>
                          <span className={s.colourDot} aria-hidden="true" />{colour}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : <p className={s.optionNote}><span>Colour</span> Ask our showroom team about available colour options.</p>}

                {sizes.length > 0 ? (
                  <fieldset className={s.choiceGroup}>
                    <legend>{sizeLabel}: <strong>{selectedSize}</strong></legend>
                    <div className={s.optionList}>
                      {sizes.map((size) => (
                        <button key={size} type="button"
                          className={selectedSize === size ? `${s.option} ${s.optionOn}` : s.option}
                          onClick={() => chooseOption('size', size)} aria-pressed={selectedSize === size}>{size}</button>
                      ))}
                    </div>
                  </fieldset>
                ) : <p className={s.optionNote}><span>Size</span> Ask our showroom team about available formats.</p>}

                {finishes.length > 1 && (
                  <fieldset className={s.choiceGroup}>
                    <legend>Finish: <strong>{selectedFinish}</strong></legend>
                    <div className={s.optionList}>
                      {finishes.map((finish) => (
                        <button key={finish} type="button"
                          className={selectedFinish === finish ? `${s.option} ${s.optionOn}` : s.option}
                          onClick={() => chooseOption('finish', finish)} aria-pressed={selectedFinish === finish}>{finish}</button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>

              <Facts items={heroFacts} />

              <div className={s.actions} ref={actionsRef}>
                <Link href="/contact-us/enquiry" className="cta">
                  <span>Enquire now</span>
                  <Icon d={ARROW} size={16} />
                </Link>
                <Link href="/contact-us" className={'linkUnder ' + s.measure}>
                  Book a free measure
                </Link>
              </div>

              <p className={s.showroom}>
                On display at 3 Pelle Street, Mitchell. Call{' '}
                <a href="tel:0262538158">02 6253 8158</a> to check current stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- spec strip ---------- */}
      {strip.length > 0 && (
        <section className={s.strip}>
          <div className="container">
            <ul className={s.stripList}>
              {strip.map((x) => (
                <li key={x.label}>
                  <span className={s.stripLabel}>{x.label}</span>
                  <span className={s.stripValue}>{x.value.join(' · ')}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- the range, as an editorial band ----------

          This used to be prose on the left and an "At a glance" checklist on
          the right, and the two said the same thing in two shapes: the copy
          read "It runs in beige, Beige Fluted, Ivory Fluted and ivory" while
          the card listed "Colours: Beige, Beige Fluted, Ivory Fluted and
          Ivory". Both are drawn from the same published fields, and those
          fields already appear twice more on the page — in the spec strip
          above and the full table below. Four passes at the same numbers is
          why the section read as filler.

          So the checklist is gone and the section has been given the one job
          nothing else on the page does: showing what the range is like. A
          plate that bleeds off the edge, the name set large on a dark ground,
          the narrative copy, and the invitation to come and stand on it. The
          numbers stay where numbers belong. */}
      {bandCopy.length > 0 && (
        <section className={s.about} data-reveal-scope>
          {/* Copy first in the DOM as well as on screen; the plate takes
              order:-1 on a phone so the picture still leads there. */}
          <div className={s.aboutGrid}>
            <div className={s.aboutCopy}>
              <h2 className={s.aboutName} data-reveal>
                {name}
              </h2>

              {bandCopy[0] && (
                <p className={s.aboutLead} data-reveal style={{ '--reveal-delay': '90ms' }}>
                  {bandCopy[0]}
                </p>
              )}

              {bandCopy.slice(1).map((para, i) => (
                <p
                  key={i}
                  className={s.aboutBody}
                  data-reveal
                  style={{ '--reveal-delay': 150 + i * 60 + 'ms' }}
                >
                  {para}
                </p>
              ))}

              <Link
                href="/contact-us"
                className={s.aboutLink}
                data-reveal
                style={{ '--reveal-delay': '220ms' }}
              >
                See it in the Mitchell showroom
              </Link>
            </div>

            {/* The second frame where there is one, so the band is not the
                same picture the gallery is already showing. */}
            <div className={s.aboutPlate} data-reveal="scale">
              {aboutShot ? (
                <img src={aboutShot} alt={`${name} in place`} loading="lazy" />
              ) : (
                <span className={s.aboutNoShot}>In our Mitchell showroom</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- specification table ---------- */}
      {specRows.length > 0 && (
        <section className={'sectionPad ' + s.specs} data-reveal-scope>
          <div className="container">
            <div className={s.specHead} data-reveal>
              <p className="eyebrow">Sizes &amp; specification</p>
              <h2 className={'title ' + s.h2}>How {name} is supplied</h2>
              <p className={s.specLede}>
                Published by the manufacturer for this range. Bring the room measurements
                into the showroom and we will work out quantities with you.
              </p>
            </div>

            <div className={s.tableWrap} data-reveal>
              <table className={s.table}>
                <thead>
                  <tr>
                    {specCols.map((c) => (
                      <th key={c} scope="col">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedSpecRows.map((r, i) => (
                    <tr key={i}>
                      {r.map((cell, j) => (
                        <td key={j}>{cell || '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}


      {/* ---------- floating enquire bar ---------- */}
      <div ref={barRef} className={showBar ? s.bar + ' ' + s.barOn : s.bar}>
        <div className={'container ' + s.barInner}>
          {shot && (
            <span className={s.barThumb} aria-hidden="true">
              <img src={shot} alt="" />
            </span>
          )}
          <span className={s.barText}>
            <span className={s.barName}>{name}</span>
            <span className={s.barMeta}>
              {brand}
              {sizes.length > 0 && ' · ' + sizes[0] + 'mm'}
            </span>
          </span>
          <Link href="/contact-us/enquiry" className={s.barCta}>
            Enquire Now
          </Link>
        </div>
      </div>

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className={'sectionPad ' + s.related} data-reveal-scope>
          <div className="container">
            <div className={s.relatedHead}>
              <div>
                <p className="eyebrow">More from this range</p>
                <h2 className={'title ' + s.h2}>You may also like</h2>
              </div>
              <Link href={collection.href} className={'linkUnder ' + s.all}>
                All {collection.label}
              </Link>
            </div>

            <ul className={s.relatedGrid}>
              {related.map((r) => (
                <li key={r.handle} data-reveal>
                  <Link href={`${collection.href}/${r.handle}`} className={s.relCard}>
                    <span className={'zoomFrame ' + s.relFrame}>
                      <img src={r.img} alt={r.name} loading="lazy" />
                    </span>
                    <span className={s.relBody}>
                      <span className={s.relName}>{r.name}</span>
                      <span className={s.relMeta}>{r.brand}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
