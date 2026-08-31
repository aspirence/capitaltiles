/* Every tile product, in one list.

   The /tiles page grids the whole range together, so it needs a single lookup
   that spans the per-collection files rather than one per collection. Each
   product carries the collection it actually belongs to, so the breadcrumb, the
   "All ..." link and the related rail on /tiles/<handle> all point back into
   that collection's subtree.

   Source of truth stays in the per-collection files; nothing is duplicated
   here. Group order is the priority used when a range is listed under more than
   one collection — the most specific collection wins, and Wall Tiles, which
   nearly everything is also listed under, comes last.
*/

import { PAVER_PRODUCTS } from './paversProductData'
import { POOL_PRODUCTS } from './poolProductData'
import { MOSAIC_PRODUCTS } from './mosaicProductData'
import { PATIO_PRODUCTS } from './patioProductData'
import { FLOOR_TILE_PRODUCTS } from './floorTilesProductData'
import { BATHROOM_PRODUCTS } from './bathroomProductData'
import { KITCHEN_PRODUCTS } from './kitchenProductData'
import { WALL_PRODUCTS } from './wallProductData'
import { TILES_EXTRA_PRODUCTS } from './tilesExtraProductData'

const TILES_PARENT = { label: 'Tiles', href: '/tiles' }

export const TILE_GROUPS = [
  {
    products: PAVER_PRODUCTS,
    collection: { label: 'Pavers', href: '/tiles/pavers', parent: TILES_PARENT },
  },
  {
    products: POOL_PRODUCTS,
    collection: { label: 'Pool Tiles', href: '/tiles/pool', parent: TILES_PARENT },
  },
  {
    products: MOSAIC_PRODUCTS,
    collection: { label: 'Mosaic Tiles', href: '/tiles/mosaic', parent: TILES_PARENT },
  },
  {
    products: PATIO_PRODUCTS,
    collection: { label: 'Patio Tiles', href: '/tiles/patio', parent: TILES_PARENT },
  },
  {
    products: FLOOR_TILE_PRODUCTS,
    collection: { label: 'Floor Tiles', href: '/tiles/floor-tiles', parent: TILES_PARENT },
  },
  {
    products: BATHROOM_PRODUCTS,
    collection: { label: 'Bathroom Tiles', href: '/tiles/bathroom', parent: TILES_PARENT },
  },
  {
    products: KITCHEN_PRODUCTS,
    collection: { label: 'Kitchen Tiles', href: '/tiles/kitchen', parent: TILES_PARENT },
  },
  {
    products: WALL_PRODUCTS,
    collection: { label: 'Wall Tiles', href: '/tiles/wall', parent: TILES_PARENT },
  },
]

const BY_HANDLE = new Map()

/* A range listed under several collections resolves to the first group that
   holds it, so it never ends up with two competing detail pages. */
for (const group of TILE_GROUPS) {
  for (const product of group.products) {
    if (BY_HANDLE.has(product.handle)) continue
    BY_HANDLE.set(product.handle, {
      product,
      collection: group.collection,
      siblings: group.products,
      /* The range has its own page under the collection, and that deeper URL is
         the canonical one. */
      canonical: `${group.collection.href}/${product.handle}`,
    })
  }
}

/* The four ranges with no collection of their own. They are only reachable at
   /tiles/<handle>, so that URL is their canonical one. Riverstone borrows the
   Outdoor Tiles crumb, which has a collection page but no product pages, so it
   gets no related rail rather than a rail of dead links. */
const EXTRA_COLLECTIONS = {
  riverstone: {
    collection: { label: 'Outdoor Tiles', href: '/tiles/outdoor', parent: TILES_PARENT },
    siblings: [],
  },
}
const EXTRA_DEFAULT = {
  collection: { label: 'Floor Tiles', href: '/tiles/floor-tiles', parent: TILES_PARENT },
  siblings: FLOOR_TILE_PRODUCTS,
}

for (const product of TILES_EXTRA_PRODUCTS) {
  if (BY_HANDLE.has(product.handle)) continue
  const { collection, siblings } = EXTRA_COLLECTIONS[product.handle] || EXTRA_DEFAULT
  BY_HANDLE.set(product.handle, {
    product,
    collection,
    siblings,
    canonical: `/tiles/${product.handle}`,
  })
}

export const TILE_PRODUCTS = [...BY_HANDLE.values()].map((entry) => entry.product)

export function byHandle(handle) {
  return BY_HANDLE.get(handle)
}
