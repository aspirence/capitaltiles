import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { POLYPROPYLENE } from '@/components/polypropyleneData'

export const metadata = {
  title: 'Polypropylene Carpet — Stain and Moisture Resistant | Capital Tiles',
  description:
    'Polypropylene carpet in high-low, textured and chunky loop piles. A fibre that does not absorb water, so spills clean up easily — ideal for rumpus rooms and rentals. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Polypropylene is the one carpet fibre that does not drink. Wool and nylon take moisture into the fibre itself, which is where a stain gets its grip; polypropylene simply does not absorb water, so a spilt drink sits on top of the pile instead of soaking down into it. The colour is another part of the story. Polypropylene cannot be dyed the usual way, so pigment goes in while the fibre is still molten and ends up locked all the way through it — which leaves a water-based spill with nothing to bond to. Blot, rinse with clean water, blot again, and most marks leave with the water.',
  'Because the fibre suits it, nearly everything in this range is built as a loop. Enforcer 4M, Campaspe, Callisto and Riviera are high-low loops, where the difference in pile height creates a quiet pattern that hides everyday traffic. Ovation and Forest Park are textured loops that read plainer and calmer underfoot, and Astra is a chunky Australian-made loop for a room that can carry more texture. Alongside them sit the EC Carpets ranges — Encounter, Montrosa, Savanna, Summit Point and Woodchester — with six to eight colours apiece.',
  'The palettes are worth a look on their own. One side of the range names its colours after stone and weather — Warmstone, Basalt, Siltstone, Pumice, Storm Grey, Nimbus, Gunmetal — and lands on the cool greys and greiges most Canberra homes are being painted around. The other side goes bush and alpine: Rivergum, Candlebark, Coolibah, Wattle and Applebush in Savanna, Feathertop, Howitt, Hotham and Franklin in Summit Point. Between the two you can go almost charcoal or almost sand without leaving the fibre.',
  'What polypropylene does not have is the memory that nylon has. It is a less resilient fibre, so in the places you walk most — the line from the front door to the kitchen, the top and bottom of the stairs, the arc a dining chair swings through — the pile will lie down over time and stay down. Loops cope with this far better than cut piles, and the high-low patterns disguise a lot of it, but we would rather say so now than have you notice it in year three. That is why this fibre earns its keep in rumpus rooms, bedrooms, home offices, granny flats and rental properties rather than down the busiest spine of a family home. Come and walk on a few in our Mitchell showroom, or book a free measure and quote and we will price it properly for the rooms you have in mind.',
]

const FAQS = [
  {
    q: 'Why is polypropylene so good with stains?',
    a: 'Two things working together. The fibre does not absorb water, so a spill stays on the surface of the pile rather than wicking down into it, and the colour is set into the fibre during manufacture rather than dyed onto it afterwards, so a water-based stain has nothing to bond to. Blot up what you can, rinse with clean water, blot again — cordial, tea, wine and mud usually come away with very little drama.',
  },
  {
    q: 'Will it flatten where we walk?',
    a: 'In the busy lanes, yes, and it is fair to expect it. Polypropylene does not spring back after a footfall the way nylon does, so a walked line will eventually settle and show. The loop constructions in this range hold their shape much better than a cut pile would, and the high-low patterns break up the look of it — but if the carpet is going down a hallway that gets constant traffic, we will point you at solution dyed nylon rather than talk you into this.',
  },
  {
    q: 'What about oily marks?',
    a: 'This is the honest weak point. The same chemistry that keeps water out gives the fibre an appetite for oil, so cooking grease, butter, makeup and shoe polish are harder work than anything water-based. Deal with them while they are fresh, lift as much as you can with a blunt edge before anything wet goes near it, and use a solvent spotter rather than more water. An oily mark left to sit will also start collecting soil, which is usually what people actually notice.',
  },
  {
    q: 'Which rooms does it suit?',
    a: 'Rumpus rooms, bedrooms, guest rooms, home offices, granny flats, and rentals and investment properties where the floor has to be easy to clean and straightforward to replace between tenants. It is also a sensible choice for a lower level or a room that catches a bit of damp, since the fibre itself takes up no moisture and gives mildew nothing to feed on in the pile.',
  },
  {
    q: 'How should it be cleaned, and can it be steam cleaned?',
    a: 'Vacuum regularly and deal with spills while they are still wet — that is most of the job. Hot water extraction is fine for a deeper clean, but polypropylene softens at a lower temperature than nylon or wool, so it should be done by someone who knows to keep the heat sensible. For the same reason, lift heavy furniture rather than dragging it across the floor: friction on a low-melt fibre can leave a glazed mark that will not brush out.',
  },
  {
    q: 'Do you supply only, or supply and install?',
    a: 'Both. We can cut and supply the carpet for your own installer, or handle the whole job from Mitchell — lifting the old floor, checking and preparing the subfloor, supplying underlay, laying, joining and finishing off. The measure and quote is free and covers the lot, across Canberra, Queanbeyan, Yass, Bungendore, Murrumbateman and the surrounding towns.',
  },
]

const RELATED = [
  {
    label: 'Solution Dyed Nylon',
    href: '/carpet/solution-dyed-nylon',
    img: '/img/solution-dyed-nylon/district-loft.jpg',
  },
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/wool/cotswolds.jpg' },
  { label: 'Polyester Carpet', href: '/carpet/polyester', img: '/img/polyester/dolomites.jpg' },
  { label: 'DuraTuft Carpet', href: '/carpet/duratuft', img: '/img/duratuft/modern-appeal.jpg' },
]

export default function PolypropyleneCarpetPage() {
  return (
    <>
      <CollectionIntro
        crumb="Polypropylene"
        title="Polypropylene Carpet for Rooms That Get Used"
        lede={`A fibre that does not absorb water, so spills sit on the surface and clean up with very little fuss. Browse ${POLYPROPYLENE.length} high-low, textured and chunky loop pile ranges in stone, weather and bush colours — supplied and professionally installed across Canberra.`}
        parent={{ label: 'Carpet', href: '/carpet' }}
      />
      <CollectionGrid
        items={POLYPROPYLENE}
        heading="Polypropylene Carpet"
        basePath="/carpet/polypropylene"
        imgPath="/img/polypropylene"
      />
      <CollectionCopy
        heading="A fibre that will not take up water"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Spills, traffic lanes and honest limits"
        faqLede="Polypropylene is easy to like and easy to oversell, so here is the straight version — what it genuinely shrugs off, where it gives ground, and how to keep it looking right."
        related={RELATED}
      />
    </>
  )
}
