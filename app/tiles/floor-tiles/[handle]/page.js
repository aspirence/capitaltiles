import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { FLOOR_TILE_PRODUCTS, byHandle } from '@/components/floorTilesProductData'

const COLLECTION = {
  label: 'Floor Tiles',
  href: '/tiles/floor-tiles',
  parent: { label: 'Tiles', href: '/tiles' },
}

export function generateStaticParams() {
  return FLOOR_TILE_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/tiles/floor-tiles/${p.handle}` },
  }
}

/* Four other ranges from the same collection, taken from the position after
   this one so every product shows a different set rather than the same four. */
function relatedFor(handle) {
  const i = FLOOR_TILE_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < FLOOR_TILE_PRODUCTS.length; k++) {
    const p = FLOOR_TILE_PRODUCTS[(i + k) % FLOOR_TILE_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function FloorTileProductPage({ params }) {
  const { handle } = await params
  const product = byHandle(handle)
  if (!product) notFound()

  return (
    <ProductDetail
      product={product}
      collection={COLLECTION}
      related={relatedFor(product.handle)}
    />
  )
}
