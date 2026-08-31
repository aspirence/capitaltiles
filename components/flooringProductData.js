/* Every flooring product, in one list.

   The /flooring page grids timber, engineered timber, hybrid, laminate and
   vinyl together, so it needs a single lookup that spans the per-collection
   files rather than one per collection. Each product carries the collection it
   actually belongs to, so the breadcrumb, the "All ..." link and the related
   rail on /flooring/<handle> all point back into that collection's subtree.

   Source of truth stays in the per-collection files; nothing is duplicated
   here.
*/

import { NATURAL_TIMBER_PRODUCTS } from './naturalTimberProductData'
import { ENGINEERED_TIMBER_PRODUCTS } from './engineeredTimberProductData'
import { HYBRID_PRODUCTS } from './hybridProductData'
import { LAMINATE_PRODUCTS } from './laminateProductData'
import { VINYL_PRODUCTS } from './vinylProductData'

const FLOORING_PARENT = { label: 'Flooring', href: '/flooring' }

export const FLOORING_GROUPS = [
  {
    products: NATURAL_TIMBER_PRODUCTS,
    collection: { label: 'Natural Timber', href: '/flooring/timber', parent: FLOORING_PARENT },
  },
  {
    products: ENGINEERED_TIMBER_PRODUCTS,
    collection: { label: 'Engineered Timber', href: '/flooring/engineered-timber', parent: FLOORING_PARENT },
  },
  {
    products: HYBRID_PRODUCTS,
    collection: { label: 'Hybrid Flooring', href: '/flooring/hybrid-flooring', parent: FLOORING_PARENT },
  },
  {
    products: LAMINATE_PRODUCTS,
    collection: { label: 'Laminate Flooring', href: '/flooring/laminate-flooring', parent: FLOORING_PARENT },
  },
  {
    products: VINYL_PRODUCTS,
    collection: { label: 'Vinyl Flooring', href: '/flooring/vinyl', parent: FLOORING_PARENT },
  },
]

const BY_HANDLE = new Map()

/* A board listed under two collections resolves to the first group that holds
   it, so it never ends up with two competing detail pages. */
for (const group of FLOORING_GROUPS) {
  for (const product of group.products) {
    if (BY_HANDLE.has(product.handle)) continue
    BY_HANDLE.set(product.handle, {
      product,
      collection: group.collection,
      siblings: group.products,
      canonical: `${group.collection.href}/${product.handle}`,
    })
  }
}

export const FLOORING_PRODUCTS = [...BY_HANDLE.values()].map((entry) => entry.product)

export function byHandle(handle) {
  return BY_HANDLE.get(handle)
}
