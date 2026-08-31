import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { VINYL } from '@/components/vinylData'

export const metadata = {
  title: 'Vinyl Flooring — Luxury Vinyl Planks & Tiles | Capital Tiles',
  description:
    'Vinyl plank and LVT flooring from 2.0mm to 5.0mm in oak, blackbutt and stone looks — quiet, warm underfoot and fully waterproof. Supplied and installed across Canberra.',
}

/* The reference product page runs header → filters + grid → long-form copy,
   with no FAQ or related rail, so those props are left off. */
const PARAGRAPHS = [
  'Vinyl is the quietest and softest of the timber-look floors. There is no fibreboard or stone core to transmit sound, so footsteps land softly, the room stays warmer underfoot than tile or hybrid, and a dropped glass is far less likely to end in a chip. In a bedroom, a nursery or an upstairs living area, that difference is the whole reason people choose it.',
  'It is also completely waterproof through the body of the plank rather than just at the surface, which makes it a straightforward answer for laundries, bathrooms and kitchens. Thinner glue-down planks follow the shape of the subfloor beneath them, so a slab that is flat and sound gives you a floor with almost no build-up in height — useful when you are matching an existing threshold or working under a fixed door.',
  'The range spans 2.0mm through to 5.0mm across oak, blackbutt, spotted gum and stone looks, in loose lay, glue-down and click formats. Thinner planks suit commercial fit-outs and renovations working to a height limit; the thicker click ranges carry acoustic backing and float over the top of a sound existing floor.',
  'Vinyl is a product you should feel before you commit — come and walk on the planks in our Mitchell showroom and compare them against hybrid and laminate side by side. Or book a free measure and quote: we will check the subfloor for level, advise on preparation, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'What is the difference between vinyl and hybrid flooring?',
    a: 'Both are waterproof. Hybrid has a rigid stone-polymer core, so it feels firmer and bridges small imperfections in the subfloor. Vinyl is more flexible, softer and noticeably quieter underfoot, but it follows the shape of what is beneath it — so the subfloor needs to be flat.',
  },
  {
    q: 'Is vinyl really waterproof?',
    a: 'Yes, through the body of the plank rather than just at the surface. Water will not swell or delaminate it, which makes vinyl a straightforward answer for laundries, bathrooms and kitchens. Sealing at the perimeter still matters, and we handle that as part of installation.',
  },
  {
    q: 'What thickness should I choose?',
    a: 'Thinner planks from 2.0mm to 2.5mm are glue-down, sit almost flush with the existing floor level and suit commercial fit-outs or renovations working under a fixed door. From 4.5mm to 5.0mm you get acoustic backing and a more solid feel underfoot, which is what most homes end up with.',
  },
  {
    q: 'Loose lay, glue-down or click — which one do I need?',
    a: 'Glue-down is the most stable and is what we use over concrete and in commercial spaces. Loose lay suits rooms where you may want to lift a plank later. Click floats over the top of a sound existing floor with no adhesive. We recommend one during the free measure based on your subfloor and room use.',
  },
  {
    q: 'Does vinyl scratch or dent?',
    a: 'Its wear layer handles day-to-day traffic and pet claws well, but because vinyl is softer than laminate or tile it can dent under a heavy point load. Felt pads under furniture legs and wide castors on chairs are the fix, and we supply both.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the planks for your own trade, or handle the whole job — removing the old floor, levelling and preparing the subfloor, laying, and fitting trims and thresholds. Everything is quoted up front with no hidden costs.',
  },
]

export default function VinylFlooringPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Flooring', href: '/flooring' }}
        compact
        crumb="Vinyl Flooring"
        title="Vinyl: Quiet, Warm, Waterproof"
        lede={`${VINYL.length} ranges from 2.0mm to 5.0mm in oak, blackbutt and stone looks, in loose lay, glue-down and click. Soft underfoot and waterproof right through the plank.`}
      />
      <CollectionGrid
        items={VINYL}
        heading="Vinyl Flooring"
        basePath="/flooring/vinyl"
        imgPath="/img/vinyl"
      />
      <CollectionCopy
        heading="Soft, quiet and completely waterproof"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Thickness, backing and subfloors"
        faqLede="Most vinyl decisions come down to thickness, how it is fixed down, and what the subfloor underneath is doing. These are the questions we work through on nearly every vinyl quote."
        image="/img/copy/flooring-vinyl.jpg"
        imageAlt="A warm, quiet timber-look vinyl plank floor in a softly furnished room"
      />
    </>
  )
}
