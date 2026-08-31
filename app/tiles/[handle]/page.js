import ComingSoon, { titleFromSlug } from '@/components/sections/ComingSoon'
import ProductDetail from '@/components/sections/ProductDetail'
import { TILE_PRODUCTS, byHandle } from '@/components/tilesProductData'

export function generateStaticParams() {
  return TILE_PRODUCTS.map((p) => ({ handle: p.handle }))
}

/* Most ranges are also reachable under their collection — /tiles/wall/carrara —
   which is the deeper, more specific URL, so that one is canonical and this
   whole-collection view points at it. The few ranges that belong to no
   collection we hold have only this URL, and canonicalise to themselves. */
export async function generateMetadata({ params }) {
  const { handle } = await params
  const entry = byHandle(handle)
  /* Not a product: this route sits in front of the catch-all, so it has to
     answer for every /tiles/<something> address the site links to. */
  if (!entry) return { title: titleFromSlug([handle]) + ' — Capital Tiles' }
  return {
    title: entry.product.seoTitle,
    description: entry.product.seoDesc,
    alternates: { canonical: entry.canonical },
  }
}

/* Four other ranges from the same collection, taken from the position after
   this one so every product shows a different set rather than the same four. */
function relatedFor(handle, siblings) {
  const i = siblings.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < siblings.length; k++) {
    const p = siblings[(i + k) % siblings.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function TileProductPage({ params }) {
  const { handle } = await params
  const entry = byHandle(handle)
  if (!entry) return <ComingSoon slug={['tiles', handle]} />

  return (
    <ProductDetail
      product={entry.product}
      collection={entry.collection}
      related={relatedFor(entry.product.handle, entry.siblings)}
    />
  )
}
