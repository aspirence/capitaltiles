import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { TIMBER } from '@/components/timberData'

export const metadata = {
  title: 'Engineered Timber Flooring — Oak, Blackbutt & Spotted Gum | Capital Tiles',
  description:
    'Engineered timber flooring in oak, blackbutt, spotted gum and Tasmanian oak — 12mm to 15mm planks with a real timber wear layer. Supplied and installed across Canberra.',
}

/* The reference product page runs header → filters + grid → long-form copy,
   with no FAQ or related rail, so those props are left off. */
const PARAGRAPHS = [
  'Engineered timber gives you a genuine hardwood surface without the movement that solid boards bring with them. A real timber wear layer sits over a cross-bonded plywood or hardwood core, so the plank keeps the grain, the colour variation and the feel of the species it is cut from, while the core underneath holds it flat.',
  'That stability matters more in Canberra than almost anywhere else in the country. A living room can swing thirty degrees between a winter morning and a summer afternoon, and the dry inland air pulls moisture out of a solid board until the edges cup or gap. A cross-bonded core moves far less through that cycle, which is why engineered boards are the sensible choice for a home with big windows or hydronic heating.',
  'The range runs from 12mm through to 15mm across European oak, blackbutt, spotted gum and Tasmanian oak, in natural, brushed and limed finishes. Wider and longer boards make an open-plan room read as one continuous floor rather than a series of strips, and the thicker wear layers can be sanded and re-coated years down the track instead of replaced.',
  'Come and walk on the boards in our Mitchell showroom — with timber the feel underfoot and the way the grain catches the light decide it, and neither shows up in a photograph. Or book a free measure and quote: we will check the subfloor for level and moisture, work out the setout and board direction, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'What is the difference between engineered timber and solid hardwood?',
    a: 'Both give you a real timber surface. A solid board is one piece of hardwood through its full thickness; an engineered board has a genuine timber wear layer bonded to a cross-laid core. You get the same grain and feel underfoot, but the core holds the board flat through changes in temperature and humidity.',
  },
  {
    q: 'Will engineered timber move in Canberra’s climate?',
    a: 'Far less than a solid board. Canberra swings from frosty mornings to dry summer afternoons, and that cycle is what makes solid timber cup, gap or crown. The cross-bonded core in an engineered plank resists that movement, which is why we recommend it for homes with large windows, slab floors or hydronic heating.',
  },
  {
    q: 'Can engineered timber be sanded and re-coated?',
    a: 'Yes, provided the wear layer is thick enough. Our 14mm and 15mm boards carry a wear layer that can usually take two or three light sands over the life of the floor, so scratches and traffic lanes can be brought back rather than replaced. We will tell you the wear layer thickness for any range you are considering.',
  },
  {
    q: 'Can I lay engineered timber in a kitchen or laundry?',
    a: 'A kitchen is generally fine with prompt spill clean-up. For a laundry, bathroom or anywhere water sits, we would steer you to hybrid or vinyl instead — engineered timber is water-resistant at the surface, not waterproof through the board.',
  },
  {
    q: 'Does engineered timber work over underfloor heating?',
    a: 'In most cases yes, and it performs better than solid timber because the core is dimensionally stable. There are limits on board width, glue type and how quickly the system may be brought up to temperature, so tell us at quoting stage and we will confirm what suits your setup.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the boards for your own trade, or handle the whole job — removing the old floor, checking the subfloor for level and moisture, laying, and fitting trims and thresholds. Everything is quoted up front with no hidden costs.',
  },
]

export default function EngineeredTimberPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Flooring', href: '/flooring' }}
        compact
        crumb="Engineered Timber"
        title="Real Timber, Engineered Flat"
        lede={`${TIMBER.length} ranges from 12mm to 15mm in oak, blackbutt, spotted gum and Tasmanian oak. Genuine hardwood over a cross-bonded core, so it keeps the grain without the cupping.`}
      />
      <CollectionGrid
        items={TIMBER}
        heading="Engineered Timber"
        basePath="/flooring/engineered-timber"
        imgPath="/img/timber"
      />
      <CollectionCopy
        heading="Real timber, engineered to stay flat"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Wear layers and movement"
        faqLede="Timber raises questions no other floor does — how much it moves, how often it can be re-sanded, and where it should not go. These are the ones Canberra homeowners and builders put to us most."
        image="/img/copy/flooring-engineered-timber.jpg"
        imageAlt="A wide-plank engineered oak floor with a cut edge showing the wear layer over its core"
      />
    </>
  )
}
