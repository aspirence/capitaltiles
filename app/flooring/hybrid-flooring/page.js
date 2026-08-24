import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { HYBRID } from '@/components/hybridData'

export const metadata = {
  title: 'Hybrid Flooring Collection — 100% Waterproof Rigid Core | Capital Tiles',
  description:
    'Hybrid flooring in oak, blackbutt and spotted gum looks — 100% waterproof rigid core planks from 6.5mm to 9mm, with acoustic underlay. Supplied and installed across Canberra.',
}

/* The reference product page runs header → filters + grid → long-form copy,
   with no FAQ or related rail, so those props are left off. */
const PARAGRAPHS = [
  'Hybrid flooring is the answer to the one thing timber and laminate could never handle: water. A rigid stone-polymer core sits under a printed decor layer and a tough wear coat, so a spilled glass, a leaking dishwasher or a wet dog does not swell the plank or lift the edges the way a moisture-sensitive floor would.',
  'That waterproof core is why hybrid has become the default for open-plan Australian homes — it is the only timber-look floor you can run continuously from the living room through the kitchen and into the laundry without changing product. It is dimensionally stable too, which matters in Canberra where a room can swing thirty degrees between a winter morning and a summer afternoon.',
  'The range covers oak, blackbutt, spotted gum and walnut looks across 6.5mm, 7mm and 9mm thicknesses. Thicker boards feel more solid underfoot and carry better acoustic underlay; thinner boards suit a renovation where you are matching an existing threshold height. Most planks click together over the top of a sound existing floor, so there is often no demolition at all.',
  'Come and walk on the boards in our Mitchell showroom — hybrid is one of those products where the feel underfoot decides it. Or book a free measure and quote: we will check the subfloor for level, work out the setout and board direction, and price supply and installation together with no hidden costs.',
]

export default function HybridFlooringPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Flooring', href: '/flooring' }}
        compact
        crumb="Hybrid Flooring"
        title="Hybrid Flooring, Built Waterproof"
        lede={`${HYBRID.length} ranges of 100% waterproof rigid-core planks in oak, blackbutt and spotted gum, from 6.5mm to 9mm with acoustic underlay. One floor that runs right through the house.`}
      />
      <CollectionGrid
        items={HYBRID}
        heading="Hybrid Flooring"
        basePath="/flooring/hybrid-flooring"
        imgPath="/img/hybrid"
      />
      <CollectionCopy
        heading="Waterproof hybrid planks for every room"
        paragraphs={PARAGRAPHS}
      />
    </>
  )
}
