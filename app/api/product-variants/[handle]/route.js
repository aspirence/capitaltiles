import { NextResponse } from 'next/server'

/* Keep the rebuilt product pages in sync with the existing catalogue variants.
   Only the small public Shopify product JSON is read; pricing/customer data is
   neither requested nor returned. */
export async function GET(_request, { params }) {
  const { handle } = await params

  if (!/^[a-z0-9-]+$/.test(handle)) {
    return NextResponse.json({ variants: [] }, { status: 400 })
  }

  try {
    const response = await fetch(`https://capitaltiles.com.au/products/${handle}.js`, {
      next: { revalidate: 86400 },
    })
    if (!response.ok) throw new Error(`Catalogue returned ${response.status}`)

    const product = await response.json()
    const optionIndex = (pattern) => (product.options || []).findIndex((option) =>
      pattern.test(typeof option === 'string' ? option : option.name))
    const colourIndex = optionIndex(/colou?r/i)
    const sizeIndex = optionIndex(/size/i)
    const finishIndex = optionIndex(/finish|finished/i)
    const images = (product.images || []).map((image) =>
      typeof image === 'string' ? image : image.src).filter(Boolean)
    const variants = (product.variants || []).map((variant) => ({
      colour: colourIndex >= 0 ? (variant.options?.[colourIndex] || '') : '',
      size: sizeIndex >= 0 ? (variant.options?.[sizeIndex] || '') : '',
      finish: finishIndex >= 0 ? (variant.options?.[finishIndex] || '') : '',
      available: variant.available !== false,
      imagePosition: variant.featured_image?.position || null,
    }))

    /* A number of legacy products publish several colours but leave Shopify's
       featured_image empty (Petra Mix Paver is one example). Prefer an image
       explicitly mapped to the same colour; if the catalogue has no mapping at
       all, give each colour a stable, distinct gallery image in published order
       so changing a colour never appears broken. */
    const colours = [...new Set(variants.map((variant) => variant.colour).filter(Boolean))]
    const mappedByColour = new Map()
    variants.forEach((variant) => {
      if (variant.colour && variant.imagePosition && !mappedByColour.has(variant.colour)) {
        mappedByColour.set(variant.colour, variant.imagePosition)
      }
    })
    variants.forEach((variant) => {
      if (variant.imagePosition || !variant.colour) return
      const colourPosition = mappedByColour.get(variant.colour)
      if (colourPosition) {
        variant.imagePosition = colourPosition
      } else if (colours.length > 1 && images.length > 1) {
        variant.imagePosition = (colours.indexOf(variant.colour) % images.length) + 1
      }
    })

    return NextResponse.json({ variants, images })
  } catch {
    // The local product page remains fully usable if the legacy catalogue is
    // temporarily unavailable; it simply keeps the current gallery image.
    return NextResponse.json({ variants: [], images: [] })
  }
}
