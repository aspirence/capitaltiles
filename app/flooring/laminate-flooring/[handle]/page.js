import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { LAMINATE_PRODUCTS, laminateByHandle } from '@/components/laminateProductData'

const COLLECTION = { label: 'Laminate Flooring', href: '/flooring/laminate-flooring' }

export function generateStaticParams() {
  return LAMINATE_PRODUCTS.map((product) => ({ handle: product.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const product = laminateByHandle(handle)
  if (!product) return { title: 'Product not found | Capital Tiles' }
  return {
    title: product.seoTitle,
    description: product.seoDesc,
    alternates: { canonical: `/flooring/laminate-flooring/${product.handle}` },
  }
}

function relatedFor(handle) {
  const index = LAMINATE_PRODUCTS.findIndex((product) => product.handle === handle)
  const related = []
  for (let offset = 1; related.length < 4 && offset < LAMINATE_PRODUCTS.length; offset++) {
    const product = LAMINATE_PRODUCTS[(index + offset) % LAMINATE_PRODUCTS.length]
    if (product.handle !== handle) {
      related.push({ handle: product.handle, name: product.name, brand: product.brand, img: product.card })
    }
  }
  return related
}

export default async function LaminateProductPage({ params }) {
  const { handle } = await params
  const product = laminateByHandle(handle)
  if (!product) notFound()
  return <ProductDetail product={product} collection={COLLECTION} related={relatedFor(handle)} />
}
