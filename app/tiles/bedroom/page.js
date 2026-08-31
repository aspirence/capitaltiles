import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { BEDROOM } from '@/components/bedroomData'

export const metadata = {
  title: 'Bedroom Tiles — Timber Look, Matt Stone and Marble Floors | Capital Tiles',
  description:
    'Bedroom tiles in timber looks, soft matt stone and honed marble. Warm, quiet, low-allergen floors supplied and installed across Canberra by Capital Tiles.',
}

const PARAGRAPHS = [
  'Most people never consider tiling a bedroom, and the reason is almost always the same: they picture a cold, hard, echoing room. That is a fair description of a polished tile with nothing else in the space — and a poor description of what is actually on this page. Tiled bedrooms have become common in Canberra for two reasons worth knowing about before you rule them out.',
  'The first is allergies. Carpet holds dust, mite allergen and pet dander down in the pile, and vacuuming lifts only part of it. A tiled floor has nowhere for any of that to sit, and it wipes clean. For anyone in the house with asthma or hay fever, a hard floor in the bedroom does more good than almost any other change you can make to the room.',
  'The second is heating. Tile is the best conductor of the floors we sell, so a bedroom with underfloor heating comes up to temperature evenly and holds it — no cold patch at the foot of the bed, no radiator taking up wall space. Without heating, a rug either side of the bed covers the part of the floor your feet actually land on, and the rest stays easy to clean.',
  'What is on this page is picked with all of that in mind: timber looks in matt for warmth, soft honed stone and travertine for the quiet rooms, and a few marbles for a main bedroom that wants a feature floor. There are no pavers and no external finishes here — those are outdoor formats and they read wrong in a bedroom. Come and see full tiles rather than sample chips in our Mitchell showroom, or book a free measure and quote and we will price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'Is a tiled bedroom actually a good idea?',
    a: 'It is if you have allergies, if you are running underfloor heating, or if the bedroom opens onto an ensuite and you want one floor through both. If none of those apply and the room is a cold south-facing guest bedroom, carpet is honestly the better answer and we will tell you so.',
  },
  {
    q: 'Will it feel cold underfoot?',
    a: 'In a Canberra winter, without heating, yes. Underfloor heating fixes it completely and tile carries that heat better than timber, laminate or carpet. Failing that, a rug on each side of the bed covers the floor your feet meet first thing in the morning, which is most of the problem solved.',
  },
  {
    q: 'Which tile looks warmest in a bedroom?',
    a: 'A matt timber look. It gives you the tone and grain of a board with none of the maintenance, and matt hides dust and footmarks far better than polish. After that, honed travertine and limestone tones — anything soft and warm rather than grey and glossy.',
  },
  {
    q: 'Is tile better than carpet for allergies?',
    a: 'Considerably. Carpet pile traps dust, mite allergen and pet dander, and a vacuum only recovers some of it. There is nowhere for any of that to settle in a tiled floor, and a damp mop removes what is there. It is the change allergy sufferers notice fastest.',
  },
  {
    q: 'Can I run the same tile through the bedroom and ensuite?',
    a: 'Yes, and it makes both rooms feel larger. The one thing to watch is the slip rating: the ensuite floor needs a rating suited to a wet area, so we specify the same range in its matt or textured version there and keep the colour identical across the doorway.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — lifting the old floor, checking and preparing the substrate, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

const RELATED = [
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
  { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
  { label: 'Carpet Ranges', href: '/carpet', img: '/img/spaces/staircase.jpg' },
  { label: 'Timber Flooring', href: '/flooring/timber', img: '/img/flooring/engineered-timber.jpg' },
]

export default function BedroomTilesPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Tiles', href: '/tiles' }}
        heroBg="/img/spaces/bedroom.jpg"
        crumb="Bedroom Tiles"
        title="Bedroom Tiles"
        lede={`${BEDROOM.length} ranges in timber looks, soft matt stone and honed marble — warm, low-allergen floors that suit underfloor heating. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={BEDROOM}
        heading="Bedroom Tiles"
        basePath="/tiles"
        imgPath="/img/all-tiles"
      />
      <CollectionCopy
        heading="Warm underfoot, and nothing for dust to sit in"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Asked before every tiled bedroom"
        faqLede="Nearly every bedroom conversation starts with the same worry — that it will be cold and hard. Heating, finish and where the rugs go are what actually settle it."
        related={RELATED}
        image="/img/copy/tiles-bedroom.jpg"
        imageAlt="A bedroom with a warm matt timber-look tile floor and a rug either side of the bed"
      />
    </>
  )
}
