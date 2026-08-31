import { NextResponse } from 'next/server'
import { searchPages, searchProducts } from '@/components/searchData'

/* The index spans every range we sell, which is far too much data to ship to
   the browser on each page load. The header box asks this instead and gets back
   only the handful of rows it is about to draw.

   Pages come back separately from ranges: someone typing "tiles" or "bathroom"
   usually wants the collection itself, and that belongs above the individual
   ranges rather than buried among them. */
export async function GET(request) {
  const q = (request.nextUrl.searchParams.get('q') || '').trim()
  if (q.length < 2) return NextResponse.json({ pages: [], products: [] })

  const pages = searchPages(q, 4).map((p) => ({
    label: p.label,
    href: p.href,
    section: p.section,
    img: p.img,
  }))

  /* Keep the panel to ten rows however the split falls. */
  const products = searchProducts(q, Math.max(4, 10 - pages.length)).map((p) => ({
    name: p.name,
    brand: p.brand,
    collection: p.collection,
    section: p.section,
    href: p.href,
    img: p.img,
  }))

  return NextResponse.json({ pages, products })
}
