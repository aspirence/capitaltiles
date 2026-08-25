import { KITCHEN } from './kitchenData'
import { BATHROOM_PRODUCTS } from './bathroomProductData'

/* Most kitchen ranges are also suitable for bathrooms, so reuse their verified
   gallery/specification records instead of maintaining two copies that can
   drift apart. Kitchen-only ranges fall back to their collection image and the
   live variant endpoint fills in their selectable combinations. */
const bathroomByHandle = new Map(BATHROOM_PRODUCTS.map((product) => [product.handle, product]))

export const KITCHEN_PRODUCTS = KITCHEN.map((item) => {
  const shared = bathroomByHandle.get(item.handle)
  const card = `/img/kitchen/${item.handle}.jpg`
  const rooms = shared?.rooms || []
  const kitchenRoom = { label: 'Kitchen Tiles', href: '/tiles/kitchen' }

  return {
    ...(shared || {}),
    handle: item.handle,
    name: item.name,
    brand: item.brand,
    card,
    images: shared?.images?.length ? shared.images : [card],
    liveGallery: true,
    colours: item.colours || shared?.colours || [],
    sizes: item.sizes || shared?.sizes || [],
    finishes: item.finishes || shared?.finishes || [],
    short: item.blurb,
    overview: shared?.overview || [item.blurb],
    features: shared?.features || [],
    thickness: shared?.thickness || [],
    slip: shared?.slip || [],
    material: shared?.material || [],
    specCols: shared?.specCols || [],
    specRows: shared?.specRows || [],
    rooms: [kitchenRoom, ...rooms.filter((room) => room.href !== kitchenRoom.href)],
    seoTitle: `${item.name} Kitchen Tiles | Capital Tiles`,
    seoDesc: item.blurb,
  }
})

export function kitchenByHandle(handle) {
  return KITCHEN_PRODUCTS.find((product) => product.handle === handle)
}
