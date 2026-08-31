/* ---------------------------------------------------------------------------
   Navigation taxonomy, mirroring the live capitaltiles.com.au header:

     Home ▾ | Tiles ▾ | Flooring ▾ | Carpet ▾ | Installation | FAQ's

   Panels are either "tabbed" (a rail of groups on the left, cards on the right
   — this is how Tiles carries its third level: Indoor / Outdoor / Browse By
   Type), a "grid" of cards, or a plain "list" column. An item with no `type`
   has no submenu at all and renders as a plain link.
   ------------------------------------------------------------------------- */

export const CORPORATE = [
  { label: 'About Us', href: '/about' },
  {
    /* A heading for the four policies, not a page of its own — the label
       renders as plain text and only the children navigate. */
    label: 'Store Policies',
    children: [
      { label: 'Refund Policy', href: '/policies/refund-policy' },
      { label: 'Privacy Policy', href: '/policies/privacy-policy' },
      { label: 'Shipping Policy', href: '/policies/shipping-policy' },
      { label: 'Terms of Service', href: '/policies/terms-of-service' },
    ],
  },
]

export const NAV = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Tiles',
    href: '/tiles',
    type: 'tabbed',
    tabs: [
      {
        label: 'Indoor',
        items: [
          { label: 'Floor Tiles', href: '/tiles/floor-tiles', img: '/img/spaces/livingroom.jpg' },
          { label: 'Wall Tiles', href: '/tiles/wall', img: '/img/wall/21203-natural.jpg' },
        ],
      },
      {
        label: 'Outdoor',
        items: [
          { label: 'Pool Tiles', href: '/tiles/pool', img: '/img/pool/altto-glass-pool-mosaics.jpg' },
          { label: 'Patio Tiles', href: '/tiles/patio', img: '/img/patio/aegean-sea.jpg' },
          { label: 'Pavers', href: '/tiles/pavers', img: '/img/pool/chiswick-paver-collection.jpg' },
        ],
      },
      {
        label: 'Browse By Type',
        items: [
          { label: 'Mosaic', href: '/tiles/mosaic', img: '/img/collections/glyphstone.jpg' },
          { label: 'Mega Slab', href: '/tiles/mega-slab', img: '/img/collections/venitto.jpg' },
          { label: 'Subway', href: '/tiles/subway', img: '/img/collections/basaltino.jpg' },
        ],
      },
    ],
  },
  {
    label: 'Flooring',
    href: '/flooring',
    type: 'list',
    items: [
      { label: 'Hybrid Flooring', href: '/flooring/hybrid-flooring' },
      { label: 'Laminate Flooring', href: '/flooring/laminate-flooring' },
      { label: 'Engineered Timber', href: '/flooring/engineered-timber' },
      { label: 'Natural Timber', href: '/flooring/timber' },
      { label: 'Vinyl', href: '/flooring/vinyl' },
    ],
  },
  {
    label: 'Carpet',
    href: '/carpet',
    type: 'list',
    items: [
      /* Triexta is the one carpet range already built out in this repo, and it
         lives under /tiles — point at the real page rather than a placeholder. */
      { label: 'Triexta', href: '/tiles/triexta' },
      { label: 'Wool', href: '/carpet/wool' },
      { label: 'DuraTuft®', href: '/carpet/duratuft' },
      { label: 'Polyester', href: '/carpet/polyester' },
      { label: 'Solution Dyed Nylon', href: '/carpet/solution-dyed-nylon' },
      { label: 'Polypropylene', href: '/carpet/polypropylene' },
      { label: 'Commercial Carpet and Tiles', href: '/carpet/commercial-carpet-and-tiles' },
    ],
  },
  { label: 'Installation', href: '/installation' },
  { label: 'FAQ’s', href: '/faqs' },
]
