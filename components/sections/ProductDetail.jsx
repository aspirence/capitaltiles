'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import EnquireLink from '@/components/EnquireLink'
import { useOverflow } from '@/components/useOverflow'
import EnquireBar from './EnquireBar'
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

/* The chip's dot was a 35% tint of the chip's own text colour, so bianco, taupe
   and beige were three identical greys — the one control shaped like a colour
   carried no colour at all, on a range whose whole decision is the tone. These
   are the tone words our ranges actually publish; the hexes are indicative, not
   the manufacturer's, which is why the showroom line under the chips still asks
   you to come and look.

   The map that replaced the tint looked the name up by substring, and a
   substring is how a swatch starts telling lies. Across the 1,637 colour names
   the ranges publish it painted twelve engineered-timber oaks — Almond,
   Chocolate, Blonde, Milky, Cashew — with one identical tan, and it read
   Blackbutt, a pale honey hardwood, as black. In 22 ranges it put two
   genuinely different tones on the same dot, on the page people use to choose.

   So the lookup is exact now, over a much longer map, and a name the map does
   not know renders as its name alone. No dot is the honest answer for a tone we
   cannot show; a confident wrong one is worse than none. That leaves 647 of the
   1,637 names carrying a swatch, and no range showing two different colours as
   one dot — where the substring match claimed 627 and got 106 of them wrong. */
const SWATCH = {
  /* whites and off-whites */
  white: '#f6f4f1', 'off white': '#efece6', bianco: '#f0ece6', blanco: '#f0ece6',
  'bianco white': '#f0ece6', porcelain: '#eceae5', marble: '#ece9e3', chalk: '#eae7e0',
  magnolia: '#f2e9d7', ivory: '#f2ead9', pearl: '#e8e6e1', quartz: '#e2ded6',
  dolomite: '#e6e2da', opal: '#dfe0dc', bone: '#e5ded2', cream: '#ece3d2',
  linen: '#e6ded0', almond: '#e6d9c4', champagne: '#e2d3b4',

  /* sands, beiges, greiges */
  ecru: '#dfd6c3', oatmeal: '#ded3bd', limestone: '#ded5c4', sand: '#dccaad',
  arena: '#d3c0a0', sabbia: '#d8c8ab', sandstone: '#d8c6a6', beige: '#d9cbb4',
  'warm beige': '#dccbb0', cashmere: '#d8cec0', oyster: '#d9d2c5', natural: '#cbb79a',
  greige: '#c3b8ab', taupe: '#b9ada0', fawn: '#c4a480', tan: '#b98b5e',

  /* greys, palest to black */
  mist: '#d7d8d6', cloud: '#d4d4d1', 'pearl grey': '#d5d4cf', dove: '#cfcac2',
  'dove grey': '#cfcac2', 'light grey': '#c9c9c6', fog: '#c0c1bf', silver: '#c2c4c4',
  aluminium: '#b4b7b8', 'cool grey': '#b6bab9', ash: '#b2b0aa', 'ash grey': '#b2b0aa',
  concrete: '#a5a29c', smoke: '#a3a19c', gravel: '#9a958c', grey: '#9b9b98',
  gray: '#9b9b98', gris: '#9b9b98', grigio: '#9b9b98', pewter: '#8d8b85',
  zinc: '#7d8285', steel: '#71787c', granite: '#6e6d6a', 'dark grey': '#5f6060',
  slate: '#5c6366', basalt: '#4e4f4e', gunmetal: '#4c5257', 'gun metal': '#4c5257',
  graphite: '#4a4d4f', charcoal: '#3c3f41', anthracite: '#36393b', carbon: '#33322f',
  onyx: '#2b2b2d', ebony: '#2a2523', black: '#232323', nero: '#232323',
  'nero black': '#232323', negro: '#232323',

  /* timbers, including the species the flooring feed names outright */
  'limed oak': '#d3c3a8', blackbutt: '#d9bd93', 'tasmanian oak': '#d8bc94',
  oak: '#c49a6c', 'natural oak': '#c49a6c', cork: '#c39a6b', driftwood: '#b5aa9c',
  mushroom: '#b3a99c', 'spotted gum': '#b07f4f', hazelnut: '#a5794f', teak: '#9c6b3f',
  brown: '#7a5c42', chestnut: '#7b4b32', jarrah: '#7d3a2c', merbau: '#6f3a24',
  mahogany: '#6b3225', walnut: '#6b4a31', sable: '#4f4038',

  /* hues */
  terracotta: '#b06a4a', rojo: '#9e3b32', blush: '#dcbdb4', rosa: '#d8a6ad',
  'dusty pink': '#c9a3a2', 'dusky pink': '#c9a3a2', purple: '#5f4b73',
  cornflower: '#6f8bc4', blue: '#4d6478', azul: '#4d6478', blu: '#4d6478',
  cobalt: '#2f4b8f', 'midnight blue': '#232f45', turquoise: '#48a3a6',
  turchese: '#48a3a6', sage: '#a3ab96', matcha: '#8f9c62', jade: '#4f8a72',
  green: '#5c6f5a', verde: '#5c6f5a', 'pine green': '#3f5a44', gold: '#c2a25c',
}

/* Light and dark of a mapped tone are the same hue at another value, which is
   arithmetic rather than a guess — unlike "Chocolate Oak", where the word in
   front names a different tone altogether and so gets nothing. Italian hangs
   its qualifier off the back ("Verde Scuro"), so both ends are tried. */
const SHADE = { pale: 0.34, light: 0.24, medium: 0, dark: -0.26, deep: -0.34 }
const SHADE_AFTER = { chiaro: 0.24, scuro: -0.26 }

/* Words the feed appends that describe the face rather than the tone: "Beige
   Fluted" is beige, "Bone Stipple" is bone. Dropping a word off this closed
   list is normalisation; dropping "Coast" off "Ivory Coast" would be the
   substring bug again, so nothing else goes. */
const FINISH = new Set(['stipple', 'fluted', 'matt', 'matte', 'gloss', 'polished', 'honed'])

const shade = (hex, amount) => {
  if (!amount) return hex
  const n = parseInt(hex.slice(1), 16)
  return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((c) => Math.round(amount > 0 ? c + (255 - c) * amount : c * (1 + amount)))
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')
}

/* The feed carries its product codes inside the colour name — "Almond Oak 722",
   "Atticus+4318", "Meadow Blackbutt M4" — and a few carpet ranges publish
   nothing but the code ("111", "312"). A token holding a digit is the code,
   never the tone, so it goes; a name that is all code normalises to nothing and
   is left as it was published. */
function toneKey(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter((word) => word && !/\d/.test(word) && !FINISH.has(word))
    .join(' ')
}

/* hasOwn rather than a bare lookup: these are plain objects, and the feed's
   colour vocabulary already runs to Foundry, Assembly and Precinct — a range
   publishing "Constructor" would otherwise resolve off Object.prototype and
   paint a function into the style attribute. */
const toneHex = (key) => (Object.hasOwn(SWATCH, key) ? SWATCH[key] : null)

function swatchFor(name) {
  const key = toneKey(name)
  const exact = toneHex(key)
  if (exact) return exact
  /* Two words at most, and one of them has to be a qualifier over a tone we
     hold. Anything longer or looser is a name, not a description of a colour. */
  const [first, last, ...rest] = key.split(' ')
  if (!last || rest.length) return null
  if (Object.hasOwn(SHADE, first) && toneHex(last)) return shade(toneHex(last), SHADE[first])
  if (Object.hasOwn(SHADE_AFTER, last) && toneHex(first)) return shade(toneHex(first), SHADE_AFTER[last])
  return null
}

/* Boxed-quantity columns, as opposed to the descriptive ones. Used to tell a
   row of six em-dashes ("this format is quoted by the piece") apart from a
   genuinely missing slip rating, which should keep saying so. */
const isQtyCol = (column) => /ctn|plt|\/box|pcs|pieces|m²|kg|qty|quantit/i.test(column)

/* The thumbnail strip, out here as its own component rather than inline so the
   overflow hook mounts with the rail: a liveGallery range arrives with one
   image and gains the rest from the variants fetch, and a hook called up in
   ProductDetail would have measured a rail that did not exist yet. */
function Thumbs({ images, active, onPick, contain }) {
  const { ref, fade } = useOverflow()

  /* The stage moves without the rail being touched: the variant fetch lands on
     image twelve of seventeen, a colour chip jumps nine frames right. The live
     thumb was then off-screen, so nothing in the visible strip was marked and
     the rail and the stage disagreed. Centred by scrollBy rather than
     scrollIntoView — the fetch resolves after paint, and scrollIntoView would
     drag the whole page down to the rail to do it. */
  useEffect(() => {
    const rail = ref.current
    const thumb = rail?.children[active]
    if (!rail || !thumb) return
    const r = rail.getBoundingClientRect()
    const t = thumb.getBoundingClientRect()
    rail.scrollBy({ left: t.left + t.width / 2 - (r.left + r.width / 2), behavior: 'smooth' })
  }, [active, ref])

  return (
    <>
      <div className={'overflowFade ' + s.thumbFade} data-fade={fade}>
        <ul ref={ref} className={s.thumbs}>
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                className={i === active ? s.thumb + ' ' + s.thumbOn : s.thumb}
                onClick={() => onPick(i)}
                aria-label={`View image ${i + 1} of ${images.length}`}
                aria-current={i === active}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className={contain ? s.flooringThumb : undefined}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Thirty shots scroll past the right edge with no scrollbar to say so.
          The count is the only thing left that tells you how far the strip
          runs, and which frame you are on. */}
      <p className={s.thumbCount}>
        <strong>{active + 1}</strong> / {images.length}
      </p>
    </>
  )
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
  /* Set by the table's own "show all" link and cleared by the next chip: a
     reader who asked for the whole table has not asked to stop choosing sizes. */
  const [showAllSpecs, setShowAllSpecs] = useState(false)
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
    setShowAllSpecs(false)

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

  const sizeColumn = specCols.findIndex((column) => /size/i.test(column))
  const finishColumn = specCols.findIndex((column) => /finish/i.test(column))

  /* The feed writes a size as "300 × 600" and the chip above it as "300x600".
     Deleting the × left "300600" to compare against "300x600", so on this range
     nothing ever matched and the filter fell through to the whole table; on the
     344 rows written with a plain x it fired and nobody was told. Folding × onto
     x is what the two sides had in common all along. */
  const normaliseSize = (value) =>
    value.toLowerCase().replace(/[×\s]|mm/g, (part) => (part === '×' ? 'x' : ''))

  /* The rows the reader's own size and finish leave standing, plus what to say
     they are scoped to. A table quietly rewritten to one of ten rows, under a
     heading still reading "how the range is supplied", is worse than one that
     never filtered — so scope is empty unless the filter actually narrowed it. */
  const specFilter = useMemo(() => {
    if (!specRows.length) return { rows: [], scope: [] }
    const matches = specRows.filter((row) => {
      const sizeMatches = sizeColumn < 0 || !selectedSize || normaliseSize(row[sizeColumn] || '') === normaliseSize(selectedSize)
      const finishCell = finishColumn < 0 ? '' : String(row[finishColumn] || '').toLowerCase()
      const finishMatches = finishColumn < 0 || !selectedFinish || finishCell.includes(selectedFinish.toLowerCase())
      return sizeMatches && finishMatches
    })
    if (!matches.length || matches.length === specRows.length) return { rows: specRows, scope: [] }
    return {
      rows: matches,
      scope: [sizeColumn >= 0 && selectedSize, finishColumn >= 0 && selectedFinish].filter(Boolean),
    }
  }, [selectedSize, selectedFinish, sizeColumn, finishColumn, specRows])

  const shownSpecRows = showAllSpecs ? specRows : specFilter.rows

  /* Some formats are quoted by the piece rather than boxed, and the feed writes
     that as an em-dash in every quantity column — six in a row, which reads as
     missing data rather than as a different way of selling the same tile, and
     on Bari it is the note the table ends on. Only the dash block collapses:
     the size and the finish beside it are real. */
  const qtyFrom = specCols.findIndex(isQtyCol)
  const hasQtyTail = qtyFrom > 0 &&
    specCols.length - qtyFrom >= 3 &&
    specCols.slice(qtyFrom).every(isQtyCol)
  const onRequest = (row) =>
    hasQtyTail && row.slice(qtyFrom).every((cell) => !cell || cell === '—')

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

  /* No colours row. The chips directly above this list already name them, and
     the dark strip directly below recites them again — three passes at Bianco,
     Taupe and Beige inside one scroll. Brand, rooms and material are the only
     lines here that are not stated somewhere else on the page. */
  const heroFacts = [
    { label: 'Brand', value: brand },
    rooms.length && { label: 'Suitable for', value: rooms.map((r) => r.label).join(', ') },
    material.length && { label: 'Material', value: material.join(', ') },
  ].filter(Boolean)

  /* Watched by the floating enquire bar, which rides in once the hero's own
     Enquire button has scrolled off the top. */
  const actionsRef = useRef(null)

  /* The bar's second line. "mm" is only ours to add when the published size is
     a bare dimension: the flooring and carpet ranges write their own unit
     ("6.5mm", "3.66m", "1900 x 190 x 14 mm"), and appending to those gave the
     bar "6.5mmmm" and "3.66mmm" on 147 of the 381 ranges that publish a size. */
  const barSize = /^[\d\s.x×]+$/i.test(sizes[0] || '') ? `${sizes[0]}mm` : sizes[0]
  const barMeta = barSize ? `${brand} · ${barSize}` : brand

  /* The table is the one block on the page that legitimately runs wider than
     the column it sits in. */
  const { ref: specRef, fade: specFade } = useOverflow()

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
                <Thumbs
                  images={galleryImages}
                  active={active}
                  onPick={setActive}
                  contain={isFlooring}
                />
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
                      {colours.map((colour) => {
                        const dot = swatchFor(colour)
                        return (
                          <button key={colour} type="button"
                            className={selectedColour === colour ? `${s.option} ${s.optionOn}` : s.option}
                            onClick={() => chooseOption('colour', colour)} aria-pressed={selectedColour === colour}>
                            {/* Nothing at all rather than a placeholder ring: an
                                empty circle is still a swatch-shaped thing
                                saying nothing, and the chip closing up around
                                the name keeps the row reading as one set of
                                controls instead of holding a gap open. */}
                            {dot && (
                              <span className={s.colourDot} style={{ '--dot': dot }} aria-hidden="true" />
                            )}{colour}
                          </button>
                        )
                      })}
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
                <EnquireLink range={name} subject="Product enquiry" className="cta">
                  <span>Enquire now</span>
                  <Icon d={ARROW} size={16} />
                </EnquireLink>
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

              {!showAllSpecs && specFilter.scope.length > 0 && (
                <p className={s.specScope}>
                  Showing {specFilter.scope.join(' · ')}
                  <button
                    type="button"
                    className={'linkUnder ' + s.specAll}
                    onClick={() => setShowAllSpecs(true)}
                  >
                    Show all {specRows.length} formats
                  </button>
                </p>
              )}

              {specCols.length > 2 && (
                <p className={s.specSwipe}>
                  Swipe the table for the rest of the columns, through to{' '}
                  {specCols[specCols.length - 1]}.
                </p>
              )}
            </div>

            <div className={'overflowFade ' + s.tableFade} data-fade={specFade} data-reveal>
              <div ref={specRef} className={s.tableWrap}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      {specCols.map((c) => (
                        <th key={c} scope="col">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shownSpecRows.map((r, i) => (
                      <tr key={i}>
                        {onRequest(r) ? (
                          <>
                            {r.slice(0, qtyFrom).map((cell, j) => (
                              <td key={j}>{cell || '—'}</td>
                            ))}
                            <td colSpan={specCols.length - qtyFrom} className={s.onRequest}>
                              Quantities on request
                            </td>
                          </>
                        ) : (
                          r.map((cell, j) => <td key={j}>{cell || '—'}</td>)
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ---------- floating enquire bar ---------- */}
      <EnquireBar
        watch={actionsRef}
        name={name}
        meta={barMeta}
        image={shot}
        range={name}
        subject="Product enquiry"
      />

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className={'sectionPad ' + s.related} data-reveal-scope>
          <div className="container">
            <div className={s.relatedHead}>
              <div>
                {/* Not "more from this range" — every card here is a different
                    range in the same collection, which is what the link beside
                    it has always said. */}
                <p className="eyebrow">More {collection.label}</p>
                <h2 className={'title ' + s.h2}>You may also like</h2>
              </div>
              <Link href={collection.href} className={'linkUnder ' + s.all}>
                All {collection.label}
              </Link>
            </div>

            {/* The rail carries whatever the collection has left over: four
                ranges from a big one, exactly one from Pavers. The grid lays
                itself out to that count rather than leaving three quarters of
                the page's closing band empty. */}
            <ul className={s.relatedGrid} data-count={related.length}>
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
