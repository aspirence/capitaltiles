import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { NATURAL_TIMBER } from '@/components/naturalTimberData'

export const metadata = {
  title: 'Natural Timber Flooring — Oak, Spotted Gum & Ironbark Boards | Capital Tiles',
  description:
    'Natural timber flooring in oak, spotted gum and ironbark tones, in plank and herringbone. 15mm and 20mm boards with brushed, limed and matt finishes. Supplied and installed across Canberra.',
}

/* The reference product page runs header → filters + grid → long-form copy,
   with a FAQ block, matching the other flooring collections. */
const PARAGRAPHS = [
  'Natural timber is the floor everything else is measured against. Each board is cut from real hardwood, so the grain, the knots and the colour shift from plank to plank in a way no printed decor layer reproduces — and that variation is the point. It is why a timber floor still looks considered twenty years after it went down.',
  'The range runs from soft whites and limed greys through warm beiges and clay tones to deep browns and near-black charcoals. Boards come in long 1900x190mm and wide 2200x240mm formats for open-plan rooms, and in shorter 600x120mm and 600x90mm blocks for herringbone and chevron setouts where the pattern is the feature.',
  'Finish changes the room as much as colour does. A brushed surface opens the grain and hides day-to-day marks, limed boards lift a dark species into something lighter, and matt lacquers keep the floor quiet under strong light. Most boards here carry a UV-cured lacquer, which is what lets a natural timber take a family and a dog without constant attention.',
  'Timber is worth seeing at full board length before you commit — colour reads differently across a room than it does on a sample. Come into our Mitchell showroom and walk on it, or book a free measure and quote: we will check the subfloor for level and moisture, work out the setout and board direction, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'How is natural timber different from engineered timber?',
    a: 'Natural timber boards are solid hardwood or carry a thick sawn wear layer, so the grain runs deep into the board. Engineered timber bonds a real timber layer to a cross-laid core for extra stability. Both look like timber underfoot; engineered handles moisture swings better, natural gives you more sanding life.',
  },
  {
    q: 'Can natural timber be sanded and re-coated?',
    a: 'Yes, and that is its main advantage. Depending on board thickness you can usually sand and re-coat several times over the life of the floor, so scratches, traffic lanes and even a change of colour can be dealt with without replacing anything.',
  },
  {
    q: 'What is the difference between plank and herringbone?',
    a: 'Plank is the long straight board — it stretches a room and is quicker to lay. Herringbone uses the shorter 600mm blocks set at an angle, which turns the floor itself into the feature. Herringbone takes more labour and more waste allowance, so we price it separately during quoting.',
  },
  {
    q: 'Which finish should I choose?',
    a: 'Brushed opens the grain and hides everyday marks, so it suits a busy house. Matt keeps the surface quiet under downlights and large windows. Limed lightens a darker species. We keep samples of each in the showroom so you can compare them under the same light.',
  },
  {
    q: 'How does timber cope with Canberra winters?',
    a: 'Canberra swings from frosty mornings to very dry summer afternoons, and timber moves with that. We check subfloor moisture before laying, leave the right expansion gaps at the perimeter, and let the boards acclimatise on site first. Done properly, seasonal movement stays where it belongs — under the skirting.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the boards for your own trade, or handle the whole job — removing the old floor, checking the subfloor, acclimatising and laying the boards, and fitting trims and thresholds. Everything is quoted up front with no hidden costs.',
  },
]

export default function NaturalTimberPage() {
  return (
    <>
      <CollectionIntro
        compact
        parent={{ label: 'Flooring', href: '/flooring' }}
        crumb="Natural Timber"
        title="Natural Timber, Real Grain"
        lede={`${NATURAL_TIMBER.length} ranges of solid hardwood boards in oak, spotted gum and ironbark tones, in plank and herringbone. Brushed, limed and matt finishes — supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={NATURAL_TIMBER}
        heading="Natural Timber"
        basePath="/flooring/timber"
        imgPath="/img/natural-timber"
      />
      <CollectionCopy
        heading="Boards cut from the tree, not printed"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Grain, finish and setout"
        faqLede="Timber raises questions the printed floors do not — how often it can be re-sanded, how it moves through a Canberra winter, and what herringbone really costs to lay. Here is where we usually start."
        image="/img/copy/flooring-timber.jpg"
        imageAlt="A solid Australian hardwood floor with grain, knots and colour shifting plank to plank"
      />
    </>
  )
}
