import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { HYBRID_PRODUCTS, hybridByHandle } from '@/components/hybridProductData'

const COLLECTION = { label: 'Hybrid Flooring', href: '/flooring/hybrid-flooring' }

export function generateStaticParams() {
  return HYBRID_PRODUCTS.map((product) => ({ handle: product.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const product = hybridByHandle(handle)
  if (!product) return { title: 'Product not found | Capital Tiles' }
  return {
    title: product.seoTitle,
    description: product.seoDesc,
    alternates: { canonical: `/flooring/hybrid-flooring/${product.handle}` },
  }
}

function relatedFor(handle) {
  const index = HYBRID_PRODUCTS.findIndex((product) => product.handle === handle)
  const related = []
  for (let offset = 1; related.length < 4 && offset < HYBRID_PRODUCTS.length; offset++) {
    const product = HYBRID_PRODUCTS[(index + offset) % HYBRID_PRODUCTS.length]
    if (product.handle !== handle) {
      related.push({ handle: product.handle, name: product.name, brand: product.brand, img: product.card })
    }
  }
  return related
}

export default async function HybridProductPage({ params }) {
  const { handle } = await params
  const product = hybridByHandle(handle)
  if (!product) notFound()

  return <ProductDetail product={product} collection={COLLECTION} related={relatedFor(handle)} />
}
