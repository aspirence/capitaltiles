import { notFound } from 'next/navigation'
import ProductDetail from '@/components/sections/ProductDetail'
import { KITCHEN_PRODUCTS, kitchenByHandle } from '@/components/kitchenProductData'

const COLLECTION = { label: 'Kitchen Tiles', href: '/tiles/kitchen' }

export function generateStaticParams() {
  return KITCHEN_PRODUCTS.map((product) => ({ handle: product.handle }))
}

export async function generateMetadata({ params }) {
  const { handle } = await params
  const product = kitchenByHandle(handle)
  if (!product) return { title: 'Product not found | Capital Tiles' }
  return {
    title: product.seoTitle,
    description: product.seoDesc,
    alternates: { canonical: `/tiles/kitchen/${product.handle}` },
  }
}

function relatedFor(handle) {
  const index = KITCHEN_PRODUCTS.findIndex((product) => product.handle === handle)
  const related = []
  for (let offset = 1; related.length < 4 && offset < KITCHEN_PRODUCTS.length; offset++) {
    const product = KITCHEN_PRODUCTS[(index + offset) % KITCHEN_PRODUCTS.length]
    if (product.handle !== handle) {
      related.push({
        handle: product.handle,
        name: product.name,
        brand: product.brand,
        img: product.card,
      })
    }
  }
  return related
}

export default async function KitchenProductPage({ params }) {
  const { handle } = await params
  const product = kitchenByHandle(handle)
  if (!product) notFound()

  return (
    <ProductDetail
      product={product}
      collection={COLLECTION}
      related={relatedFor(product.handle)}
    />
  )
}
