import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { OUTDOOR } from '@/components/outdoorData'

export const metadata = {
  title: 'Outdoor Tiles & Pavers — Alfresco, Decks & Driveways | Capital Tiles',
  description:
    'Frost-rated outdoor tiles and 20mm pavers with R11 grip for alfresco areas, decks, paths and driveways. Matching indoor formats available. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'Outdoor surfaces in Canberra have to survive a wider swing than almost anywhere else in the country — frost through winter, hard UV through summer, and rain in between. Everything in this range is frost-rated porcelain, which means water sitting at the surface cannot freeze, expand and spall the tile the way it does with a porous paver.',
  'The 20mm formats are the workhorses: thick enough to lay on pedestals, gravel or a sand-and-cement bed, and rated R11 so they stay safe underfoot when wet. Alongside them we stock 10mm versions of the same colours for covered alfresco areas and balconies, so a deck can run straight into the room behind it without a change of tone.',
  'Because the ranges carry both an indoor and an outdoor format, you can take one floor from the kitchen through the glass doors and out onto the terrace. Level thresholds, matching bullnose and step treads all come from the same collection, so the detail resolves properly rather than being improvised on site.',
  'Falls, drainage and substrate matter as much as the tile itself outdoors. Book a free measure and quote and we will check the site, work out the setout and give you one price for supply and installation.',
]

const FAQS = [
  {
    q: 'What is the difference between a 10mm tile and a 20mm paver?',
    a: '10mm is the standard thickness for a tile bonded to a prepared slab, including covered alfresco areas. 20mm is structural — it can be laid dry on pedestals, gravel or sand, which makes it the right choice for open terraces, paths and anywhere you want to avoid pouring a slab.',
  },
  {
    q: 'Will outdoor tiles survive a Canberra frost?',
    a: 'The ranges here are frost-rated, so their water absorption is low enough that freezing cannot damage them. This is the single most important specification to get right locally — a non-rated tile will eventually flake at the surface.',
  },
  {
    q: 'What slip rating do I need outdoors?',
    a: 'R11 is what we specify for open outdoor areas and anywhere near water. Covered alfresco spaces that stay dry can run R10. We will confirm the rating for your particular layout during the quote.',
  },
  {
    q: 'Can I match my indoor floor to the outdoor area?',
    a: 'Yes — most of these collections come in both a 10mm indoor and a 20mm outdoor format in the same colour and texture. Running one look through the doors is the easiest way to make a living area feel bigger.',
  },
  {
    q: 'Do outdoor tiles get too hot to walk on?',
    a: 'Colour matters more than material. Light beiges, ivories and greys stay comfortable barefoot in full sun; charcoals and blacks will get hot. We will steer you on this if the area is unshaded.',
  },
  {
    q: 'Can pavers be laid over an existing concrete slab?',
    a: 'Usually yes, provided the slab is sound and drains away from the building. We check the falls and substrate on site before quoting, and can build up on pedestals where the levels need correcting.',
  },
]

const RELATED = [
  { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/spaces/commercial.jpg' },
  { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/spaces/balcony.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
]

export default function OutdoorTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Outdoor Tiles"
        title="Outdoor Tiles &amp; Pavers Built for Canberra Weather"
        lede={`Browse ${OUTDOOR.length} outdoor collections — frost-rated porcelain and 20mm pavers with R11 grip for alfresco areas, decks, paths and driveways, most with a matching indoor format so one floor can run straight through.`}
      />
      <CollectionGrid
        items={OUTDOOR}
        heading="Outdoor Tiles"
        basePath="/tiles"
        imgPath="/img/outdoor"
      />
      <CollectionCopy
        heading="Pavers, alfresco floors &amp; outdoor surfaces"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Before the first paver goes down"
        faqLede="10mm tile or 20mm paver? That is where most outdoor jobs start. Then come frost through a Canberra winter, slip grades underfoot, matching the floor inside, and laying over an existing slab."
        related={RELATED}
        image="/img/copy/tiles-outdoor.jpg"
        imageAlt="Frost-rated porcelain paving on an outdoor terrace with water beading on the textured surface"
      />
    </>
  )
}
