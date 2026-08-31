import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { CARPET } from '@/components/carpetData'

export const metadata = {
  title: 'Carpet — Wool, Triexta, Solution Dyed Nylon, Polyester & Polypropylene | Capital Tiles',
  description:
    'The full Capital Tiles carpet range — wool, Triexta, solution dyed nylon, polyester, polypropylene and DuraTuft, in cut pile, loop and twist. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Carpet comes down to two decisions: the fibre it is made from and the way that fibre is tufted. The fibre decides how it wears, how it cleans and how it holds colour. The construction — cut pile, loop, twist or textured — decides how it feels underfoot and how well it hides a traffic lane.',
  'Wool is the natural fibre, and its crimp acts like a spring, so the pile recovers instead of flattening. Solution dyed nylon has the pigment locked into the fibre as it is made, so it does not fade in sunlight and survives bleach-based cleaning — which makes it the go-to for hallways, stairs and homes with kids or pets.',
  'Polyester is soft and takes colour deeply, and its near-non-absorbent fibre shrugs off water-based spills, though it flattens sooner than nylon in a busy hallway. Polypropylene does not absorb water at all, so it cleans up easily in a rumpus room, but it marks more readily from oil-based spills. Triexta and DuraTuft sit between the two on softness and resilience.',
  'Colour and texture are hard to judge from a photograph — pile depth changes completely under a room light. Come and see full-width samples in our Mitchell showroom, or book a free measure and quote: we will measure the rooms, work out the roll direction and joins, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'Which carpet fibre lasts longest in a busy house?',
    a: 'Solution dyed nylon. Nylon is the most resilient carpet fibre, and solution dyeing locks the colour into the strand so it does not fade or bleach out. For a hallway, stairs or a family living room it is the safest choice we stock.',
  },
  {
    q: 'Is wool worth the extra?',
    a: 'If you want the feel and the recovery, yes — wool springs back rather than flattening, it is naturally flame-resistant and it takes dye with a depth synthetics struggle to match. If the budget will not stretch, a good solution dyed nylon is the sensible alternative rather than a cheaper wool.',
  },
  {
    q: 'Cut pile or loop pile?',
    a: 'Cut pile is softer and warmer underfoot and suits bedrooms and lounges. Loop pile is tighter and harder wearing, so it holds up better in a hallway or under office chairs. Twist and textured constructions sit in between and are the best at hiding footprints and vacuum marks.',
  },
  {
    q: 'How do I deal with a spill?',
    a: 'Blot, do not rub — rubbing pushes the spill into the base of the pile. Work from the outside in with cold water and a pH-neutral cleaner. Never use chlorine or oxygen bleach on wool: it is a protein fibre and bleach will damage it permanently.',
  },
  {
    q: 'Will the joins show?',
    a: 'In most rooms, no. Broadloom comes in fixed roll widths, so on a large or unusually shaped floor a join is sometimes unavoidable. We plan the roll direction so any join lands where furniture or traffic makes it least visible, and we tell you before we lay, not after.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the carpet for your own trade, or handle the whole job — lifting the old floor, checking and preparing the subfloor, fitting underlay and smoothedge, laying and finishing. Everything is quoted up front with no hidden costs.',
  },
]

export default function CarpetPage() {
  return (
    <>
      <CollectionIntro
        compact
        parent={{ label: 'Home', href: '/' }}
        crumb="Carpet"
        title="Carpet, Fibre by Fibre"
        lede={`${CARPET.length} ranges across wool, Triexta, solution dyed nylon, polyester, polypropylene and DuraTuft, in cut pile, loop and twist. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={CARPET}
        heading="Carpet"
        basePath="/carpet"
        imgPath="/img/all-carpet"
      />
      <CollectionCopy
        heading="The fibre decides how it wears"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Fibre, pile and wear"
        faqLede="Nearly every carpet decision comes back to two things — what the fibre is and how it is tufted. These are the questions that sort it out."
        image="/img/copy/carpet.jpg"
        imageAlt="A close view of carpet pile in natural tones, raking light picking out the texture"
      />
    </>
  )
}
