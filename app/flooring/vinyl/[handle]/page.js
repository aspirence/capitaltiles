import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { VINYL_PRODUCTS, byHandle } from '@/components/vinylProductData'

const COLLECTION = {
  label: 'Vinyl Flooring',
  href: '/flooring/vinyl',
  parent: { label: 'Flooring', href: '/flooring' },
}

export function generateStaticParams() {
  return VINYL_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/flooring/vinyl/${p.handle}` },
  }
}

/* Four other ranges from the same collection, taken from the position after
   this one so every product shows a different set rather than the same four. */
function relatedFor(handle) {
  const i = VINYL_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < VINYL_PRODUCTS.length; k++) {
    const p = VINYL_PRODUCTS[(i + k) % VINYL_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function VinylProductPage({ params }) {
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
