import ComingSoon, { titleFromSlug } from '@/components/sections/ComingSoon'
import ProductDetail from '@/components/sections/ProductDetail'
import { CARPET_PRODUCTS, byHandle } from '@/components/carpetProductData'

export function generateStaticParams() {
  return CARPET_PRODUCTS.map((p) => ({ handle: p.handle }))
}

/* The same range is also reachable under its fibre — /carpet/wool/caribbean —
   which is the deeper, more specific URL, so that one is canonical and this
   whole-collection view points at it. */
export async function generateMetadata({ params }) {
  const { handle } = await params
  const entry = byHandle(handle)
  /* Not a product: this route sits in front of the catch-all, so it has to
     answer for every /carpet/<something> address the site links to. */
  if (!entry) return { title: titleFromSlug([handle]) + ' — Capital Tiles' }
  const { product, collection } = entry
  return {
    title: product.seoTitle,
    description: product.seoDesc,
    alternates: { canonical: `${collection.href}/${product.handle}` },
  }
}

/* Four other ranges from the same fibre, taken from the position after this one
   so every product shows a different set rather than the same four. */
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

export default async function CarpetProductPage({ params }) {
  const { handle } = await params
  const entry = byHandle(handle)
  if (!entry) return <ComingSoon slug={['carpet', handle]} />

  return (
    <ProductDetail
      product={entry.product}
      collection={entry.collection}
      related={relatedFor(entry.product.handle, entry.siblings)}
    />
  )
}
