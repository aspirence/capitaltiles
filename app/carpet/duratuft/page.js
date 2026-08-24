import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { DURATUFT } from '@/components/duratuftData'

export const metadata = {
  title: 'DuraTuft Carpet — Godfrey Hirst Soft PET Ranges | Capital Tiles',
  description:
    'DuraTuft carpet from Godfrey Hirst — soft PET in cut pile twists, dense plush and flecked neutrals across six ranges. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'DuraTuft® is not a fibre. It is the name Godfrey Hirst gives the yarn behind these ranges, and what sits underneath that name is soft PET — a fine-filament polyester spun for handle rather than bulk. Worth knowing when you are comparing quotes, because two carpets can both be described as polyester and feel nothing like each other on the floor. Every range on this page comes from Godfrey Hirst, and Murano is made in Australia.',
  'The useful thing about PET is that it does not take up water the way an absorbent fibre does. Tea, wine and the drink that goes over at a party tend to sit on the surface long enough to be blotted rather than soaking down into the pile, and because that comes from the polymer itself it is not a topical treatment that thins out under a traffic lane. Highbury Place is built around exactly that combination — wear, stain and fade resistance in the one carpet.',
  'The six ranges differ more in construction and colour than in anything else. Modern Appeal is a cut pile twist, so the yarn is twisted and set to hold its point, which is the finish that copes best with a hallway. Capri is a dense cut pile named for the Italian coast — Positano, Amalfi Coast, Marina Grande, Sorrento — and Murano is the cloud-soft one, its twelve colours borrowed from Venetian glass in Liquid Light, Milk Glass and Aventurine. Serina and Modern Appeal share the same thirteen-colour palette, while Highbury Place and Kensington hold the quiet end with stipple and heather neutrals from Bone Stipple and Whisper Grey through to Dark Matter, and a flecked colour is still the oldest trick there is for hiding a traffic lane.',
  'Soft carpet is one of those products you have to put your hand on, so come and feel the difference between Capri and Kensington in our Mitchell showroom rather than choosing from a photograph. Or book a free measure and quote — we lift and take away the old floor covering, check and prepare the subfloor, and price the underlay alongside the carpet rather than as an afterthought, because a good underlay is most of what keeps a soft cut pile feeling soft. Supply only is fine too if you already have an installer.',
]

const FAQS = [
  {
    q: 'Is DuraTuft® a fibre?',
    a: 'No — it is the Godfrey Hirst brand name for their soft PET yarn, and PET is a polyester. Carpets carrying the DuraTuft® name are all built on that yarn, which is why they share a soft handle and the easy-clean behaviour polyester is known for, even where the ranges look and feel quite different from one another.',
  },
  {
    q: 'How does it handle spills?',
    a: 'PET does not readily absorb water, so most household spills sit on top of the pile long enough for you to lift them. Blot with a clean white cloth working from the outside of the spill inwards, use as little water as you can so nothing wicks back up out of the backing, and resist scrubbing — rubbing a soft cut pile does more lasting harm than the spill would.',
  },
  {
    q: 'Will a soft carpet stand up to a hallway?',
    a: 'That comes down to construction more than fibre. A cut pile twist such as Modern Appeal has the yarn twisted and set so it holds its point in a traffic lane, and the stipple colours in Highbury Place and Kensington disguise shading and footprints. Keep the plushest cut piles — Capri and Murano — for bedrooms and lounges, where they get to be soft rather than hard-working.',
  },
  {
    q: 'Will it fade in the Canberra sun?',
    a: 'Polyester holds its colour well against UV, and fade resistance is one of the things Highbury Place is designed around. In a room with a big run of north-facing glass we would still suggest a blind or a sheer, and moving the furniture around occasionally — sensible for any floor covering, carpet or timber.',
  },
  {
    q: 'How does it compare with wool or nylon?',
    a: 'Wool has its own natural resilience and a particular way with warmth and moisture. Solution dyed nylon is the tougher choice where traffic is heavy and recovery from crushing matters most. Soft PET is where you go when softness underfoot and straightforward cleaning are the priority. We keep all three on the floor at Mitchell so you can walk on them one after the other.',
  },
  {
    q: 'Do you install, or can I buy the carpet only?',
    a: 'Both. We can supply the roll for your own installer, or handle the whole job — removing the old floor covering, subfloor preparation, underlay, laying and joining, and aftercare advice once you are living on it. The measure and quote is free, and we cover Canberra, Queanbeyan, Yass, Bungendore, Murrumbateman and the surrounding districts.',
  },
]

const RELATED = [
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/wool/regency-twist.jpg' },
  {
    label: 'Solution Dyed Nylon',
    href: '/carpet/solution-dyed-nylon',
    img: '/img/solution-dyed-nylon/comfort-touch.jpg',
  },
  { label: 'Polyester Carpet', href: '/carpet/polyester', img: '/img/polyester/penny-lane.jpg' },
  {
    label: 'Polypropylene Carpet',
    href: '/carpet/polypropylene',
    img: '/img/polypropylene/riviera.jpg',
  },
]

export default function DuraTuftCarpetPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="DuraTuft"
        title="DuraTuft Carpet by Godfrey Hirst"
        lede={`DuraTuft® is the Godfrey Hirst yarn name rather than a fibre of its own — a fine-filament soft PET that stays soft underfoot and lets most spills sit on the surface instead of soaking in. These ${DURATUFT.length} ranges run from cut pile twists to dense plush, with 67 colours between them, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={DURATUFT}
        heading="DuraTuft Carpet"
        basePath="/carpet/duratuft"
        imgPath="/img/duratuft"
      />
      <CollectionCopy
        heading="Soft PET, and what it does underfoot"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Fibre, wear and cleaning"
        faqLede="DuraTuft® raises a different set of questions to a wool or a nylon — what the yarn actually is, how it behaves when something goes over on it, and which of the six ranges belongs in a hallway. Here is what we tell people in the showroom."
        related={RELATED}
      />
    </>
  )
}
