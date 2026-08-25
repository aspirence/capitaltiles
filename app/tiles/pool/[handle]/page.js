import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { POOL_PRODUCTS, byHandle } from '@/components/poolProductData'

const COLLECTION = {
  label: 'Pool Tiles',
  href: '/tiles/pool',
  parent: { label: 'Tiles', href: '/tiles' },
}

export function generateStaticParams() {
  return POOL_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/tiles/pool/${p.handle}` },
  }
}

/* Other ranges from the same collection, taken from the position after this
   one so every product shows a different set rather than the same few. */
function relatedFor(handle) {
  const i = POOL_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < POOL_PRODUCTS.length; k++) {
    const p = POOL_PRODUCTS[(i + k) % POOL_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function PoolTileProductPage({ params }) {
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
