import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { DURATUFT_PRODUCTS, byHandle } from '@/components/duratuftProductData'

const COLLECTION = {
  label: 'Duratuft Carpet',
  href: '/carpet/duratuft',
  sizeLabel: 'Roll width',
  parent: { label: 'Carpet', href: '/carpet' },
}

export function generateStaticParams() {
  return DURATUFT_PRODUCTS.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const p = byHandle(handle)
  if (!p) return { title: 'Product not found | Capital Tiles' }
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    alternates: { canonical: `/carpet/duratuft/${p.handle}` },
  }
}

/* Four other ranges from the same collection, taken from the position after
   this one so every product shows a different set rather than the same four. */
function relatedFor(handle) {
  const i = DURATUFT_PRODUCTS.findIndex((p) => p.handle === handle)
  const out = []
  for (let k = 1; out.length < 4 && k < DURATUFT_PRODUCTS.length; k++) {
    const p = DURATUFT_PRODUCTS[(i + k) % DURATUFT_PRODUCTS.length]
    if (p.handle !== handle) {
      out.push({ handle: p.handle, name: p.name, brand: p.brand, img: p.card })
    }
  }
  return out
}

export default async function DuratuftProductPage({ params }) {
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
