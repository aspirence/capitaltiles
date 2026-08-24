import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { FLOOR_TILES } from '@/components/floorTilesData'

export const metadata = {
  title: 'Floor Tiles — Porcelain, Marble, Stone & Concrete Looks | Capital Tiles',
  description:
    'Floor tiles in marble, stone, concrete and terrazzo looks — matt, honed, polished and lappato finishes from 600x600mm up to large-format panels. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'A floor tile has a harder job than anything on the wall. It carries furniture, grit off the street, chair legs and everything anyone drops in the kitchen, and it has to keep doing it without chipping, staining or turning into a skating rink when it is wet. That is why nearly everything in this range is porcelain — dense, low-porosity and rated to take the traffic.',
  'The looks run from Calacatta and Carrara marble through limestone and travertine, into soft concrete and cement surfaces, terrazzo, and stone with real movement through it. Finishes matter as much as colour underfoot: matt hides marks and gives the most grip, honed is smooth with a soft sheen, and lappato and polished bounce light around a room but belong in dry areas.',
  'Formats start around 600x600mm and run up through 600x1200mm to large-format panels. Bigger tiles mean fewer grout lines and a calmer floor, which is what makes a modest room read larger. The trade-off is that a large tile needs a flatter substrate, so levelling is part of the quote rather than an afterthought.',
  'Come and see a full tile rather than a sample chip — pattern and movement only make sense at full size, and the same tile reads differently under a downlight than it does in a showroom window. Book a free measure and quote and we will check the substrate, talk through slip ratings for each room, and price supply and installation together.',
]

const FAQS = [
  {
    q: 'What slip rating does a floor tile need?',
    a: 'It depends on the room. Dry interior floors have no formal requirement, but wet areas, entries and anything that gets tracked in from outside want a matt or textured surface with a rating suited to bare or wet feet. We confirm the right rating for each room during the free measure rather than applying one rule to the whole house.',
  },
  {
    q: 'Will a polished floor be too slippery?',
    a: 'In a dry living or dining room it is fine, and it is the finish that gives you that reflective, open look. In a bathroom, laundry, entry or anywhere water lands, we would steer you to matt, honed or lappato instead. A lot of ranges offer the same colour in more than one finish, so you can have polished where it works and matt where it has to.',
  },
  {
    q: 'How big a tile can I use in a small room?',
    a: 'Larger than most people expect. Fewer grout lines make a small floor read as one surface rather than a grid, so a 600x600mm or even 600x1200mm tile usually makes a compact room feel bigger, not smaller. The limit is practical — cuts around fixtures and the substrate flatness, both of which we check on site.',
  },
  {
    q: 'Does the floor need to be levelled first?',
    a: 'Almost always to some degree, and the larger the tile the flatter it has to be. A slab that looks fine can still have enough fall in it to leave a large tile lipping at the edges. We check level at the measure and include any levelling in the quote so it is not a surprise once the old floor comes up.',
  },
  {
    q: 'Do floor tiles need sealing?',
    a: 'Porcelain does not. Natural stone and unglazed surfaces do, and grout benefits from it in any area that gets wet or dirty. We seal grout on installation where it makes sense and recommend a pH-neutral cleaner — acidic and abrasive products are what dull a floor over time.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — removing the old floor, preparing and levelling the substrate, setting out, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

const RELATED = [
  { label: 'Wall Tiles', href: '/tiles/wall', img: '/img/spaces/bathroom.jpg' },
  { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/spaces/outdoor.jpg' },
  { label: 'Pavers', href: '/tiles/pavers', img: '/img/pavers/chiswick-paver-collection.jpg' },
  { label: 'Mosaic Tiles', href: '/tiles/mosaic', img: '/img/mosaic/carrara-mosaic.jpg' },
]

export default function FloorTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Floor Tiles"
        title="Floor Tiles Built for the Traffic"
        lede={`${FLOOR_TILES.length} ranges of porcelain in marble, stone, concrete and terrazzo looks, in matt, honed, polished and lappato finishes from 600x600mm up to large-format panels — supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={FLOOR_TILES}
        heading="Floor Tiles"
        basePath="/tiles/floor-tiles"
        imgPath="/img/floor-tiles"
      />
      <CollectionCopy
        heading="The surface that takes the most punishment"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Grip, format and substrate"
        faqLede="Floor tiles come down to three practical questions — how much grip the room needs, how large a format the space can carry, and how flat the substrate underneath actually is."
        related={RELATED}
      />
    </>
  )
}
