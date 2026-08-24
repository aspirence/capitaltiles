import CollectionIntro from '@/components/sections/CollectionIntro'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CollectionCopy from '@/components/sections/CollectionCopy'
import { KITCHEN } from '@/components/kitchenData'

export const metadata = {
  title: 'Kitchen Tiles — Floor, Wall & Splashback Tiles | Capital Tiles',
  description:
    'Kitchen floor, wall and splashback tiles in matt, honed and polished finishes — stone, marble and concrete looks built to take heat, grease and traffic. Supplied and installed across Canberra.',
}

const PARAGRAPHS = [
  'A kitchen floor takes more punishment than any other surface in the house — dropped pans, spilled oil, chair legs and constant foot traffic. Our kitchen range is built around dense porcelain that shrugs all of that off, with through-body colour so a chip does not show a different shade underneath.',
  'The collections run from soft limestone and travertine tones through warm timber looks to bold marble and dark concrete, in matt, honed, satin and polished finishes. Formats go from 300x600mm up to 600x1200mm and 750x1500mm panels, so an open-plan kitchen and living space can run as one continuous floor with very few grout lines.',
  'For splashbacks we stock subway formats, mosaics and large-format sheets that wipe clean behind a cooktop, plus polished finishes that bounce light around a galley kitchen. Floor tiles are specified with a slip rating suited to a working kitchen rather than a showroom.',
  'Come and see the range at full sheet size in our Mitchell showroom, or book a free measure and quote — we will visit the site, check the substrate, talk through slip ratings and give you a clear price with no obligation.',
]

const FAQS = [
  {
    q: 'What slip rating should a kitchen floor tile have?',
    a: 'For a domestic kitchen we normally specify R10, which gives good grip underfoot without being hard to mop. If the kitchen opens straight onto an alfresco or pool area, we will step that up to R11 so the transition is consistent.',
  },
  {
    q: 'Can I run the same tile through the kitchen and living area?',
    a: 'Yes, and in an open-plan home it is the single best thing you can do to make the space feel larger. Large formats such as 600x1200mm keep grout lines to a minimum so the floor reads as one continuous surface.',
  },
  {
    q: 'What works best for a splashback?',
    a: 'Anything easy to wipe down and heat-tolerant. Subway formats and mosaics suit a traditional look, while a single large-format sheet behind the cooktop gives a seamless finish with almost no grout to keep clean.',
  },
  {
    q: 'Will a polished tile be too slippery in a kitchen?',
    a: 'On the floor of a working kitchen, usually yes — we keep polished finishes for splashbacks and walls, and use the matt or honed version of the same range underfoot so the look still matches.',
  },
  {
    q: 'How do I clean grease and stains off kitchen tiles?',
    a: 'A pH-neutral cleaner handles day-to-day grease without dulling the surface. Avoid acidic or abrasive products. We seal grout on installation and can recommend aftercare products to keep it looking new.',
  },
  {
    q: 'Do you supply and install, or supply only?',
    a: 'Both. We can supply the tiles for your own trade, or handle the whole job — removing the old floor, preparing the substrate, laying, grouting and sealing. Everything is quoted up front with no hidden costs.',
  },
]

const RELATED = [
  { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
  { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
  { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
  { label: 'Bedroom Tiles', href: '/tiles/bedroom', img: '/img/spaces/bedroom.jpg' },
]

export default function KitchenTilesPage() {
  return (
    <>
      <CollectionIntro
        crumb="Kitchen Tiles"
        title="Kitchen Tiles Built for the Hardest-Working Room"
        lede={`Explore ${KITCHEN.length} kitchen collections for floors, walls and splashbacks — matt, honed and polished finishes in stone, marble, concrete and timber looks. Dense porcelain that takes heat, grease and traffic, supplied and professionally installed across Canberra.`}
      />
      <CollectionGrid
        items={KITCHEN}
        heading="Kitchen Tiles"
        basePath="/tiles/kitchen"
        imgPath="/img/kitchen"
      />
      <CollectionCopy
        heading="Floor, wall &amp; splashback tiles for kitchens"
        paragraphs={PARAGRAPHS}
        faqs={FAQS}
        faqEyebrow="Asked on every kitchen quote"
        faqLede="A kitchen floor takes heat, grease and traffic, then has to look right where it meets the living room. Slip ratings, splashback formats and grout that resists grease come up on nearly every quote we write."
        related={RELATED}
      />
    </>
  )
}
