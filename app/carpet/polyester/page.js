import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { POLYESTER } from '@/components/polyesterData'

export const metadata = {
  title: 'Polyester Carpet — Soft, Stain-Resistant Carpet | Capital Tiles',
  description:
    'Polyester carpet in cut pile twist and chunky loop — soft underfoot, deep colour and very good with water-based spills. Supplied and professionally installed across Canberra.',
}

const PARAGRAPHS = [
  'Polyester is the one carpet fibre that barely takes on water. The filament itself is close to non-absorbent, so a spilt cordial, a knocked glass of red or a coffee that misses the coaster tends to sit on the surface of the pile for a moment instead of wicking straight into it. Get to it with a clean cloth in that first minute and most water-based spills lift out with nothing but water. That is a genuine property of the fibre, not a coating that wears off — which is why polyester ends up in so many family lounges and kids bedrooms.',
  'The same chemistry is what gives polyester its colour. The fibre holds dye deeply and evenly, so the darks stay properly dark rather than looking washed out — you can see it across Classic City in Night Sky, Deep Grey and Lobelia, and in Penny Lane through Onyx, Cobalt and Tempest. The soft neutrals do just as well: Rice Paper, Snow Blossom, Sandalwood, Hazelnut and the stipple colourways that hide day-to-day marks. Underfoot it is the softest of the synthetics, with a plush, cushioned hand that reads as more expensive than it is.',
  'The honest trade-off is resilience. Polyester does not spring back from being walked on as well as nylon does, so a cut pile twist like Classic City or Penny Lane will start to flatten and show a track through a hallway or the main run between the kitchen and the back door sooner than a solution-dyed nylon in the same spot. If you want polyester through a busier area, the loop pile ranges are the smarter pick — the chunky textured loops in Dolomites and Sky Bridge hold their shape better than a cut pile because the yarn is anchored at both ends. A good quality underlay helps too: it takes some of the crush load off the pile and is the cheapest thing you can do to extend the life of any carpet.',
  'Put simply, polyester is the value option that does not feel like one, as long as you put it where it belongs — bedrooms, lounges, media rooms and guest rooms rather than the busiest thoroughfare in the house. Come and walk on the ranges in our Mitchell showroom, take a few colours home to see them in your own light, or book a free measure and quote and we will work out metreage, seam placement, underlay and installation in one price. We supply and install across Canberra, Queanbeyan, Gungahlin, Belconnen, Woden, Tuggeranong and the surrounding districts.',
]

const FAQS = [
  {
    q: 'What is polyester carpet actually good at?',
    a: 'Two things: it is soft, and it copes very well with water-based spills. Because the fibre absorbs almost no water, drinks, food spills and pet accidents sit on the surface long enough for you to blot them up rather than soaking into the yarn. It also takes deep colour beautifully, so dark and saturated shades stay rich.',
  },
  {
    q: 'Will polyester carpet flatten in a hallway?',
    a: 'Yes, sooner than nylon will. Polyester has less natural bounce back, so in a hallway, on stairs or along the main walking line through a house you will start to see a flattened track earlier. We tell people this up front. If a busy thoroughfare is the area you are carpeting, a solution-dyed nylon is the better fibre for that space and we will say so at the quote.',
  },
  {
    q: 'Which rooms suit polyester best?',
    a: 'Bedrooms, lounges, media rooms, studies and guest rooms — spaces that get used rather than marched through. That is where the softness and the stain performance are worth the most and where the traffic is light enough that the pile keeps its look for years. Plenty of Canberra homes run polyester through the bedroom wing and something harder-wearing down the hall.',
  },
  {
    q: 'What is the difference between the cut pile and loop pile ranges here?',
    a: 'Classic City and Penny Lane are cut pile twists — the yarn tips are open, which is what makes them so soft underfoot and so good in a bedroom. Dolomites and Sky Bridge from EC Carpets are loop piles, with a chunky textured loop that holds its shape better and gives you a more casual, tactile surface. Loop is the one to choose if the room sees a bit more coming and going.',
  },
  {
    q: 'How should I clean a spill on polyester?',
    a: 'Blot, do not rub. Press a clean dry cloth or paper towel into the spill and lift, working from the outside in so you are not spreading it, and repeat until nothing more transfers. Most water-based spills need nothing else. Oil-based marks are the weak point for polyester, so for those use a solvent-based spotter made for carpet and test it in a wardrobe first — and vacuum regularly, since grit ground into the base of the pile does more damage over time than any spill.',
  },
  {
    q: 'Do you supply only, or supply and install?',
    a: 'Both. We can supply the broadloom for your own installer, or handle the whole job — lifting and disposing of the old floorcovering, checking and preparing the subfloor, new smoothedge and underlay, laying, seaming and trimming off. Everything is quoted up front after a free measure, so you see the supply and the installation together.',
  },
]

const RELATED = [
  { label: 'Solution Dyed Nylon', href: '/carpet/solution-dyed-nylon', img: '/img/solution-dyed-nylon/comfort-touch.jpg' },
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/wool/queenstwist.jpg' },
  { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', img: '/img/polypropylene/summit-point.jpg' },
  { label: 'Duratuft Carpet', href: '/carpet/duratuft', img: '/img/duratuft/kensington.jpg' },
]

export default function PolyesterCarpetPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="Polyester"
        title="Polyester Carpet"
        lede={`Soft underfoot, deep in colour and very forgiving with a spilt drink. These ${POLYESTER.length} polyester ranges cover cut pile twists and chunky textured loops, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={POLYESTER}
        heading="Polyester Carpet"
        basePath="/carpet/polyester"
        imgPath="/img/polyester"
      />
      <CollectionCopy
        heading="Soft underfoot, and forgiving with a spilt drink"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Softness, spills and where it belongs"
        faqLede="Polyester is a fibre with clear strengths and one clear limit, and it is worth knowing both before you choose it. Here is what we tell customers about stains, flattening, the cut pile and loop pile ranges, and cleaning."
        related={RELATED}
      />
    </>
  )
}
