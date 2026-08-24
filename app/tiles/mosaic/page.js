import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { MOSAIC } from '@/components/mosaicData'

export const metadata = {
  title: 'Mosaic Tiles — Marble, Glass & Stone Mosaics | Capital Tiles',
  description:
    'Mosaic tiles for feature walls, splashbacks, niches and shower floors — marble herringbone, glass, gloss and textured sheets. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Mosaics are what you reach for when a room needs a detail rather than a field. Because the pieces are small and come pre-mounted on mesh sheets, they follow curves and steps that a large-format tile cannot, which is why they end up in shower floors, niches, splashbacks and the one wall you want people to notice.',
  'That extra grout also does real work underfoot. A mosaic floor has many more joints per square metre than a 600x600mm tile, and every one of those joints adds grip — which is exactly what a shower base or a wet-area floor needs. It is the simplest way to lift slip resistance without changing the look you were after.',
  'Across the range you will find Carrara marble in herringbone and stacked linear sheets, gloss and textured glass, and handmade-look ceramics in greens, whites and warm neutrals. Sheet sizes sit around 300x300mm, so they are straightforward to set out, cut around tapware and finish neatly into a corner.',
  'Mosaics are hard to judge from a photograph — the glaze, the depth and the way light moves across the surface only read in person. Come and see full sheets in our Mitchell showroom, or book a free measure and quote and we will work out sheet counts, grout colour and where the cuts should land.',
]

const FAQS = [
  {
    q: 'Where do mosaic tiles work best?',
    a: 'Shower floors, niches, splashbacks and feature walls. Anywhere you want grip underfoot, a detail that draws the eye, or a surface that has to follow a curve or a fall to a waste — mosaics do all three better than a large tile can.',
  },
  {
    q: 'Do mosaics give better grip in a shower?',
    a: 'Yes. The extra grout joints between the small pieces break up the surface and give your foot something to hold, which is why mosaics are a common choice for shower bases. We will still confirm the slip rating for the specific sheet during the free measure and quote.',
  },
  {
    q: 'Are mosaics harder to install?',
    a: 'They take more setting out than a plain tile, but they arrive pre-mounted on mesh sheets rather than piece by piece. The skill is in keeping the sheet joints invisible and cutting neatly around tapware and corners, which is exactly the part our installers handle.',
  },
  {
    q: 'How much more grout will I have to clean?',
    a: 'More than a large-format floor, which is the trade-off for the grip and the look. We seal the grout on installation and recommend a pH-neutral cleaner — with that in place a mosaic floor is no harder to keep than any other tiled surface.',
  },
  {
    q: 'Can I use marble mosaics in a wet area?',
    a: 'Yes, with sealing. Natural marble is porous, so it needs a penetrating sealer before grouting and a re-seal every few years. If you would rather not maintain it, we can show you a porcelain or glass mosaic that gives a similar look with no sealing at all.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the sheets for your own trade, or handle the whole job — substrate preparation, waterproofing checks, setting out, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

export default function MosaicTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Mosaic"
        title="Mosaic Tiles for Feature Walls and Wet Areas"
        lede={`Small-format sheets that go where a large tile cannot — shower floors, niches, splashbacks and feature walls. These ${MOSAIC.length} ranges cover Carrara marble herringbone, gloss and textured glass, and handmade-look ceramics, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={MOSAIC}
        heading="Mosaic Tiles"
        basePath="/tiles/mosaic"
        imgPath="/img/mosaic"
      />
      <CollectionCopy
        heading="Detail, grip and the wall people notice"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Grip, grout and setting out"
        faqLede="Mosaics raise a different set of questions to a plain floor tile — where they belong, how much grout you are signing up for, and what has to be sealed. Here is what we tell customers before they commit."
      />
    </>
  )
}
