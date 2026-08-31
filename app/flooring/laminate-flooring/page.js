import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { LAMINATE } from '@/components/laminateData'

export const metadata = {
  title: 'Laminate Flooring — Timber Looks in Oak, Blackbutt & Spotted Gum | Capital Tiles',
  description:
    'Laminate flooring in oak, blackbutt, spotted gum and ironbark looks, including water-resistant Hydromate ranges. Supplied and installed across Canberra.',
}

/* The reference product page runs header → filters + grid → long-form copy,
   with no FAQ or related rail, so those props are left off. */
const PARAGRAPHS = [
  'Laminate is the most cost-effective way to put a convincing timber look through a whole house. A high-resolution decor layer sits under a tough melamine wear coat on a dense fibreboard core, and modern printing and embossing have moved on far enough that the grain lines up with the texture you feel under your hand rather than repeating every few boards.',
  'The wear layer is the part that earns its keep. Laminate takes chair legs, pet claws, grit tracked in from the garden and the daily traffic of a hallway better than most surfaces at any price, which is why it still ends up in family homes and rentals long after the trend cycle has moved on.',
  'The range covers oak, blackbutt, spotted gum, ironbark and stone looks in warm and cool tones, and includes water-resistant Hydromate and Hydromate Plus boards for kitchens, laundries and entryways where spills are a matter of when rather than if. Most planks click together over the top of a sound existing floor, so a renovation often needs no demolition at all.',
  'Bring your paint chips and cabinetry samples into our Mitchell showroom and compare full boards under the same light rather than deciding from a 100mm offcut. Or book a free measure and quote: we will check the subfloor, work out the setout and board direction, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'Is laminate flooring waterproof?',
    a: 'Standard laminate is water-resistant rather than waterproof — it will shrug off a spill you wipe up, but standing water can swell the core. Our Hydromate and Hydromate Plus ranges are built for wet-prone rooms, with sealed joints and a treated core that handles kitchens, laundries and entryways.',
  },
  {
    q: 'How does laminate compare to hybrid and vinyl?',
    a: 'Laminate gives the sharpest timber print for the money and is the hardest wearing against scratches. Hybrid is fully waterproof and better for open-plan runs through wet areas. Vinyl is the softest and quietest underfoot. We keep all three in the Mitchell showroom so you can compare them side by side.',
  },
  {
    q: 'Can laminate be laid over an existing floor?',
    a: 'Usually yes. Laminate floats rather than glues down, so it can go over a sound, level existing floor such as tile, vinyl or timber, with an underlay between. Carpet has to come up first. We check level and moisture during the free measure and tell you what preparation is needed.',
  },
  {
    q: 'How long will a laminate floor last?',
    a: 'With normal domestic traffic, a good laminate holds up for well over a decade. The wear coat is what determines it, and the ranges we stock are rated for residential and light commercial use. Felt pads under furniture and a doormat at the entry make more difference than anything else.',
  },
  {
    q: 'How do I clean and look after laminate?',
    a: 'Sweep or vacuum on a hard-floor setting, then damp mop with a well-wrung mop and a pH-neutral cleaner. Avoid steam mops and anything abrasive or wax-based — steam drives moisture into the joints, which is the one thing laminate does not forgive.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the boards for your own trade, or handle the whole job — removing the old floor, preparing the subfloor, laying with underlay, and fitting trims and thresholds. Everything is quoted up front with no hidden costs.',
  },
]

export default function LaminateFlooringPage() {
  return (
    <>
      <CollectionIntro
        compact
        parent={{ label: 'Flooring', href: '/flooring' }}
        crumb="Laminate Flooring"
        title="Laminate Built for Traffic"
        lede={`${LAMINATE.length} ranges of oak, blackbutt, spotted gum and ironbark decors, including water-resistant boards for kitchens and laundries. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={LAMINATE}
        heading="Laminate Flooring"
        basePath="/flooring/laminate-flooring"
        imgPath="/img/laminate"
      />
      <CollectionCopy
        heading="A timber look built for traffic"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Water, wear and what fits where"
        faqLede="Laminate is the floor people compare hardest against hybrid and vinyl, so most questions come down to water, wear and what it can be laid over. Here is what we tell customers before they choose."
        image="/img/copy/flooring-laminate-flooring.jpg"
        imageAlt="A timber-look laminate floor with embossed grain running through a hallway"
      />
    </>
  )
}
