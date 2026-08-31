/* Every carpet product, in one list.

   The /carpet page grids the whole range — all six fibres together — so it
   needs a single lookup that spans the per-fibre files rather than one per
   collection. Each product carries the collection it actually belongs to, so
   the breadcrumb, the "All ..." link and the related rail on /carpet/<handle>
   all point back into that fibre's subtree.

   Source of truth stays in the per-fibre files; nothing is duplicated here.
*/

import { WOOL_PRODUCTS } from './woolProductData'
import { NYLON_PRODUCTS } from './nylonProductData'
import { POLYESTER_PRODUCTS } from './polyesterProductData'
import { POLYPROPYLENE_PRODUCTS } from './polypropyleneProductData'
import { DURATUFT_PRODUCTS } from './duratuftProductData'
import { TRIEXTA_PRODUCTS } from './triextaProductData'

const CARPET_PARENT = { label: 'Carpet', href: '/carpet' }

/* Triexta sits under /tiles/triexta rather than /carpet/triexta — that is where
   its collection page was built — but it is a carpet fibre and its parent crumb
   is Carpet, so it belongs in this list like the rest. */
export const CARPET_GROUPS = [
  {
    products: WOOL_PRODUCTS,
    collection: { label: 'Wool Carpet', href: '/carpet/wool', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
  {
    products: NYLON_PRODUCTS,
    collection: { label: 'Solution Dyed Nylon', href: '/carpet/solution-dyed-nylon', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
  {
    products: POLYESTER_PRODUCTS,
    collection: { label: 'Polyester Carpet', href: '/carpet/polyester', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
  {
    products: POLYPROPYLENE_PRODUCTS,
    collection: { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
  {
    products: DURATUFT_PRODUCTS,
    collection: { label: 'Duratuft Carpet', href: '/carpet/duratuft', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
  {
    products: TRIEXTA_PRODUCTS,
    collection: { label: 'Triexta', href: '/tiles/triexta', sizeLabel: 'Roll width', parent: CARPET_PARENT },
  },
]

/* Handles are unique across the fibres today; if a range is ever listed under
   two of them the first group wins, so a product never resolves to two pages. */
const BY_HANDLE = new Map()

for (const group of CARPET_GROUPS) {
  for (const product of group.products) {
    if (BY_HANDLE.has(product.handle)) continue
    BY_HANDLE.set(product.handle, { product, collection: group.collection, siblings: group.products })
  }
}

export const CARPET_PRODUCTS = [...BY_HANDLE.values()].map((entry) => entry.product)

export function byHandle(handle) {
  return BY_HANDLE.get(handle)
}
