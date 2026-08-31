import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { PATIO } from '@/components/patioData'

export const metadata = {
  title: 'Patio Tiles — Courtyard, Terrace & Entertaining Areas | Capital Tiles',
  description:
    'Patio and courtyard tiles in stone, travertine and concrete looks — frost-rated, slip-safe and available in matching indoor formats. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'A patio is the piece of the house that does the entertaining, so it has to look considered and still take a barbecue, wet feet and a Canberra winter. These collections are frost-rated porcelain in travertine, limestone, sandstone and concrete looks — the character of natural stone without the sealing, staining and pitting that comes with the real thing.',
  'Most ranges come in both 10mm and 20mm. Use the 10mm bonded to a prepared slab under a covered terrace, and the 20mm dry-laid on pedestals or gravel where the patio is open to the sky. Matching bullnose, step treads and corner pieces come out of the same collection so edges and level changes finish cleanly.',
  'Colour does a lot of work on a patio. Warm beiges and ivories stay comfortable underfoot through summer and lift a shaded courtyard, while greys and charcoals suit a contemporary elevation and hide traffic. Because these looks carry an indoor format too, a courtyard can share its floor with the room it opens onto.',
  'Setout, falls and drainage decide whether a patio still looks right in five years. Book a free measure and quote — we will check the substrate, plan the setout around your doors and give one price covering supply and installation.',
]

const FAQS = [
  {
    q: 'What is the difference between patio tiles and pavers?',
    a: 'They are often the same collection in two thicknesses. Patio tiles at 10mm are bonded to a slab; pavers at 20mm are structural and can be dry-laid on pedestals, gravel or sand. We match the colour across both so a covered and an open area can look identical.',
  },
  {
    q: 'Do I need a concrete slab under a patio?',
    a: 'Not necessarily. 20mm pavers can go over compacted road base or on adjustable pedestals, which is often faster and cheaper than pouring. If there is already a sound slab draining away from the house, we can bond straight to it.',
  },
  {
    q: 'Are these tiles slippery when wet?',
    a: 'The outdoor formats are R11 rated, which is the specification for open areas exposed to rain. Covered patios that stay dry can use R10. We confirm the rating for your layout at quoting stage.',
  },
  {
    q: 'Will a dark patio tile get too hot?',
    a: 'In full sun, yes — charcoals and blacks hold heat and can be uncomfortable barefoot. For unshaded courtyards we steer people toward beiges, ivories and mid greys, which stay noticeably cooler.',
  },
  {
    q: 'How do I keep a patio looking clean?',
    a: 'Porcelain does not need sealing. Sweep it and wash it down with a pH-neutral cleaner. Unlike natural stone it will not absorb oil from a barbecue or stain from fallen leaves.',
  },
  {
    q: 'Can you match the patio to my indoor floor?',
    a: 'Usually yes. Most collections here have a 10mm indoor version of the same colour and texture, so the floor can run from inside straight out through the doors with a level threshold.',
  },
]

const RELATED = [
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
  { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/spaces/balcony.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
]

export default function PatioTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Patio Tiles"
        title="Patio Tiles for Courtyards and Entertaining"
        lede={`Explore ${PATIO.length} patio collections in travertine, limestone, sandstone and concrete looks — frost-rated, slip-safe and available in matching 10mm and 20mm formats so a courtyard can share its floor with the room it opens onto.`}
      />
      <CollectionGrid
        items={PATIO}
        heading="Patio Tiles"
        basePath="/tiles/patio"
        imgPath="/img/patio"
      />
      <CollectionCopy
        heading="Courtyard, terrace &amp; entertaining floors"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Planning your courtyard floor"
        faqLede="Plan a courtyard and the same questions come up every time: what goes under the pavers, how they behave underfoot when wet, whether a dark colour gets too hot, and how closely they match the floor inside."
        related={RELATED}
        image="/img/copy/tiles-patio.jpg"
        imageAlt="A covered entertaining patio paved in travertine-look frost-rated porcelain"
      />
    </>
  )
}
