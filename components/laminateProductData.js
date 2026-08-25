import { LAMINATE } from './laminateData'

export const LAMINATE_PRODUCTS = LAMINATE.map((item) => ({
  ...item,
  card: `/img/laminate/${item.handle}.jpg`,
  images: [`/img/laminate/${item.handle}.jpg`],
  liveGallery: true,
  productType: 'laminate',
  tagline: 'Timber character with a durable, easy-care surface for everyday living.',
  short: '',
  overview: [],
  features: [],
  thickness: [],
  slip: [],
  material: ['Laminate flooring'],
  specCols: [],
  specRows: [],
  rooms: [
    { label: 'Living areas', href: '/flooring/laminate-flooring' },
    { label: 'Bedrooms', href: '/flooring/laminate-flooring' },
    { label: 'Hallways', href: '/flooring/laminate-flooring' },
    { label: 'Home offices', href: '/flooring/laminate-flooring' },
  ],
  seoTitle: `${item.name} Laminate Flooring | Capital Tiles`,
  seoDesc: `${item.name} laminate flooring by ${item.brand}. Explore available finishes, gallery images and project suitability at Capital Tiles Canberra.`,
}))

export function laminateByHandle(handle) {
  return LAMINATE_PRODUCTS.find((product) => product.handle === handle)
}
