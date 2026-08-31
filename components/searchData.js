/* One searchable index across the whole catalogue.

   It is assembled from the three section aggregators, so every range that has a
   page is in here exactly once, with the URL that page actually lives at. No
   product data is copied — this only indexes what the aggregators already hold.
*/

import { TILE_PRODUCTS, TILE_GROUPS, byHandle as tileEntry } from './tilesProductData'
import { CARPET_PRODUCTS, CARPET_GROUPS, byHandle as carpetEntry } from './carpetProductData'
import { FLOORING_PRODUCTS, FLOORING_GROUPS, byHandle as flooringEntry } from './flooringProductData'

function index(products, lookup, section) {
  return products.map((p) => {
    const entry = lookup(p.handle)
    const collection = entry?.collection
    return {
      handle: p.handle,
      name: p.name || p.handle,
      brand: p.brand || '',
      img: p.card || '',
      section,
      collection: collection?.label || section,
      /* The tiles and flooring aggregators already resolve a canonical; carpet
         builds the same address from the collection it belongs to. */
      href: entry?.canonical || (collection ? `${collection.href}/${p.handle}` : `/${section.toLowerCase()}/${p.handle}`),
      colours: p.colours || [],
      finishes: p.finishes || [],
      sizes: p.sizes || [],
      material: p.material || [],
    }
  })
}

const ALL = [
  ...index(TILE_PRODUCTS, tileEntry, 'Tiles'),
  ...index(CARPET_PRODUCTS, carpetEntry, 'Carpet'),
  ...index(FLOORING_PRODUCTS, flooringEntry, 'Flooring'),
]

/* A range listed in two sections would otherwise appear twice. */
const seen = new Set()
export const SEARCH_INDEX = ALL.filter((item) => {
  if (seen.has(item.href)) return false
  seen.add(item.href)
  return true
})

/* ---------------------------------------------------------------------------
   Whole pages, not just single ranges. Someone typing "tiles" or "wool" most
   often wants the collection itself, so the pages are searched alongside the
   products and shown above them.
   ------------------------------------------------------------------------- */

/* The section landings and the handful of collection pages that back no group
   of their own; everything else is read off the aggregators below. */
const EXTRA_PAGES = [
  { label: 'Tiles', href: '/tiles', section: 'Tiles', keywords: 'all tiles porcelain range' },
  { label: 'Flooring', href: '/flooring', section: 'Flooring', keywords: 'all flooring timber boards range' },
  { label: 'Carpet', href: '/carpet', section: 'Carpet', keywords: 'all carpet fibre range' },
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', section: 'Tiles', keywords: 'alfresco terrace frost paving' },
  { label: 'Living Room & Hallway Tiles', href: '/tiles/living-room', section: 'Tiles', keywords: 'lounge hallway' },
  { label: 'Bedroom Tiles', href: '/tiles/bedroom', section: 'Tiles', keywords: 'bedroom' },
  { label: 'Mega Slab Tiles', href: '/tiles/mega-slab', section: 'Tiles', keywords: 'large format panel slab' },
  { label: 'Subway Tiles', href: '/tiles/subway', section: 'Tiles', keywords: 'splashback running bond' },
  { label: 'Commercial Carpet and Tiles', href: '/carpet/commercial-carpet-and-tiles', section: 'Carpet', keywords: 'office modular broadloom workplace' },
  { label: 'Installation Service', href: '/installation', section: 'Service', keywords: 'lay install measure quote seal' },
  { label: 'Free Measure & Quote', href: '/contact-us/enquiry', section: 'Service', keywords: 'quote enquiry booking' },
  { label: 'Contact & Showroom', href: '/contact-us', section: 'Service', keywords: 'showroom mitchell address phone hours visit' },
  { label: 'About Capital Tiles', href: '/about', section: 'Service', keywords: 'story company' },
  { label: "FAQ's", href: '/faqs', section: 'Service', keywords: 'questions help advice' },
  { label: 'Blogs', href: '/blogs', section: 'Service', keywords: 'articles guides advice' },
]

/* The collection photos double as the dropdown thumbnails: /tiles/wall takes
   /img/copy/tiles-wall.jpg and so on. The rows below are the ones whose file is
   named differently, or which are service pages with no collection photo. */
const PAGE_IMG = {
  '/tiles': '/img/copy/tiles.jpg',
  '/carpet': '/img/copy/carpet.jpg',
  '/flooring': '/img/copy/flooring.jpg',
  '/carpet/commercial-carpet-and-tiles': '/img/copy/carpet-commercial.jpg',
  '/installation': '/img/installation/banner.jpg',
  '/contact-us': '/img/about/showroom.jpg',
  '/contact-us/enquiry': '/img/installation/free-quote.jpg',
  '/about': '/img/about/banner-1.jpg',
  '/faqs': '/img/installation/advice.jpg',
  '/blogs': '/img/blogs/blog-1.jpg',
}
const autoImg = (href) => PAGE_IMG[href] || `/img/copy${href.replace(/\//g, '-')}.jpg`.replace('/img/copy-', '/img/copy/')

const pageRows = new Map()
for (const group of [...TILE_GROUPS, ...CARPET_GROUPS, ...FLOORING_GROUPS]) {
  const c = group.collection
  if (!pageRows.has(c.href)) {
    pageRows.set(c.href, { label: c.label, href: c.href, section: c.parent?.label || '', keywords: '' })
  }
}
for (const p of EXTRA_PAGES) if (!pageRows.has(p.href)) pageRows.set(p.href, p)

export const PAGE_INDEX = [...pageRows.values()].map((p) => ({
  ...p,
  img: autoImg(p.href),
}))

/* Compare on letters and digits only, so "600x1200", "600 x 1200" and
   "600X1200" all match, and so does "solution dyed" against "Solution Dyed". */
const norm = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/* Everything about a range that a customer might actually type. */
function haystack(item) {
  return norm([
    item.name, item.brand, item.collection, item.section,
    ...item.colours, ...item.finishes, ...item.sizes, ...item.material,
  ].join(' '))
}

const HAYSTACKS = new WeakMap()
const hay = (item) => {
  let h = HAYSTACKS.get(item)
  if (!h) { h = haystack(item); HAYSTACKS.set(item, h) }
  return h
}

/* Rank by where the match lands: a range whose name starts with the query is
   what someone typing "carr" wants first, ahead of one that merely ships a
   colour by that name. */
function score(item, token) {
  const name = norm(item.name)
  if (name === token) return 100
  if (name.startsWith(token)) return 60
  if (name.includes(token)) return 40
  if (norm(item.brand).includes(token)) return 20
  if (norm(item.collection).includes(token)) return 12
  if (hay(item).includes(token)) return 8
  return 0
}

/* Every word has to match something, so "wool loop" narrows rather than
   widens. The result's score is the sum of its per-word scores. */
export function searchProducts(query, limit = 60) {
  const tokens = norm(query).split(' ').filter(Boolean)
  if (!tokens.length) return []

  const hits = []
  for (const item of SEARCH_INDEX) {
    let total = 0
    for (const token of tokens) {
      const s = score(item, token)
      if (!s) { total = 0; break }
      total += s
    }
    if (total) hits.push({ item, total })
  }

  hits.sort((a, b) => b.total - a.total || a.item.name.localeCompare(b.item.name))
  return hits.slice(0, limit).map((h) => h.item)
}

/* Pages score on their own name first, then their section and keywords, so
   "tiles" surfaces the Tiles page ahead of Wall Tiles, and "bathroom" surfaces
   Bathroom Tiles. */
function pageScore(page, token) {
  const label = norm(page.label)
  if (label === token) return 120
  if (label.startsWith(token)) return 70
  if (label.includes(token)) return 45
  if (norm(page.section).includes(token)) return 15
  if (norm(page.keywords).includes(token)) return 10
  return 0
}

export function searchPages(query, limit = 4) {
  const tokens = norm(query).split(' ').filter(Boolean)
  if (!tokens.length) return []

  const hits = []
  for (const page of PAGE_INDEX) {
    let total = 0
    for (const token of tokens) {
      const s = pageScore(page, token)
      if (!s) { total = 0; break }
      total += s
    }
    if (total) hits.push({ page, total })
  }

  hits.sort((a, b) => b.total - a.total || a.page.label.length - b.page.label.length)
  return hits.slice(0, limit).map((h) => h.page)
}
