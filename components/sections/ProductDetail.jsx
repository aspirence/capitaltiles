'use client'

import { useEffect, useMemo, useState } from 'react'
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
const CHECK = <path d="M20 6L9 17l-5-5" />

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
    name, brand, tagline, short, overview = [], features = [],
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
  const publishedFeatures = features.filter((f) => !isPlaceholder(f))
  const displayFeatures = publishedFeatures.length ? publishedFeatures : isHybrid ? [
    'Waterproof rigid-core construction for everyday spills',
    colours.length ? `${colours.length} timber-inspired colour option${colours.length === 1 ? '' : 's'}` : 'Natural timber-look surface with easy-care performance',
    sizes.length ? `Published profile: ${sizes.join(', ')}` : 'Comfortable, stable flooring for busy interiors',
    'Suitable for connected living, kitchen and bedroom spaces',
    'Professional measure, subfloor assessment and installation available',
  ] : isLaminate ? [
    'Durable wear surface made for everyday residential traffic',
    colours.length ? `${colours.length} published colour option${colours.length === 1 ? '' : 's'}` : 'Timber-look tone and grain designed for easy coordination',
    'Simple routine care with no sanding or refinishing required',
    'Suitable for living areas, bedrooms, hallways and home offices',
    'Professional measure, subfloor assessment and installation available',
  ] : [
    colours.length ? `${colours.length} colour option${colours.length === 1 ? '' : 's'}: ${colours.join(', ')}` : 'Colour availability can be confirmed in the showroom',
    sizes.length ? `${sizes.length} format${sizes.length === 1 ? '' : 's'} for flexible layouts` : 'Format and availability confirmed to suit your project',
    finishes.length ? `Available in ${finishes.join(', ')}` : 'Finish samples available to view in person',
    slip.length ? `Published slip rating: ${slip.join(', ')}` : 'Our team can confirm suitability for your intended area',
    'Suitable for residential renovations and new-build selections',
  ]

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
                    className={
                      isFlooring
                        ? s.flooringShot
                        : product.handle === 'vienna'
                        ? s.topAlignedShot
                        : product.handle === 'caesarstone' && active >= 8
                          ? s.productShot
                          : undefined
                    }
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

              <div className={s.actions}>
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

      {/* ---------- overview + features ---------- */}
      {(aboutCopy.length > 0 || displayFeatures.length > 0) && (
        <section className={'sectionPad ' + s.about} data-reveal-scope>
          <div className="container">
            <div className={s.aboutGrid}>
              {aboutCopy.length > 0 && (
                <div className={s.copy} data-reveal>
                  <p className="eyebrow">About this range</p>
                  <h2 className={'title ' + s.h2}>{name}</h2>
                  {aboutCopy.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {displayFeatures.length > 0 && (
                <div className={s.featureCard} data-reveal="right">
                  <h3 className={s.featureTitle}>At a glance</h3>
                  <ul className={s.features}>
                    {displayFeatures.map((f, i) => (
                      <li key={i}>
                        <Icon d={CHECK} size={15} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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

      {/* ---------- closing cta ---------- */}
      <section className={'sectionPad ' + s.cta}>
        <div className="container">
          <div className={s.ctaInner}>
            <h2 className={'title ' + s.ctaTitle}>See {name} before you commit</h2>
            <p className={s.ctaLede}>
              {isFlooring
                ? 'Full boards are on display in Mitchell, so you can compare colour, grain and texture in natural light. Choose supply only, or ask our team to measure, prepare the subfloor and install the complete floor.'
                : 'Full tiles are on display in Mitchell, so you can carry one to the doorway and check the colour in daylight. Supply only, or let our own installers take care of removal, preparation, laying and grouting.'}
            </p>
            <div className={s.ctaRow}>
              <Link href="/contact-us/enquiry" className="cta">
                <span>Enquire about this range</span>
              </Link>
              <a href="tel:0262538158" className={s.phone}>02 6253 8158</a>
            </div>
          </div>
        </div>
      </section>

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
