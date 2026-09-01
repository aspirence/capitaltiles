'use client'

import { useState } from 'react'
import Link from 'next/link'
import s from './Explore.module.css'

/* The one product index on the homepage: a tab rail over an editorial list,
   where hovering a name cross-fades the plate beside it. Collections used to
   run this treatment for flooring alone, one section below a card carousel
   that offered the same four routes — the two are now a single section, with
   Collections' plate-and-index device carrying all three categories.

   The rows never change size on hover: each range's blurb lives in the plate
   caption rather than unfolding under its name, so nothing shifts beneath the
   pointer. Touch users get the same result on tap-through.

   Labels and hrefs mirror components/navData.js. When a range moves, change it
   in both — the old hand-typed copy of this list had drifted to two routes the
   header no longer pointed at. */

const TABS = [
  {
    /* Six, to match the other two tabs. Mega slab and subway are the two left
       out: the FAQ already calls them "order-in rather than on the floor", so
       they are the pair a showroom index can hold back. Both are still one
       click away under View all, and both keep their place in the header. */
    label: 'Tiles',
    all: '/tiles',
    items: [
      {
        name: 'Floor Tiles',
        tag: 'Marble · Stone · Concrete',
        copy: 'Marble, stone, concrete and terrazzo looks in matt, honed, polished and lappato finishes.',
        href: '/tiles/floor-tiles',
        img: '/img/floor-tiles/alhambra.jpg',
      },
      {
        name: 'Wall Tiles',
        tag: 'Subway · Mosaic · Marble',
        copy: 'Gloss, matt and textured finishes for splashbacks, bathrooms and feature walls.',
        href: '/tiles/wall',
        img: '/img/wall/21203-natural.jpg',
      },
      {
        name: 'Pool Tiles',
        tag: 'Glass Mosaic · Coping',
        copy: 'Glass pool mosaics and travertine-look coping, built for chlorine, salt and frost.',
        href: '/tiles/pool',
        img: '/img/pool/altto-glass-pool-mosaics.jpg',
      },
      {
        name: 'Patio Tiles',
        tag: 'Frost Rated · Slip Safe',
        copy: 'Stone, travertine and concrete looks for patios and courtyards, with matching indoor tiles.',
        href: '/tiles/patio',
        img: '/img/patio/aegean-sea.jpg',
      },
      {
        name: 'Pavers',
        tag: '20mm · Outdoor Porcelain',
        copy: 'Thick outdoor porcelain for pool surrounds, paths and alfresco areas.',
        href: '/tiles/pavers',
        img: '/img/pavers/bari-collection.jpg',
      },
      {
        name: 'Mosaic',
        tag: 'Feature · Splashback',
        copy: 'Marble herringbone, glass and textured mosaics for niches, splashbacks and shower floors.',
        href: '/tiles/mosaic',
        img: '/img/mosaic/alhambra.jpg',
      },
    ],
  },
  {
    label: 'Flooring',
    all: '/flooring',
    items: [
      {
        name: 'Hybrid Flooring',
        tag: 'Waterproof · Rigid Core',
        copy: 'Rigid-core planks that shrug off spills, so one floor can run from the kitchen through to the living room.',
        href: '/flooring/hybrid-flooring',
        img: '/img/flooring/hybrid-flooring.jpg',
      },
      {
        name: 'Engineered Timber',
        tag: 'Real Timber · Stable Core',
        copy: 'A genuine timber wear layer over a stable core, so you get real grain that copes with Canberra winters.',
        href: '/flooring/engineered-timber',
        img: '/img/flooring/engineered-timber.jpg',
      },
      {
        name: 'Laminate Flooring',
        tag: 'Hard Wearing · Value',
        copy: 'The timber look at a friendlier price, with a tough wear layer built for kids, pets and hallway traffic.',
        href: '/flooring/laminate-flooring',
        img: '/img/flooring/laminate-flooring.jpg',
      },
      {
        name: 'Natural Timber',
        tag: 'Solid Boards · Plank & Herringbone',
        copy: 'Oak, spotted gum and ironbark tones in 15mm and 20mm solid boards.',
        href: '/flooring/timber',
        img: '/img/timber/spotted-gum.jpg',
      },
      {
        name: 'Vinyl Flooring',
        tag: 'Quiet · Warm Underfoot',
        copy: 'Softer and quieter than a hard surface, and forgiving over a subfloor that is not perfectly level.',
        href: '/flooring/vinyl',
        img: '/img/flooring/vinyl.jpg',
      },
      {
        name: 'Flooring Installation',
        tag: 'Free Measure · Lay · Seal',
        copy: 'Our own team lifts the old floor, preps the subfloor, lays and seals — one quoted price.',
        href: '/installation',
        img: '/img/about/craft.jpg',
      },
    ],
  },
  {
    /* By fibre, as the header lists it. These rows used to be labelled by room
       — Bedrooms, Living Rooms, Family & Media Rooms — which collided head-on
       with the Explore by Space section below and told a carpet shopper
       nothing about the carpet. */
    label: 'Carpet',
    all: '/carpet',
    items: [
      {
        name: 'Wool',
        tag: 'Natural · Australian & NZ Made',
        copy: 'Level loop, chunky textured loop and cut pile twist, including Australian and New Zealand made.',
        href: '/carpet/wool',
        img: '/img/wool/bahamas.jpg',
      },
      {
        name: 'Triexta',
        tag: 'Australian Made · Stain Resistant',
        copy: 'Cut pile twist and textured cut and loop, with stain resistance built into the fibre.',
        href: '/tiles/triexta',
        img: '/img/triexta/inspirational.jpg',
      },
      {
        name: 'DuraTuft®',
        tag: 'Godfrey Hirst · Soft PET',
        copy: 'Cut pile twists, dense plush and flecked neutrals across six ranges.',
        href: '/carpet/duratuft',
        img: '/img/duratuft/capri.jpg',
      },
      {
        name: 'Solution Dyed Nylon',
        tag: 'Colour Locked · Hard Wearing',
        copy: 'Chunky loops, soft cut pile twists and wool-look textures, with the colour locked into the fibre.',
        href: '/carpet/solution-dyed-nylon',
        img: '/img/solution-dyed-nylon/acacia-hill.jpg',
      },
      {
        name: 'Polyester',
        tag: 'Soft · Deep Colour',
        copy: 'Cut pile twist and chunky loop — soft underfoot, and very good with water-based spills.',
        href: '/carpet/polyester',
        img: '/img/polyester/classic-city.jpg',
      },
      {
        name: 'Polypropylene',
        tag: 'Water Resistant · Value',
        copy: 'High-low, textured and chunky loop piles in a fibre that does not absorb water.',
        href: '/carpet/polypropylene',
        img: '/img/polypropylene/astra.jpg',
      },
    ],
  },
]

export default function Explore() {
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(0)

  const items = TABS[tab].items

  const pickTab = (i) => {
    setTab(i)
    setActive(0)
  }

  return (
    <section className={'sectionPad ' + s.section}>
      <div className="container">
        <div className={s.head}>
          <div>
            <p className="eyebrow" data-reveal>Browse the range</p>
            <h2 className={'title ' + s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Explore Tiles, Flooring and Carpet
            </h2>
          </div>

          <div className={s.headRight}>
            <div className={s.tabs} role="tablist" aria-label="Browse by category">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  className={i === tab ? s.tabOn : undefined}
                  onClick={() => pickTab(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Link href={TABS[tab].all} className={'linkUnder ' + s.viewAll} data-reveal>
              View all
            </Link>
          </div>
        </div>

        {/* Remounting on tab change restarts the plate cross-fade and the row
            reveals, so a new category arrives rather than swapping in place. */}
        <div className={s.body} key={tab}>
          {/* plates */}
          <div className={s.plates} data-reveal="scale">
            {items.map((item, i) => (
              <figure
                key={item.name}
                className={i === active ? s.plate + ' ' + s.plateOn : s.plate}
                aria-hidden={i !== active}
              >
                <img src={item.img} alt={item.name} loading="lazy" />
                <figcaption>
                  <span className={s.plateName}>{item.name}</span>
                  <span className={s.plateTag}>{item.tag}</span>
                  <span className={s.plateCopy}>{item.copy}</span>
                </figcaption>
              </figure>
            ))}
            <span className={s.plateCount} aria-hidden="true">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>

          {/* index */}
          <ol className={s.index}>
            {items.map((item, i) => (
              <li
                key={item.name}
                className={i === active ? s.row + ' ' + s.rowOn : s.row}
                data-reveal="left"
                style={{ '--reveal-delay': i * 70 + 'ms' }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Link href={item.href} onClick={() => setActive(i)}>
                  <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.rowMain}>
                    <span className={s.rowName}>{item.name}</span>
                  </span>
                  <span className={s.rowSwatch} aria-hidden="true">
                    <img src={item.img} alt="" loading="lazy" />
                  </span>
                  <span className={s.rowArrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
