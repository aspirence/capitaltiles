import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { WOOL } from '@/components/woolData'

export const metadata = {
  title: 'Wool Carpet — Pure Wool Loop & Twist Ranges | Capital Tiles',
  description:
    'Pure wool carpet in level loop, chunky textured loop and cut pile twist, including Australian made and New Zealand wool ranges and 4 metre widths. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'Wool is the only carpet fibre we sell that was grown rather than extruded, and the difference shows in the way it behaves underfoot. Every strand carries a natural crimp, a fine coil that works like a spring, so the pile pushes back when you stand on it and lifts again when the lounge finally gets moved. That is why a wool hallway still looks like a hallway after a few years, where a synthetic in the same spot tends to lie down and stay down as a traffic lane.',
  'The range covers the full spread of wool constructions. Level loops such as Caribbean and Trinidad give a tight, quiet surface that suits hallways and stairs. Chunky textured loops — Chatsworth, Montrose, Vintage Grace and Tranquil Texture — pebble the floor and hide day-to-day marks well. Cut pile twists like Queenstwist, Bellavista, Regency Twist and Grand Luxury are the soft ones for bedrooms and formal living rooms. Patterned loops such as Pebble Grid, Cotswolds, Elmsford and Dawson Falls put a quiet geometry into a floor without asking anything of the colour scheme.',
  'Because wool is a protein fibre, dye bonds into the strand rather than sitting on the surface, and it takes a colour with a depth synthetics work hard to imitate. It also lets a mill blend several dyed shades into one yarn, which is why these palettes read as living colour rather than one flat tone — the earthy Bakewell and Devonshire in Chatsworth, the heathered Berber neutrals running through Hause, the Tweed, Calico and Burlap of Vintage Grace, or the deeper Jarrah and Merbau in Queenstwist. Carramar, Pebble Grid and Ravine also come in 4 metre widths, which takes seams out of wider Canberra living rooms.',
  'The fibre earns its keep through a Canberra winter. Crimped wool traps a great deal of still air, so it slows heat escaping through a slab, and it absorbs and releases moisture as the room changes rather than feeling clammy or bone dry. It is naturally flame-resistant as well, tending to char and put itself out instead of melting. Come and stand on a few in our Mitchell showroom, or book a free measure and quote and we will talk through underlay, removing the old floor and where the seams should fall.',
]

const FAQS = [
  {
    q: 'Why does wool cost more than a synthetic carpet?',
    a: 'Because the fibre is farmed, scoured, spun and dyed rather than extruded, and there is only so much of it. You pay more up front, and the fair way to weigh that is across the life of the floor: wool holds its pile and its colour for longer, so it stays presentable for longer. If the budget will not stretch, we would rather put you into a good solution-dyed nylon than a thin wool.',
  },
  {
    q: 'Is it normal for a new wool carpet to shed?',
    a: 'Yes. Short fibres left over from spinning and tufting work their way to the surface for the first few months, and cut pile twists shed more than loops. Regular vacuuming clears it and it settles on its own. Wool can also fuzz or felt in heavy traffic lanes, where moisture and friction make the fibre scales lock together — a loop pile, a quality underlay and keeping the floor dry all reduce it. Trim a sprouted tuft with scissors rather than pulling it.',
  },
  {
    q: 'What should I never use to clean wool carpet?',
    a: 'Anything with bleach in it. Chlorine and oxygen bleaches attack the protein in the fibre and will strip or yellow the colour permanently, and strongly alkaline cleaners do much the same damage. Blot spills straight away with a clean cloth, work from the outside of the mark inwards, and use cool water or a pH-neutral wool-safe cleaner. Ask us at handover and we will point you at the products we trust.',
  },
  {
    q: 'Does wool actually make a room warmer?',
    a: 'It makes a room feel warmer, which is the part you notice. The crimped fibre holds a lot of still air, so less heat leaves through the floor, and wool buffers humidity by taking up and giving back moisture as conditions change. On a frosty Canberra morning a wool bedroom floor is a very different thing to step onto than tile or a floating floor.',
  },
  {
    q: 'Is wool naturally flame-resistant?',
    a: 'Wool carries moisture and nitrogen within the fibre and has a high ignition temperature, so it is difficult to set alight, and it tends to char and self-extinguish rather than melt and drip the way a synthetic can. No carpet is fireproof. If you need documented test data for a build, a body corporate or an insurer, ask us and we will get it from the supplier for the specific range.',
  },
  {
    q: 'Loop or cut pile twist — which wool suits a busy house?',
    a: 'Loops such as Caribbean, Sirocco and Bahamas hold their surface best in hallways, on stairs and anywhere shoes stay on, and they resist the fuzzing a cut pile can develop. Twists like Bellavista and Grand Luxury are softer and warmer to sit on, so they belong in bedrooms and living rooms. Plenty of Canberra houses run one of each, and we can keep the colour consistent across both.',
  },
]

const RELATED = [
  { label: 'Solution Dyed Nylon', href: '/carpet/solution-dyed-nylon', img: '/img/solution-dyed-nylon/bordeaux.jpg' },
  { label: 'Duratuft Carpet', href: '/carpet/duratuft', img: '/img/duratuft/kensington.jpg' },
  { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', img: '/img/polypropylene/woodchester.jpg' },
  { label: 'Polyester Carpet', href: '/carpet/polyester', img: '/img/polyester/dolomites.jpg' },
]

export default function WoolCarpetPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="Wool"
        title="Wool Carpet"
        lede={`Pure wool in level loops, chunky textures and cut pile twists — ${WOOL.length} ranges that spring back underfoot, take colour with real depth and hold their warmth through a Canberra winter. Supplied and professionally installed across Canberra and Queanbeyan.`}
      />
      <CollectionGrid
        items={WOOL}
        heading="Wool Carpet"
        basePath="/carpet/wool"
        imgPath="/img/wool"
      />
      <CollectionCopy
        heading="A fibre with a spring in it"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Cost, care and cold mornings"
        faqLede="Wool asks a little more of you than a synthetic — more money up front and more care over what you clean it with — and gives back resilience, warmth and colour that lasts. Here is what we tell Canberra customers before they commit."
        related={RELATED}
      />
    </>
  )
}
