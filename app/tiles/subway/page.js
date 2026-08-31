import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'

export const metadata = {
  title: 'Subway Tiles — Gloss, Matt & Handmade-Look Wall Tiles | Capital Tiles',
  description:
    'Subway tiles for splashbacks, bathrooms and feature walls — gloss, matt and handmade looks in classic and elongated formats. Talk to Capital Tiles in Mitchell about the range.',
}

/* The live subway collection has no products loaded yet, so the grid renders
   its empty notice exactly as the reference page does. The copy and FAQ below
   follow the same pattern as every other collection page. */

const PARAGRAPHS = [
  'Subway is the tile that keeps coming back, and it comes back because it works. A simple rectangular wall tile laid in a running bond gives a kitchen or bathroom a clean, quiet backdrop that does not date the way a bolder pattern will, and it sits comfortably with almost any cabinetry colour you put in front of it.',
  'The format has moved well past the original 75x150mm brick. Elongated formats around 75x300mm stretch a wall and make a narrow room read wider; larger 100x300mm tiles cut the grout lines down in a big splashback. The same tile laid vertically, in herringbone or stacked instead of offset changes the whole character of the room without changing the product.',
  'Finish is where the decision usually lands. A gloss glaze bounces light around a room with no windows and wipes clean behind a cooktop. Matt and satin glazes sit quieter and hide water marks. Handmade-look ranges carry deliberate variation in the glaze and a slightly uneven edge, which is what gives a wall that soft, older feel rather than a flat machine finish.',
  'This range is not on the showroom floor yet. Come in and talk to us about what you are planning — we can order subway ranges in, show you full sheets alongside your benchtop and cabinetry samples, and quote supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'What size subway tile should I choose?',
    a: 'The classic is around 75x150mm. Elongated 75x300mm stretches a wall and suits a narrow bathroom or a long splashback. Larger 100x300mm formats cut down the grout lines in a big run. The smaller the tile, the busier the wall reads — which is the whole decision in one sentence.',
  },
  {
    q: 'Gloss, matt or handmade look?',
    a: 'Gloss throws light around and is the easiest to wipe behind a cooktop, so it suits a windowless bathroom or a working kitchen. Matt and satin are quieter and hide water marks better. Handmade looks carry uneven glaze and edges, which gives warmth but shows more shadow across the wall.',
  },
  {
    q: 'Which laying pattern works best?',
    a: 'Running bond, offset by half a tile, is the default and always looks right. Stacked reads more modern and shows off a crisp edge. Vertical stacking lifts a low ceiling. Herringbone turns the same tile into a feature. We set out the pattern on site so cuts land where they are least visible.',
  },
  {
    q: 'What grout colour should I use?',
    a: 'Matching grout makes the wall read as one surface; contrasting grout draws the grid and makes the pattern the feature. Dark grout hides staining behind a cooktop, and mid-greys are the safest all-rounder. We will hold grout samples against the tile before anything is mixed.',
  },
  {
    q: 'Can subway tiles go on the floor?',
    a: 'Generally no. Most subway ranges are glazed wall tiles, rated for vertical surfaces only, and they will not carry the wear or the slip rating a floor needs. If you want the look underfoot we will point you to a floor-rated tile in a similar format instead.',
  },
  {
    q: 'Can you order this range in for my project?',
    a: 'Yes. There is nothing on the showroom floor at the moment, but we can bring ranges in to order. Tell us the room, the format and the finish you have in mind, and we will come back with options, lead times and a price.',
  },
]

export default function SubwayTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Subway"
        title="Subway Tiles for Splashbacks and Bathrooms"
        lede="The wall tile that never really leaves — a simple rectangle that gives a kitchen or bathroom a clean, quiet backdrop. Classic and elongated formats in gloss, matt and handmade looks, laid running bond, stacked, vertical or herringbone. Available to order through our Mitchell showroom."
      />
      <CollectionGrid
        items={[]}
        heading="Subway Tiles"
        basePath="/tiles/subway"
        imgPath="/img/subway"
      />
      <CollectionCopy
        heading="A simple rectangle, laid four different ways"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Format, finish and grout"
        faqLede="With subway the tile is the easy part — the decisions are size, glaze, laying pattern and grout colour, and together they change the room completely. These are the questions we work through with customers."
        image="/img/copy/tiles-subway.jpg"
        imageAlt="A kitchen splashback in classic white subway tiles laid in a running bond"
      />
    </>
  )
}
