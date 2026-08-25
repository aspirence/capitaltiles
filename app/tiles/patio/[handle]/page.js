import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { PATIO_PRODUCTS, byHandle } from '@/components/patioProductData'

const COLLECTION = {
  label: 'Patio Tiles',
  href: '/tiles/patio',
  parent: { label: 'Tiles', href: '/tiles' },
}

export function generateStaticParams() {
  return PATIO_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/tiles/patio/${p.handle}` },
  }
}

/* Other ranges from the same collection, taken from the position after this
   one so every product shows a different set rather than the same few. */
function relatedFor(handle) {
  const i = PATIO_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < PATIO_PRODUCTS.length; k++) {
    const p = PATIO_PRODUCTS[(i + k) % PATIO_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function PatioTileProductPage({ params }) {
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
