import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { ENGINEERED_TIMBER_PRODUCTS, byHandle } from '@/components/engineeredTimberProductData'

const COLLECTION = {
  label: 'Engineered Timber',
  href: '/flooring/engineered-timber',
  parent: { label: 'Flooring', href: '/flooring' },
}

export function generateStaticParams() {
  return ENGINEERED_TIMBER_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/flooring/engineered-timber/${p.handle}` },
  }
}

/* Four other ranges from the same collection, taken from the position after
   this one so every product shows a different set rather than the same four. */
function relatedFor(handle) {
  const i = ENGINEERED_TIMBER_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < ENGINEERED_TIMBER_PRODUCTS.length; k++) {
    const p = ENGINEERED_TIMBER_PRODUCTS[(i + k) % ENGINEERED_TIMBER_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function EngineeredTimberProductPage({ params }) {
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
