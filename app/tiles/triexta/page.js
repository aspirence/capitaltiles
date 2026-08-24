import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { TRIEXTA } from '@/components/triextaData'

export const metadata = {
  title: 'Triexta Tiles — Floor Tiles for Every Room | Capital Tiles',
  description:
    'Floor tiles in stone, marble, concrete and timber looks — matt, honed and polished, from 300x600mm to 750x1500mm. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'A floor is the largest single surface in any room, so it sets the tone before anything else goes in. This range covers the full spread of looks — soft limestone and travertine, cool concrete, warm timber grains and dramatic marble — all in dense porcelain that holds up to real traffic rather than showroom traffic.',
  'Formats run from 300x600mm through 600x600mm and 600x1200mm up to 750x1500mm panels. The larger the format, the fewer grout lines, and the more a floor reads as one continuous plane — which is the quickest way to make an open-plan living area feel bigger than it is.',
  'Finish matters as much as colour. Matt hides marks and gives grip underfoot, honed sits somewhere in between with a soft sheen, and polished throws light around a room but is best kept away from wet areas. Most ranges carry two or three finishes in the same colour, so you can change the character without changing the palette.',
  'Come and see a full sheet in our Mitchell showroom rather than judging from a sample chip, or book a free measure and quote — we will check the substrate, plan the setout and price supply and installation together.',
]

const FAQS = [
  {
    q: 'What size floor tile should I choose?',
    a: 'Larger formats such as 600x1200mm suit open-plan spaces because they cut down grout lines and make a room read as one surface. Smaller formats give you more setout flexibility in narrow hallways, bathrooms and around fixed joinery.',
  },
  {
    q: 'Matt, honed or polished — which is right for a floor?',
    a: 'Matt is the safest all-rounder: good grip and it hides day-to-day marks. Honed gives a soft sheen with reasonable grip. Polished is beautiful but slippery when wet, so we keep it to dry living areas and walls.',
  },
  {
    q: 'Can the same floor run through the whole house?',
    a: 'Yes, and it is usually the best-looking result. Wet areas just need a finish with an appropriate slip rating — we normally pair a matt version in bathrooms and laundries with the honed or polished version elsewhere.',
  },
  {
    q: 'Do floor tiles need sealing?',
    a: 'Porcelain does not — it is fired dense enough that it does not absorb liquid. The grout is the porous part, and we can seal that on installation and recommend aftercare products.',
  },
  {
    q: 'Can you tile over an existing floor?',
    a: 'Sometimes, depending on what is there and how sound and level it is. We check the substrate on site before quoting; where the existing floor has to come up, removal and preparation are included in the price.',
  },
  {
    q: 'How long does a floor take to install?',
    a: 'Most domestic floors are done in a few days. Larger areas or specialty patterns such as herringbone take longer, and we give you a clear timeline at quoting stage rather than after we start.',
  },
]

const RELATED = [
  { label: 'Wall Tiles', href: '/tiles/wall', img: '/img/spaces/staircase.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
]

export default function TriextaTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Triexta Tiles"
        title="Triexta Floor Tiles for Every Room"
        lede={`Browse ${TRIEXTA.length} floor collections in stone, marble, concrete and timber looks — matt, honed and polished finishes from 300x600mm right up to 750x1500mm panels, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={TRIEXTA}
        heading="Triexta Tiles"
        basePath="/tiles/triexta"
        imgPath="/img/triexta"
      />
      <CollectionCopy
        heading="Floor tiles for living, bedrooms &amp; hallways"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="From sizing to sealing"
        faqLede="Choosing a floor comes down to format, finish and what is already underneath it. Below are the answers we give most often — on sizing, matt versus polished, sealing, tiling over an existing floor and how long a job takes."
        related={RELATED}
      />
    </>
  )
}
