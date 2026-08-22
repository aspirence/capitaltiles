import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { WALL } from '@/components/wallData'

export const metadata = {
  title: 'Wall Tiles — Feature Walls, Splashbacks & Bathrooms | Capital Tiles',
  description:
    'Wall tiles in subway, mosaic, marble and stone looks — gloss, matt and textured finishes for splashbacks, bathrooms and feature walls. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Walls are where a room gets its personality. A floor can be quiet and let everything else do the talking, but a splashback, a shower surround or a feature wall is at eye level and gets looked at every day — so texture, gloss and the way light moves across the surface all matter more.',
  'The range covers classic subway and brick formats, mosaics in glass and stone, fluted and three-dimensional profiles that throw shadow, and large-format marble and stone looks that can cover a shower wall in one or two sheets with almost no grout to keep clean.',
  'Finish drives the effect. Gloss bounces light and makes a small bathroom or galley kitchen feel brighter. Matt is quieter and more contemporary. Textured and fluted profiles read as a material rather than a tile, which is what you want on a feature wall behind a bath or a bedhead.',
  'Many of these ranges have a matching floor tile, so a bathroom or kitchen can be specified as one coordinated set rather than two separate decisions. Come and see them at full sheet size in our Mitchell showroom, or book a free measure and quote.',
]

const FAQS = [
  {
    q: 'Can I use a floor tile on the wall?',
    a: 'Almost always yes — a floor tile is stronger than it needs to be for a wall. The reverse is not true: wall tiles are thinner and not rated for foot traffic, so they must never go on a floor.',
  },
  {
    q: 'Gloss or matt for a bathroom wall?',
    a: 'Gloss reflects light and makes a small bathroom feel larger and brighter, which is why it is the traditional choice. Matt is softer and more contemporary, and hides water spotting better in a hard-water area.',
  },
  {
    q: 'What is the best tile for a kitchen splashback?',
    a: 'Anything easy to wipe and heat-tolerant. Subway and mosaic formats suit a classic look; a single large-format sheet behind the cooktop gives a seamless finish with barely any grout to clean.',
  },
  {
    q: 'Do fluted and 3D tiles work in a shower?',
    a: 'They can, though the profile catches more soap residue than a flat tile. We usually recommend keeping textured profiles to a feature wall outside the wet zone, and using the flat version of the same range inside the shower.',
  },
  {
    q: 'How do I stop grout discolouring on a wall?',
    a: 'Use a pH-neutral cleaner rather than anything acidic, and let the wall dry properly — an extractor fan does more for grout than any product. We seal grout on installation and can recommend aftercare.',
  },
  {
    q: 'Can you match wall tiles to my floor?',
    a: 'Yes. A lot of these collections have a matching floor format in the same colour and texture, so the two surfaces relate to each other instead of competing. Our team will pair them for you during the quote.',
  },
]

const RELATED = [
  { label: 'Triexta Tiles', href: '/tiles/triexta', img: '/img/spaces/bedroom.jpg' },
  { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
]

export default function WallTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Wall Tiles"
        title="Wall Tiles for Splashbacks and Feature Walls"
        lede={`Explore ${WALL.length} wall collections — subway and brick formats, glass and stone mosaics, fluted profiles and large-format marble looks in gloss, matt and textured finishes. Supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={WALL}
        heading="Wall Tiles"
        basePath="/tiles/wall"
        imgPath="/img/wall"
      />
      <CollectionCopy
        heading="Splashbacks, shower walls &amp; feature surfaces"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        related={RELATED}
      />
    </>
  )
}
