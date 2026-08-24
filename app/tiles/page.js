import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { TILES } from '@/components/tilesData'

export const metadata = {
  title: 'Tiles — Floor, Wall, Pool, Patio & Feature Tiles | Capital Tiles',
  description:
    'The full Capital Tiles range — porcelain, marble, stone and concrete looks in matt, honed, polished and textured finishes, from 75x300mm subway to 750x1500mm panels. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'This is the whole tile range in one place, before you narrow it down by room. Porcelain does most of the work here: it is dense, water-resistant and stable enough to run from a bathroom floor up a feature wall and out onto a patio without changing character, which is why it turns up in nearly every part of the collection.',
  'Across the range you will find marble and travertine looks, limestone and concrete surfaces, timber-look planks, bold stone finishes and glass and marble mosaics. Finishes run matt, honed, satin, polished, lappato and textured — and the finish matters as much as the colour, because it decides how much light the floor throws back and how much grip it gives underfoot.',
  'Formats start at 75x300mm subway and 300x300mm mosaic sheets and run up through 300x600mm and 600x600mm to 600x1200mm and 750x1500mm panels. Larger formats cut down grout lines and make a small room read bigger; smaller formats give you detail, and the extra grout gives you grip where a floor gets wet.',
  'Use the filters to narrow by colour, finish or size, or start from the room instead — bathroom, kitchen, pool, patio and outdoor each have their own page. Everything here is held in our Mitchell showroom so you can see a full sheet rather than a sample chip, and we supply to trade and homeowners alike.',
]

const FAQS = [
  {
    q: 'Where do I start with so many tiles?',
    a: 'Start with the room, not the tile. A bathroom floor, a kitchen splashback and an outdoor patio each rule out most of the range on slip rating and format alone. Tell us the space and we will cut a hundred options down to a handful worth looking at.',
  },
  {
    q: 'What is the difference between matt, honed and polished?',
    a: 'Matt is flat and non-reflective, hides water marks and gives the most grip. Honed is smooth with a soft sheen. Polished is highly reflective and bounces light around a room, but on a floor it is best kept to dry areas. Lappato sits between honed and polished.',
  },
  {
    q: 'Can the same tile go on the floor and the wall?',
    a: 'Often yes, and it is a good way to make a small room feel larger. The floor needs an appropriate slip rating, so we usually pair a matt or honed finish underfoot with the polished version of the same range on the walls.',
  },
  {
    q: 'How do I choose a tile size?',
    a: 'Larger formats mean fewer grout lines and a calmer, more spacious look, which suits most modern rooms. Smaller formats and mosaics are better for feature walls, niches and shower floors where you want detail and grip. Setout matters too, so we plan cuts on site.',
  },
  {
    q: 'Do I need to seal the tiles?',
    a: 'Porcelain does not need sealing. Natural stone and marble do, and so does grout in a wet area. We seal grout on installation and recommend a pH-neutral cleaner rather than anything acidic or abrasive.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — removing the old surface, preparing the substrate, waterproofing checks, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

export default function TilesPage() {
  return (
    <>
      <CollectionIntro
        compact
        parent={{ label: 'Home', href: '/' }}
        crumb="Tiles"
        title="Every Tile We Stock"
        lede={`${TILES.length} ranges of porcelain, marble, stone and concrete looks in matt, honed, polished and textured finishes, from 75x300mm subway to 750x1500mm panels. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={TILES}
        heading="Tiles"
        basePath="/tiles"
        imgPath="/img/all-tiles"
      />
      <CollectionCopy
        heading="One range, every room in the house"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Finish, format and where it goes"
        faqLede="With a range this size the questions are always the same — where to start, which finish belongs where, and what has to be sealed. Here is how we work through it with customers."
      />
    </>
  )
}
