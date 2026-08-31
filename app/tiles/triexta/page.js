import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { TRIEXTA } from '@/components/triextaData'

export const metadata = {
  title: 'Triexta Carpet — Soft, Stain Resistant Ranges | Capital Tiles',
  description:
    'Australian made triexta carpet in cut pile twist and textured cut and loop, with permanent built-in stain resistance that cleans with cold water. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'Triexta is the newest of the carpet fibres we sell, and the one that changes the most minds. It is partly plant based — a share of the polymer comes from corn sugar rather than petroleum — and the stain resistance is not a coating sprayed on at the end. It is built into the fibre itself, which means it cannot wear off, wash out or be stripped by a cleaner. In practice that is the difference between a carpet you protect and a carpet you simply live on.',
  'The cleaning story is the part people find hard to believe until they see it. Most spills on these ranges lift with cold water and a cloth. No detergent, no solvent, no specialist product. That comes back to the fibre having almost nowhere for a stain to bond, and it is why triexta has become the default recommendation for households with young children, or with a dog that treats the hallway as a racetrack.',
  `Every range in this collection is a Godfrey Hirst carpet made in Australia, and nine of the ten are a cut pile twist — the soft, dense construction most people picture when they think of a bedroom carpet. Natural Artistry is the exception, a textured cut and loop that breaks up the surface and hides day-to-day marks well in a busier room. Across the ${TRIEXTA.length} ranges there are ${TRIEXTA.reduce((n, p) => n + p.colours.length, 0)} colours to choose from, all woven at a 3.66 metre roll width.`,
  'Softness underfoot is the other reason these sell. Ranges like Velvet Appeal, Luxury Appeal and Soft Glow are genuinely plush without going limp, because the fibre keeps its resilience where a soft polyester would flatten. Come and stand on a few in our Mitchell showroom — it is the only way to judge a carpet — or book a free measure and quote and we will talk through underlay, where the seams should fall and taking the old floor away.',
]

const FAQS = [
  {
    q: 'What actually is triexta, and how is it different from nylon?',
    a: 'Triexta is a polymer fibre with part of its content derived from corn sugar rather than petroleum. The practical difference from nylon is where the stain resistance lives: in triexta it is built into the fibre during manufacture, so it is permanent, while most nylons rely on a treatment applied to the surface that depletes over time and with cleaning.',
  },
  {
    q: 'Can I really clean it with just water?',
    a: 'For most household spills, yes — cold water and a clean cloth, blotting rather than rubbing. Every range in this collection is rated cleanable with cold water. For anything oily or long-dried it is worth calling us before you reach for a supermarket product, because the wrong cleaner can leave a residue that attracts dirt.',
  },
  {
    q: 'Is triexta a good choice with pets?',
    a: 'It is one of the better ones. All ten ranges here are rated pet friendly, and the combination of permanent stain resistance and cold-water cleaning covers most of what a dog or cat will do to a floor. It does not make a carpet scratch-proof, so for a heavy chewer or a cat that works the edges we would talk through a loop pile as well.',
  },
  {
    q: 'Which construction should I choose — cut pile twist or textured cut and loop?',
    a: 'Cut pile twist is the soft one: dense, uniform, and the better pick for bedrooms and formal living rooms. Textured cut and loop, which is Natural Artistry here, mixes cut and looped yarn so the surface has more movement, which disguises footprints and vacuum marks in a hallway or family room.',
  },
  {
    q: 'What roll width does it come in, and will my room have a seam?',
    a: 'These ranges are woven at 3.66 metres. Whether that means a seam depends on the shape of the room, not just its width — we measure the whole floor and plan seam placement so joins fall where they are least visible and least walked on. That is part of the free measure and quote.',
  },
  {
    q: 'Is it a sustainable choice?',
    a: 'Partly. The fibre is partly plant based rather than wholly petroleum derived, and these ranges carry Declare Red List Free certification, meaning the manufacturer has disclosed the ingredients and none appear on the Living Building Challenge Red List. Most also hold an ECS Level 4+ environmental certification. Wool remains the natural-fibre option if that is the priority.',
  },
]

const RELATED = [
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/spaces/bedroom.jpg' },
  { label: 'Solution Dyed Nylon', href: '/carpet/solution-dyed-nylon', img: '/img/spaces/livingroom.jpg' },
  { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', img: '/img/spaces/kitchen.jpg' },
  { label: 'All Carpet', href: '/carpet', img: '/img/spaces/outdoor.jpg' },
]

export default function TriextaPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="Triexta"
        title="Triexta Carpet"
        lede={`Australian made triexta in cut pile twist and textured cut and loop — ${TRIEXTA.length} ranges with permanent stain resistance built into the fibre, not sprayed on, so most spills lift with cold water alone. Supplied and professionally installed across Canberra and Queanbeyan.`}
      />
      <CollectionGrid
        items={TRIEXTA}
        heading="Triexta Carpet"
        basePath="/tiles/triexta"
        imgPath="/img/triexta"
      />
      <CollectionCopy
        heading="Stain resistance built into the fibre"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Cleaning, pets and construction"
        faqLede="Triexta is the fibre customers ask the most questions about, mostly because the cold-water cleaning claim sounds too good. Here is what it does, what it does not, and how to choose between the two constructions."
        related={RELATED}
        image="/img/copy/tiles-triexta.jpg"
        imageAlt="A soft dense cut-pile carpet in a warm oat tone filling a sunlit lounge"
      />
    </>
  )
}
