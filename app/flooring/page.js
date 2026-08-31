import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { FLOORING } from '@/components/flooringData'

export const metadata = {
  title: 'Flooring — Hybrid, Laminate, Engineered Timber, Natural Timber & Vinyl | Capital Tiles',
  description:
    'The full Capital Tiles flooring range — waterproof hybrid, hard-wearing laminate, engineered and natural timber, and quiet vinyl planks. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Five kinds of floor sit in this range, and the honest way to choose between them is to work out what the room has to survive rather than which one photographs best. Water, traffic, noise and subfloor level decide it far more often than colour does.',
  'Hybrid has a rigid waterproof core, so it is the only timber-look floor you can run continuously from the living room through the kitchen and into the laundry. Laminate gives the sharpest timber print for the money and the hardest wearing surface against scratches. Vinyl is the softest and quietest underfoot and is waterproof right through the plank.',
  'Engineered timber puts a real hardwood wear layer over a cross-bonded core, which holds it flat through Canberra temperature swings that would cup a solid board. Natural timber is the real thing all the way down — the most character, the most sanding life, and the most attention needed in a dry summer.',
  'The only reliable way to pick is to stand on them. All five are laid out in our Mitchell showroom so you can walk from one to the next in the same light. Or book a free measure and quote and we will check the subfloor for level and moisture, tell you what preparation is needed, and price supply and installation together.',
]

const FAQS = [
  {
    q: 'Hybrid, laminate or vinyl — which should I choose?',
    a: 'Hybrid if water is the concern and you want one floor through wet and dry areas. Laminate if you want the sharpest timber look and the toughest surface for the money. Vinyl if quiet and soft underfoot matter most, such as a bedroom or an upstairs living area.',
  },
  {
    q: 'What is the difference between engineered and natural timber?',
    a: 'Both give you a real timber surface. Natural timber is solid through the board, so it has the most character and the most sanding life. Engineered bonds a timber wear layer to a cross-laid core, which resists the cupping and gapping that Canberra dry summers cause in solid boards.',
  },
  {
    q: 'Can a new floor go over the existing one?',
    a: 'Usually yes for floating floors — hybrid, laminate and click vinyl go over a sound, level surface such as tile, timber or existing vinyl, with an underlay between. Carpet has to come up first. We check level and moisture during the free measure and tell you what preparation is needed.',
  },
  {
    q: 'Which floors are genuinely waterproof?',
    a: 'Hybrid and vinyl are waterproof through the body of the plank. Water-resistant laminate handles spills you wipe up but not standing water. Timber, engineered or natural, is not a wet-area floor. We will steer you away from a product that will not survive the room.',
  },
  {
    q: 'How long does an installation take?',
    a: 'Most homes are done in a few days once the subfloor is ready. Preparation is the variable — levelling a slab, removing an old floor or waiting out moisture can add time. We give you a clear timeline at quoting rather than at the start of the job.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the boards for your own trade, or handle the whole job — removing the old floor, preparing and levelling the subfloor, laying, and fitting trims and thresholds. Everything is quoted up front with no hidden costs.',
  },
]

export default function FlooringPage() {
  return (
    <>
      <CollectionIntro
        compact
        parent={{ label: 'Home', href: '/' }}
        crumb="Flooring"
        title="Five Floors, One Showroom"
        lede={`${FLOORING.length} ranges across waterproof hybrid, hard-wearing laminate, engineered and natural timber, and quiet vinyl planks. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={FLOORING}
        heading="Flooring"
        basePath="/flooring"
        imgPath="/img/all-flooring"
      />
      <CollectionCopy
        heading="Pick the floor for the room, not the photo"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Water, wear and subfloors"
        faqLede="Choosing between five floor types comes down to a handful of practical questions — what gets wet, what gets walked on, and what is already underneath. These are the ones we answer most."
        image="/img/copy/flooring.jpg"
        imageAlt="Floor board samples side by side showing their edge profiles and core construction"
      />
    </>
  )
}
