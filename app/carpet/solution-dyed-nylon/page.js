import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { NYLON } from '@/components/nylonData'

export const metadata = {
  title: 'Solution Dyed Nylon Carpet — Fade and Bleach Resistant | Capital Tiles',
  description:
    'Solution dyed nylon carpet in chunky loops, soft cut pile twists and wool-look textures. Colour locked into the fibre, so it holds up to sunlight and bleach-based cleaning. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Most carpet is coloured after the fibre already exists — the yarn is made first, then dye is applied to the outside of it. Solution dyed nylon is made the other way round. Pigment goes into the liquid polymer before the fibre is drawn, so the colour is part of the strand itself rather than a coating on it. Cut a fibre in half and the colour runs all the way through.',
  'That single difference in how it is made is what you notice years later. There is no surface dye for sunlight to break down, so the strip of floor inside a north-facing window or a glass sliding door holds its colour instead of going pale against the rest of the room — worth having in Canberra, where the winter sun reaches a long way into a living area. It also changes what you are allowed to clean it with. Because the colour is not sitting on the surface, diluted bleach-based spot cleaners can be used on the spills that would normally leave a permanent mark, without taking the colour out along with the stain.',
  'Then there is the fibre itself. Nylon is the most resilient of the carpet fibres: each strand has a memory, so it springs back after being crushed under a lounge leg or walked on a few thousand times rather than staying flat. That is why we point people to nylon for stairs, entries and the traffic lane between the kitchen and the back door — the parts of a house that show wear before anywhere else. Add young kids, a dog and the mess that comes with both, and the case for it gets stronger again.',
  'This is the broadest carpet range we carry, drawn from Godfrey Hirst and EC Carpets. It runs from chunky and textured loops in Balmain, Otway Lodge, Beechmont and Country Lane, through soft cut pile twists such as Marylebone, Monte Bello, Supreme Touch and Timeless, to wool-look striated and bouclé textures in Andes Peak, Ayrton, Orchard and Bouclé. Colour palettes go from five carefully chosen neutrals up to fourteen, so you can usually land on the exact depth of grey, sand or stone you are matching. Come and see the samples in daylight at our Mitchell showroom, or book a free measure and quote and we will price the carpet, underlay, old floor removal and installation together.',
]

const FAQS = [
  {
    q: 'What does solution dyed actually mean?',
    a: 'The pigment is mixed into the molten polymer before the fibre is extruded, so the colour is locked into the strand as it forms. Conventional carpet is dyed after the yarn is made, which leaves the colour on the surface where sunlight and strong cleaners can reach it. Same look on day one, different story after a few summers.',
  },
  {
    q: 'Will it fade in a room that gets a lot of sun?',
    a: 'This is the fibre to use when it does. With no surface dye for UV to attack, solution dyed nylon holds its colour far better than a surface-dyed carpet, so you avoid the pale band that turns up along a window line or inside a west-facing sliding door. Blinds and curtains still help everything in a room, carpet included.',
  },
  {
    q: 'Can I really clean it with bleach?',
    a: 'Diluted bleach-based spot cleaners can be used on solution dyed nylon without stripping colour from the fibre, which is why it suits homes with toddlers and pets. It is not a licence to pour neat bleach on the floor — that can still affect the backing — so dilute it, test in a wardrobe first and follow the care instructions for your range. If you are unsure, ring us and we will tell you what we would use.',
  },
  {
    q: 'How does nylon compare with wool, polyester or polypropylene?',
    a: 'Nylon is the most resilient of the four: it recovers from crushing best and holds its twist longest, which is what makes it the choice for stairs and hallways. Wool feels and looks superb and is naturally flame resistant, but it costs more. Polyester is soft and takes rich colour well. Polypropylene is the value option and shrugs off stains, but it flattens sooner under traffic. We keep all four on the floor at Mitchell so you can feel the difference rather than take our word for it.',
  },
  {
    q: 'Loop pile or cut pile for a hallway with pets?',
    a: 'With cats or long-clawed dogs we usually steer towards a cut pile twist such as Monte Bello, Comfort Touch or Timeless, because there is no loop for a claw to catch and pull. Loop piles like Balmain, Otway Lodge and Country Lane hold their surface beautifully in a hallway and hide footprints well, so they are a good answer in a house without them. Both wear well in nylon — it is usually the pets that decide it.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the roll for your own trade, or handle the whole job — lifting and taking away the old carpet, checking and preparing the subfloor, laying underlay, stretching, joining and finishing stairs and doorways neatly. Underlay is quoted with the carpet rather than added later, and the free measure and quote covers Canberra, Queanbeyan, Yass, Bungendore, Murrumbateman and the surrounding districts.',
  },
]

const RELATED = [
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/wool/cotswolds.jpg' },
  { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', img: '/img/polypropylene/encounter.jpg' },
  { label: 'Polyester Carpet', href: '/carpet/polyester', img: '/img/polyester/dolomites.jpg' },
  { label: 'DuraTuft Carpet', href: '/carpet/duratuft', img: '/img/duratuft/modern-appeal.jpg' },
]

export default function SolutionDyedNylonCarpetPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="Solution Dyed Nylon"
        title="Solution Dyed Nylon Carpet That Holds Its Colour"
        lede={`The colour is locked into the fibre as it is made rather than dyed onto the surface, so it does not fade in sunlight and survives bleach-based cleaning. These ${NYLON.length} ranges — our broadest — span chunky loops, soft cut pile twists and wool-look textures, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={NYLON}
        heading="Solution Dyed Nylon Carpet"
        basePath="/carpet/solution-dyed-nylon"
        imgPath="/img/solution-dyed-nylon"
      />
      <CollectionCopy
        heading="Colour built into the fibre, not painted onto it"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Fade, cleaning and wear"
        faqLede="Solution dyed nylon raises a different set of questions to wool or polyester — how the colour gets in, what you are allowed to clean it with, and where the fibre earns its keep. These are the ones we work through on nearly every nylon quote."
        related={RELATED}
        image="/img/copy/carpet-solution-dyed-nylon.jpg"
        imageAlt="A hard-wearing grey loop pile carpet on a staircase with strong sunlight across the treads"
      />
    </>
  )
}
