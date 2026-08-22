/* ---------------------------------------------------------------------------
   Navigation taxonomy, shaped after the Simpolo reference: a slim corporate
   strip above, and a main bar whose items open a full-width mega panel. Panels
   are either "tabbed" (a dark rail of groups on the left, cards on the right)
   or a plain "list" column.
   ------------------------------------------------------------------------- */

export const CORPORATE = [
  { label: 'Our Story', href: '/about' },
  { label: 'Chairman’s Message', href: '/about#chairman' },
  { label: 'About Us', href: '/about' },
  { label: 'News & Media', href: '/news-media' },
  { label: 'Foundation', href: '/foundation' },
  { label: 'Careers', href: '/careers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Policies', href: '/privacy-policy' },
]

export const NAV = [
  {
    label: 'Tiles',
    href: '/tiles',
    type: 'tabbed',
    tabs: [
      {
        label: 'Location',
        items: [
          { label: 'Living Room Tiles', href: '/tiles/living-room', img: '/img/spaces/livingroom.jpg' },
          { label: 'Bathroom Tiles', href: '/tiles/bathroom', img: '/img/spaces/bathroom.jpg' },
          { label: 'Bedroom Tiles', href: '/tiles/bedroom', img: '/img/spaces/bedroom.jpg' },
          { label: 'Kitchen Tiles', href: '/tiles/kitchen', img: '/img/spaces/kitchen.jpg' },
          { label: 'Outdoor Tiles', href: '/tiles/outdoor', img: '/img/spaces/outdoor.jpg' },
          { label: 'Balcony Tiles', href: '/tiles/balcony', img: '/img/spaces/balcony.jpg' },
          { label: 'Staircase Tiles', href: '/tiles/staircase', img: '/img/spaces/staircase.jpg' },
          { label: 'Elevation Tiles', href: '/tiles/elevation', img: '/img/spaces/elevation.jpg' },
          { label: 'Commercial Tiles', href: '/tiles/commercial', img: '/img/spaces/commercial.jpg' },
        ],
      },
      {
        label: 'Look & Feel',
        items: [
          { label: 'Marble', href: '/tiles/marble', img: '/img/collections/venitto.jpg' },
          { label: 'Concrete', href: '/tiles/concrete', img: '/img/collections/basaltino.jpg' },
          { label: 'Stone', href: '/tiles/stone', img: '/img/collections/glyphstone.jpg' },
          { label: 'Metallic', href: '/tiles/metallic', img: '/img/collections/alchimia.jpg' },
          { label: 'Rustic', href: '/tiles/rustic', img: '/img/collections/sparko.jpg' },
          { label: 'Decor', href: '/tiles/decor', img: '/img/spaces/elevation.jpg' },
        ],
      },
      {
        label: 'Colour',
        items: [
          { label: 'White', href: '/tiles/white', img: '/img/collections/basaltino.jpg' },
          { label: 'Black', href: '/tiles/black', img: '/img/collections/alchimia.jpg' },
          { label: 'Grey', href: '/tiles/grey', img: '/img/collections/glyphstone.jpg' },
          { label: 'Cream', href: '/tiles/cream', img: '/img/collections/sparko.jpg' },
          { label: 'Brown', href: '/tiles/brown', img: '/img/collections/venitto.jpg' },
        ],
      },
      {
        label: 'Collection',
        items: [
          { label: 'Alchimia', href: '/tiles/collection/alchimia', img: '/img/collections/alchimia.jpg' },
          { label: 'Sparko', href: '/tiles/collection/sparko', img: '/img/collections/sparko.jpg' },
          { label: 'Venitto', href: '/tiles/collection/venitto', img: '/img/collections/venitto.jpg' },
          { label: 'Glyphstone', href: '/tiles/collection/glyphstone', img: '/img/collections/glyphstone.jpg' },
          { label: 'Basaltino', href: '/tiles/collection/basaltino', img: '/img/collections/basaltino.jpg' },
        ],
      },
    ],
  },
  {
    label: 'Bathware',
    href: '/bathware',
    type: 'grid',
    items: [
      { label: 'Bathroom Suites', href: '/bathware/suites', img: '/img/bathware/spotlight.jpg' },
      { label: 'Wash Basins', href: '/bathware/basins', img: '/img/bathware/basin.webp' },
      { label: 'EWC & Pans', href: '/bathware/ewc', img: '/img/bathware/ewc.png' },
      { label: 'Cisterns', href: '/bathware/cisterns', img: '/img/bathware/cistern.jpg' },
      { label: 'Sanitaryware', href: '/bathware/sanitaryware', img: '/img/bathware/choose.jpg' },
      { label: 'Handcrafted Basins', href: '/bathware/handcrafted', img: '/img/bathware/choose.jpg' },
    ],
  },
  {
    label: 'Digital Visualizer',
    href: '/visualizer',
    type: 'list',
    items: [
      { label: 'Digital Showroom', href: '/visualizer/showroom' },
      { label: 'Virtual Space Creator', href: '/visualizer/space-creator' },
      { label: 'Tiles Calculator', href: '/visualizer/calculator' },
    ],
  },
  {
    label: 'Capital Solutions',
    href: '/solutions',
    type: 'list',
    items: [
      { label: 'Technical Videos', href: '/solutions/videos' },
      { label: 'Certifications', href: '/solutions/certifications' },
      { label: 'Technical Guide', href: '/solutions/technical-guide' },
      { label: 'Selection Guide', href: '/solutions/selection-guide' },
      { label: 'Installation Guide', href: '/solutions/installation' },
    ],
  },
  {
    label: 'Downloads',
    href: '/downloads',
    type: 'list',
    items: [
      { label: 'Catalogues', href: '/downloads/catalogues' },
      { label: 'Product Gallery', href: '/downloads/gallery' },
      { label: 'Brand Kit', href: '/downloads/brand-kit' },
    ],
  },
  {
    label: 'Professional',
    href: '/professional',
    type: 'list',
    items: [
      { label: 'Projects', href: '/professional/projects' },
      { label: 'Architect Events', href: '/professional/events' },
      { label: 'Institutional Business', href: '/professional/institutional' },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
    type: 'list',
    items: [
      { label: 'Become a Dealer', href: '/contact-us/dealer' },
      { label: 'Enquiry', href: '/contact-us/enquiry' },
      { label: 'Customer Complaints', href: '/contact-us/complaints' },
      { label: 'Work With Us', href: '/careers' },
      { label: 'Bathware Support', href: '/contact-us/support' },
    ],
  },
]
