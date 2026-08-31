import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { BATHROOM } from '@/components/bathroomData'

export const metadata = {
  title: 'Bathroom Tiles — Wall & Floor Tiles for Bathrooms | Capital Tiles',
  description:
    'Premium bathroom wall and floor tiles in matt, honed and polished finishes — marble, stone and concrete looks from 75x300mm to 750x1500mm. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'The tiles you choose for a bathroom shape the mood of the whole room, and they have to survive water, steam and daily traffic while they do it. Our bathroom range is built around high-density porcelain that is dense, water-resistant and stable enough to run from the floor up the walls and into the shower without changing character.',
  'Across the collections you will find marble looks, limestone and travertine tones, soft concrete surfaces and bold stone finishes — in matt, honed, satin and polished. Formats run from 75x300mm subway through 300x600mm and 600x600mm up to 600x1200mm and 750x1500mm large panels, so you can cut down grout lines in a small ensuite or make a feature wall out of a single slab-look sheet.',
  'Every range is held in our Mitchell showroom so you can see a full sheet rather than a sample chip, and compare a floor tile against the wall tile you are considering under the same light. We supply to trade and homeowners alike, and our own installers can take care of removal, substrate preparation, laying, grouting and sealing.',
  'Not sure where to start? Book a free measure and quote — we will visit the site, measure accurately, talk through slip ratings and maintenance, and give you a clear price with no obligation.',
]

const FAQS = [
  {
    q: 'How do I choose the right size for bathroom wall tiles?',
    a: 'Large formats such as 600x1200mm give a clean, spacious look with fewer grout lines, which suits most modern bathrooms. Smaller formats like 75x300mm subway or 300x300mm mosaics are better for feature walls, niches and shower floors where you want detail and grip.',
  },
  {
    q: 'Which tiles are safe for a shower or wet area floor?',
    a: 'Look for a slip rating suited to wet areas — we stock R10 and R11 rated porcelain, plus mosaics whose extra grout lines add grip underfoot. Our team will confirm the right rating for your layout during the free measure and quote.',
  },
  {
    q: 'Can I use the same tile on the floor and the walls?',
    a: 'Often yes, and it is a good way to make a small bathroom feel larger. The floor tile needs an appropriate slip rating, so we usually pair a matt or honed finish underfoot with the polished version of the same range on the walls.',
  },
  {
    q: 'What is the difference between matt, honed and polished?',
    a: 'Matt has a flat, non-reflective surface and hides water marks well. Honed is smooth with a soft sheen. Polished is highly reflective and bounces light around a room, but is best kept to walls in a bathroom.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — removing the old surface, preparing the substrate, waterproofing checks, laying and grouting. Everything is quoted up front with no hidden costs.',
  },
  {
    q: 'How do I look after bathroom tiles and grout?',
    a: 'Clean with a pH-neutral cleaner rather than anything acidic or abrasive. We can seal grout on installation and recommend aftercare products to keep it looking fresh.',
  },
]

const RELATED = [
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
  { label: 'Bedroom Tiles', href: '/tiles/bedroom', img: '/img/spaces/bedroom.jpg' },
]

export default function BathroomTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Bathroom Tiles"
        title="Bathroom Tiles Design to Transform Your Space"
        lede={`Discover premium bathroom tiles for walls and floors across ${BATHROOM.length} collections that balance elegance and everyday performance. Capital Tiles stocks matt, honed and polished finishes in whites, greys, beiges and charcoals, with marble, stone and concrete-inspired textures — supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={BATHROOM}
        heading="Bathroom Tiles"
        basePath="/tiles/bathroom"
        imgPath="/img/bathroom"
      />
      <CollectionCopy
        heading="High-performance bathroom &amp; ensuite tiles"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Sizing, slip and grout"
        faqLede="Bathrooms ask more of a tile than any other room, so these are the questions we field most often — sizing, safe footing in the shower, the difference between matt, honed and polished, and keeping grout looking fresh."
        related={RELATED}
        image="/img/copy/tiles-bathroom.jpg"
        imageAlt="A modern bathroom finished in large-format marble-look porcelain, floor and shower wall"
      />
    </>
  )
}
