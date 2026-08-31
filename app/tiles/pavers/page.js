import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { PAVERS } from '@/components/paversData'

export const metadata = {
  title: 'Pavers — 20mm Outdoor Porcelain Pavers | Capital Tiles',
  description:
    'Thick outdoor porcelain pavers for patios, pool surrounds, paths and alfresco areas — frost resistant, slip rated and laid on sand, pedestals or a slab. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'A paver is not just a thicker tile. Outdoor porcelain pavers are made at around 20mm so they can carry a load without a bedding layer underneath them supporting every square centimetre, which is what lets them go down on compacted sand, on pedestals over a membrane, or bonded to a slab.',
  'Outside, the material has to survive things an indoor floor never meets. Canberra frosts get into anything porous and split it as the water expands, so a paver needs to be frost resistant rather than merely hard-wearing. It also needs a slip rating that still works when the surface is wet and someone walks on it with bare feet straight out of a pool.',
  'Porcelain has a real advantage over natural stone here: it does not need sealing, it will not stain from a spilled drink or a dropped sausage, and it holds its colour through years of UV rather than fading and greying. Cleaning is a broom and a hose rather than an annual re-seal.',
  'Pavers are worth planning properly, because falls, drainage and the setout at the pool edge all have to be right before anything is laid. Book a free measure and quote — we will look at the site, work out the base, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'What is the difference between a paver and an outdoor tile?',
    a: 'Thickness and how it is laid. An outdoor tile is around 10mm and is bonded to a prepared slab like any other tile. A paver is around 20mm, strong enough to sit on compacted sand or on pedestals over a membrane, which means you can lay it without pouring concrete first.',
  },
  {
    q: 'Can pavers go on sand, or do I need a slab?',
    a: 'Both work, and the site decides. Sand or road base suits a path, a courtyard or a garden setting and drains freely. A slab or pedestal system is the answer over a membrane, on a roof deck or where levels have to be exact. We look at the ground, the falls and the drainage at the measure before recommending either.',
  },
  {
    q: 'Will they survive a Canberra frost?',
    a: 'Porcelain pavers are frost resistant because they absorb almost no water, so there is nothing in the body to freeze and split them. That is the main reason we steer people away from porous natural stone for exposed areas here. Drainage still matters — water that sits underneath will move any paving over time.',
  },
  {
    q: 'How hot do dark pavers get in summer?',
    a: 'Any dark surface in full sun gets hot, and a paver is no exception, so around a pool or anywhere people walk barefoot in January a mid or light tone is the kinder choice. If you want the darker look, keep it to shaded areas or paths people cross in shoes.',
  },
  {
    q: 'Can I match the pavers to my indoor floor?',
    a: 'Often yes, and it is one of the better tricks for making a small house feel larger — the same look running from the living room out through the doors makes the two spaces read as one. Many ranges come as a 10mm indoor tile and a 20mm outdoor paver in the same colour, and we will confirm which of these do.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the pavers for your own trade, or handle the whole job — preparing the base, setting the falls, laying, and finishing the edges and joints. Everything is quoted up front with no hidden costs.',
  },
]

const RELATED = [
  { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/spaces/outdoor.jpg' },
  { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/pavers/bari-collection.jpg' },
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/balcony.jpg' },
  { label: 'Floor Tiles', href: '/tiles/floor-tiles', img: '/img/floor-tiles/limestone.jpg' },
]

export default function PaversPage() {
  return (
    <>
      <CollectionIntro
        crumb="Pavers"
        title="Pavers That Take the Weather"
        lede={`${PAVERS.length} ranges of 20mm outdoor porcelain for patios, pool surrounds, paths and alfresco areas — frost resistant, slip rated and able to go down on sand, pedestals or a slab. Supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={PAVERS}
        heading="Pavers"
        basePath="/tiles/pavers"
        imgPath="/img/pavers"
      />
      <CollectionCopy
        heading="Twenty millimetres, and why it matters"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Base, frost and falls"
        faqLede="Paving questions are nearly always about what goes underneath and what the weather does to it. Here is what we work through before anything is laid."
        related={RELATED}
        image="/img/copy/tiles-pavers.jpg"
        imageAlt="Thick 20mm porcelain pavers laid on compacted sand with their depth visible at the edge"
      />
    </>
  )
}
