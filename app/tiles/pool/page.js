import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { POOL } from '@/components/poolData'

export const metadata = {
  title: 'Pool Tiles — Waterline, Coping & Pool Mosaics | Capital Tiles',
  description:
    'Glass pool mosaics, travertine-look coping and 20mm outdoor pavers built for chlorine, salt and frost. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'A pool surround has to cope with more than any other surface on a property — chlorine, salt, sunscreen, UV and Canberra frosts, all while staying safe underfoot when it is wet. Our pool range is specified for exactly that: frost-resistant porcelain and recycled glass mosaics that hold their colour season after season.',
  'For the waterline and interior we stock recycled glass mosaics in blues, greens and blended mixes that shift with the light and give a pool real depth. Around the edge, 20mm pavers and matching bullnose coping deliver a square or pencil-edge finish, so the transition from water to deck reads as one considered surface.',
  'Travertine and stone looks stay comfortable underfoot in full sun where a dark tile would not, and the same ranges usually carry an indoor format — so an alfresco can run straight through to the kitchen floor without a change of character.',
  'Every pool project is different, so we measure on site: waterline band, coping profile, step markers, drainage falls and the slip rating the surround actually needs. Book a free measure and quote and we will price the supply and the installation together, with no hidden costs.',
]

const FAQS = [
  {
    q: 'What makes a tile suitable for a pool?',
    a: 'It needs to be frost-resistant, non-porous and stable against chlorine and salt. Glass mosaics and fully vitrified porcelain both qualify; natural stone and standard ceramic generally do not, because they absorb water and stain.',
  },
  {
    q: 'What slip rating should the pool surround have?',
    a: 'Wet barefoot areas need a higher rating than an indoor floor — we specify R11 or a P5 rated surface around a pool. Our 20mm pavers come in exactly that specification.',
  },
  {
    q: 'What is coping, and do I need it?',
    a: 'Coping is the capping course along the pool edge. It finishes the shell, sheds water away from the pool and gives you a comfortable edge to sit on. We supply square edge, pencil edge and bullnose profiles that match the surrounding paver.',
  },
  {
    q: 'Can glass mosaics be used on the whole pool interior?',
    a: 'Yes. Full-interior glass gives the deepest colour and the most striking finish. Many clients use a mosaic band at the waterline only and a plain interior below, which is more economical and still looks resolved.',
  },
  {
    q: 'Will the tiles handle Canberra frost?',
    a: 'The ranges we stock for outdoor use are frost-rated, which means water absorbed at the surface cannot expand and spall the tile in winter. This is the single most important thing to get right in this climate.',
  },
  {
    q: 'Do you install pool tiling as well as supply it?',
    a: 'Both. We can supply to your pool builder, or handle the tiling and paving ourselves — substrate preparation, waterproofing checks, laying, grouting and sealing, all quoted up front.',
  },
]

const RELATED = [
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
  { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
]

export default function PoolTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Pool Tiles"
        title="Pool Tiles Built for Water, Salt and Sun"
        lede={`Glass pool mosaics, travertine-look coping and 20mm frost-rated pavers across ${POOL.length} collections. Specified for chlorine, salt and Canberra winters, and rated for safe footing around a wet edge — supplied and professionally installed.`}
      />
      <CollectionGrid
        items={POOL}
        heading="Pool Tiles"
        basePath="/tiles/pool"
        imgPath="/img/pool"
      />
      <CollectionCopy
        heading="Waterline mosaics, coping &amp; pool surrounds"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        related={RELATED}
      />
    </>
  )
}
