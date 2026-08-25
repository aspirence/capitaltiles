import { HYBRID } from './hybridData'

export const HYBRID_PRODUCTS = HYBRID.map((item) => ({
  ...item,
  card: `/img/hybrid/${item.handle}.jpg`,
  images: [`/img/hybrid/${item.handle}.jpg`],
  liveGallery: true,
  productType: 'hybrid',
  tagline: 'Waterproof performance with the warmth and character of timber.',
  short: '',
  overview: [],
  features: [],
  thickness: [],
  slip: [],
  material: ['Rigid-core hybrid flooring'],
  specCols: [],
  specRows: [],
  rooms: [
    { label: 'Living areas', href: '/flooring/hybrid-flooring' },
    { label: 'Kitchens', href: '/flooring/hybrid-flooring' },
    { label: 'Bedrooms', href: '/flooring/hybrid-flooring' },
    { label: 'Home offices', href: '/flooring/hybrid-flooring' },
  ],
  seoTitle: `${item.name} Hybrid Flooring | Capital Tiles`,
  seoDesc: `${item.name} hybrid flooring by ${item.brand}. Explore available colours, specifications and project suitability at Capital Tiles Canberra.`,
}))

export function hybridByHandle(handle) {
  return HYBRID_PRODUCTS.find((product) => product.handle === handle)
}
