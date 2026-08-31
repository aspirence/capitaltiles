import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { LIVING_ROOM } from '@/components/livingRoomData'

export const metadata = {
  title: 'Living Room & Hallway Tiles — Large Format Stone and Travertine Looks | Capital Tiles',
  description:
    'Living room and hallway tiles in travertine, limestone and stone looks, from 600x600 up to large format. Warm, low-maintenance floors supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'A living room floor is the one you look at most and stand on least. That changes what matters: underfoot grip is less of a concern than it is in a bathroom, and what you are really buying is the tone of the room, how the floor takes afternoon light through a west-facing window, and how few grout lines you can get away with.',
  'That is why nearly everything on this page is a large format. A 600x1200 laid through an open-plan living and dining space reads as one continuous surface rather than a grid, and the fewer joins there are, the larger the room feels. In a hallway the same logic runs the other way — a long, narrow space looks longer when the tile runs with it rather than across it, and we set the laying direction on site rather than guessing from a plan.',
  'The range is built around warm, quiet stone: travertine in vein and cross cut, limestone tones, honed concrete looks and a pale marble where a room wants a feature. Matt and honed finishes hide dust and footmarks far better than polish, which matters in a room with a sofa and a coffee table in it. Where the living area opens onto an alfresco, the paver formats in this range match the indoor tiles, so the floor can carry through the doorway without a change in colour.',
  'Tile in a living room also does something a floating floor cannot — it takes underfloor heating properly, and in a Canberra winter that is worth the conversation. Come and see full tiles rather than sample chips in our Mitchell showroom, or book a free measure and quote: we will check the substrate, work out the laying direction and joins, and price supply and installation together with no hidden costs.',
]

const FAQS = [
  {
    q: 'Is tile too cold for a living room in Canberra?',
    a: 'On its own in July, yes — it will feel colder underfoot than carpet or timber. The answer is not a different floor, it is underfloor heating, which tile conducts better than any other surface we sell. If heating is not in the budget, a large rug over tile in the sitting zone gives you most of the comfort and keeps the easy-clean floor everywhere else.',
  },
  {
    q: 'What size tile suits an open-plan living area?',
    a: '600x1200 is the workhorse. It keeps grout lines to a minimum so the floor reads as one surface, and it scales properly to a large room — a 300x300 in an open-plan space looks busy and dates quickly. Anything above 600x1200 needs a very flat substrate, which we check before quoting.',
  },
  {
    q: 'Matt, honed or polished?',
    a: 'Matt or honed for a living room. Polished looks superb in a showroom and shows every footmark and speck of dust in a real house with a north-facing window. Honed gives you a soft sheen without the maintenance, and it is far more forgiving underfoot than polish if the room opens onto a wet area.',
  },
  {
    q: 'Can the same tile run from the living room out to the alfresco?',
    a: 'Yes, and it is the single best trick for making a house feel bigger. Several ranges here come in both an indoor format and a P5-rated 20mm paver in the same colour, so the floor carries through the sliding door with no visual break while still being safe underfoot outside.',
  },
  {
    q: 'Which way should tiles run in a hallway?',
    a: 'Along the length, almost always — it draws the eye down the hall and makes a narrow space read longer. We set the direction on site once we can see where the light comes from and where the doorways land, because that is not something a floor plan tells you reliably.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — lifting the old floor, checking and preparing the substrate, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

const RELATED = [
  { label: 'Bedroom Tiles', href: '/tiles/bedroom', img: '/img/spaces/bedroom.jpg' },
  { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
  { label: 'Floor Tiles', href: '/tiles/floor-tiles', img: '/img/spaces/livingroom.jpg' },
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
]

export default function LivingRoomTilesPage() {
  return (
    <>
      <CollectionIntro
        parent={{ label: 'Tiles', href: '/tiles' }}
        heroBg="/img/spaces/livingroom.jpg"
        crumb="Living Room Tiles"
        title="Living Room & Hallway Tiles"
        lede={`${LIVING_ROOM.length} ranges in travertine, limestone and honed stone looks — large formats that keep grout lines down and carry through to the alfresco. Supplied and installed across Canberra.`}
      />
      <CollectionGrid
        items={LIVING_ROOM}
        heading="Living Room & Hallway Tiles"
        basePath="/tiles"
        imgPath="/img/all-tiles"
      />
      <CollectionCopy
        heading="The floor you look at most"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Asked on every living room quote"
        faqLede="Size, finish and whether the floor should carry through to the alfresco — these three decide how a living room floor turns out, and they come up on nearly every quote we write."
        related={RELATED}
      />
    </>
  )
}
