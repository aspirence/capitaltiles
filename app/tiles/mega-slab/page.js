import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'

export const metadata = {
  title: 'Mega Slab Tiles — Large Format Porcelain Panels | Capital Tiles',
  description:
    'Mega slab porcelain panels for benchtops, splashbacks and feature walls with almost no grout lines. Talk to Capital Tiles in Mitchell about ordering the range in.',
}

/* The live megaslab collection has no products loaded yet, so the grid renders
   its empty notice exactly as the reference page does. The copy and FAQ below
   follow the same pattern as every other collection page. */

const PARAGRAPHS = [
  'A mega slab is porcelain made at the size of a stone benchtop rather than a tile. Panels run up to 1600x3200mm, which means a whole splashback, a shower wall or an island end can be one continuous piece with the veining running through it uninterrupted — no grout lines breaking the pattern every 600mm.',
  'It behaves like porcelain rather than natural stone, and that is the point. There is nothing to seal, nothing that etches when lemon juice or wine sits on it, and nothing that stains from oil. You get the look of book-matched marble or honed concrete with the maintenance of a floor tile.',
  'The panels come in a range of thicknesses. Thinner sheets are made for walls and for laying over an existing surface, while thicker panels carry the load for benchtops, islands and vanity tops with mitred edges that read as solid stone. Because a full sheet is heavy and unforgiving, cutting and handling are specialist work rather than a job for a general tiler.',
  'This range is not on the showroom floor yet. If a mega slab is what your project needs, talk to us — we can order panels in, show you the full sheet before you commit, and quote supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'What exactly is a mega slab?',
    a: 'A porcelain panel made at slab size rather than tile size, running up to around 1600x3200mm. It is the same material as a porcelain floor tile, just produced in a single sheet large enough to cover a benchtop, a splashback or a full shower wall without a join.',
  },
  {
    q: 'Can a mega slab be used as a benchtop?',
    a: 'Yes, in the thicker panels. Porcelain is harder than most engineered stone, will not stain from oil or wine, and does not etch from acidic food. Edges are usually mitred so the panel reads as a solid piece of stone rather than a sheet laid on top.',
  },
  {
    q: 'How is it different from natural marble or engineered stone?',
    a: 'Marble is porous and etches; engineered stone can discolour under heat and UV. Porcelain does neither, and it needs no sealing at all. The trade-off is that the veining is printed and continues only through the decorated surface rather than the full body on every range.',
  },
  {
    q: 'Do the grout lines really disappear?',
    a: 'Almost. A single panel covers a whole splashback or shower wall, so on most jobs there is no grout line in the field at all — only at the corners and where two panels meet on a very large run. That is the main reason people choose it.',
  },
  {
    q: 'Can I install a mega slab myself?',
    a: 'We would not recommend it. A full sheet is heavy, needs a frame and suction lifters to move safely, and cutting has to be done with the right blade and support or the panel will crack. This is one range where supply and install together is genuinely the safer option.',
  },
  {
    q: 'Can you order this range in for my project?',
    a: 'Yes. There is nothing on the showroom floor at the moment, but we can bring panels in to order. Tell us the room, the rough sizes and the look you are after, and we will come back with options, lead times and a price.',
  },
]

export default function MegaSlabTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Mega Slab"
        title="Mega Slab Porcelain Panels"
        lede="Porcelain made at slab size rather than tile size — panels up to 1600x3200mm that cover a benchtop, splashback or shower wall in one continuous piece, with the veining running straight through and almost no grout lines. Available to order through our Mitchell showroom."
      />
      <CollectionGrid
        items={[]}
        heading="Mega Slab Tiles"
        basePath="/tiles/mega-slab"
        imgPath="/img/mega-slab"
      />
      <CollectionCopy
        heading="Stone looks without the grout lines"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Panels, benchtops and lead times"
        faqLede="Mega slab is the range people know least about, so the questions tend to be practical ones — what it can be used for, how it compares to stone, and how to get hold of it. Here is where we usually start."
        image="/img/copy/tiles-mega-slab.jpg"
        imageAlt="A kitchen island and splashback in one enormous veined porcelain slab with unbroken veining"
      />
    </>
  )
}
