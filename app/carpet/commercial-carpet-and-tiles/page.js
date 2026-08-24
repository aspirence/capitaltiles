import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'

export const metadata = {
  title: 'Commercial Carpet and Tiles — Modular Tiles & Broadloom | Capital Tiles',
  description:
    'Modular carpet tiles and commercial broadloom for offices, fit-outs, aged care and hospitality. Heavy duty ratings, supply and install quoted across Canberra by Capital Tiles.',
}

/* The live commercial collection has no products loaded yet, so the grid renders
   its empty notice exactly as the reference page does. The copy and FAQ below
   follow the same pattern as every other collection page. */

const PARAGRAPHS = [
  'Almost every other floor we sell has to be replaced as one piece. A carpet tile does not. When a chair castor shreds a patch by the printer, or something goes over in the tea room, you lift that one module, drop in a fresh tile from the spare boxes and the floor is finished — no join to hide, no room to empty, no closing the office for a day. That single property is why modular carpet took over workplace fit-outs, and it is the first thing worth understanding about this range.',
  'Modules are usually 500x500mm squares, with plank formats around 250x1000mm in some ranges, built on a heavy backing that keeps each tile flat and stable underfoot. They go down direct to the slab on a tackifier — a tacky, non-setting adhesive that grips the tile but still lets it come back up — so nothing is permanently bonded to the floor. How you turn them changes the look completely: laid monolithic, all facing one way, the floor reads closest to broadloom; quarter-turning each tile disguises shading and traffic paths; brick and ashlar layouts make the grid a deliberate part of the design. On an odd-shaped floor plate tiles also waste far less than a roll, because the offcut from one perimeter cut goes straight into the next.',
  'Broadloom still earns its place. Wide rolls — 3.66 and 4 metres are the usual widths — give you a seamless, quieter floor for boardrooms, aged care lounges, hotel corridors and function rooms, and a cut pile in a roll feels softer underfoot than most modular ranges. Tiles and broadloom alike are graded for duty rather than sold on looks, so a heavy or extra heavy duty rating tells you the construction is dense enough for the traffic you are about to put on it. Ask for a low, dense loop wherever there are chairs on castors and trolleys, and for solution dyed fibre wherever cleaning matters — the colour is locked into the yarn rather than applied to the surface, so it takes strong cleaning without going pale and holds its colour under a wall of windows.',
  'There is nothing from the commercial range on the showroom floor at the moment, but we can order it in. Tell us about the site — the floor area, what happens on it, whether it is a new fit-out or a tired floor coming up — and we will get sample boxes in front of you, check the duty ratings and any fire or slip requirements the specification calls for, and quote supply and installation together. We lift and dispose of the old floor, prepare the slab and work the program around how the building runs, staged floor by floor or outside trading hours. Call 02 6253 8158 or come and see us at 3 Pelle Street, Mitchell — measure and quote is free across Canberra, Queanbeyan and the surrounding district.',
]

const FAQS = [
  {
    q: 'Carpet tiles or broadloom for a workplace?',
    a: 'Tiles for open-plan floors, workstations and anywhere a spill or a castor is likely, because you can replace one module instead of the room. Broadloom for boardrooms, lounges, hotel corridors and function rooms, where a seamless floor and a softer feel underfoot matter more than being able to lift a patch. Plenty of fit-outs use both — tiles through the working floor, a roll in the rooms where people sit still.',
  },
  {
    q: 'Can you really swap out a single damaged tile?',
    a: 'Yes, and it is the main reason to go modular. Tiles are laid on a tackifier rather than a permanent adhesive, so one lifts out with a suction cup and a replacement drops straight in. The trick is ordering spare boxes with the job and storing them on site — dye lots shift over time, and a tile from the original batch will always blend better than one ordered three years later.',
  },
  {
    q: 'How do I know a carpet will handle the traffic?',
    a: 'By the duty rating rather than the look of it. Commercial ranges are graded for heavy or extra heavy duty use, and that grading reflects pile density and construction, not colour. We check the rating of any range against what the floor actually carries — a reception or a corridor takes far more than a back office — and we will tell you plainly if something is under-specified for the job.',
  },
  {
    q: 'Will the joins between the tiles show?',
    a: 'That comes down to how they are turned. Laid monolithic, all in one direction, the grid all but disappears in a plain colour and the floor reads like a roll. Quarter-turning each tile is the safer choice on a large floor plate because it hides shading and traffic paths as the carpet wears in. Brick and ashlar layouts do the opposite and make the grid part of the design, which works well with two or three tones mixed through the floor.',
  },
  {
    q: 'How is commercial carpet looked after?',
    a: 'Regular vacuuming does most of the work, with spot cleaning as things happen and periodic encapsulation or extraction across the whole floor. Solution dyed fibre helps here, because the colour runs through the yarn rather than sitting on the surface and will take a strong clean without fading. Good entry matting at the doors is the cheapest improvement you can make — most of what wears a commercial floor is grit walked in from outside.',
  },
  {
    q: 'Can you order this range in and quote our site?',
    a: 'Yes. Nothing from the commercial range is on the showroom floor at the moment, but we can bring samples and full boxes in to order. Send us the floor area or the plans, tell us how the space is used, and we will come back with options, duty ratings, lead times and a price for supply and installation — including lifting the old floor and preparing the slab. We quote sites across Canberra, Queanbeyan, Gungahlin, Belconnen, Tuggeranong, Woden and the surrounding towns.',
  },
]

const RELATED = [
  { label: 'Solution Dyed Nylon Carpet', href: '/carpet/solution-dyed-nylon', img: '/img/solution-dyed-nylon/boucle.jpg' },
  { label: 'Polypropylene Carpet', href: '/carpet/polypropylene', img: '/img/polypropylene/enforcer-4m.jpg' },
  { label: 'Wool Carpet', href: '/carpet/wool', img: '/img/wool/pebble-grid-4m.jpg' },
  { label: 'Polyester Carpet', href: '/carpet/polyester', img: '/img/polyester/sky-bridge.jpg' },
]

export default function CommercialCarpetAndTilesPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Carpet', href: '/carpet' }}
        crumb="Commercial Carpet and Tiles"
        title="Commercial Carpet and Carpet Tiles"
        lede="Modular carpet tiles and commercial broadloom for offices, fit-outs, aged care and hospitality — a floor you can lift and replace one module at a time, graded for heavy and extra heavy duty traffic. Available to order through our Mitchell showroom, supplied and installed across Canberra."
      />
      <CollectionGrid
        items={[]}
        heading="Commercial Carpet and Tiles"
        basePath="/carpet/commercial-carpet-and-tiles"
        imgPath="/img/commercial-carpet"
      />
      <CollectionCopy
        heading="A floor you can repair one module at a time"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Modules, ratings and site programs"
        faqLede="A commercial floor gets chosen on different grounds to a house — duty ratings, how the building keeps running through the works, and what happens the day something gets damaged. These are the questions we work through with facilities managers, builders and fit-out crews."
        related={RELATED}
      />
    </>
  )
}
