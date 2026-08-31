/* Tiles ranges that sit on the /tiles grid but in no sub-collection we hold
   detail data for.

   Riverstone is an outdoor range; the three Muses ranges are listed under
   Indoor / Travertine Look on the live site, and neither of those has a
   collection page here, so they hang off Floor Tiles instead. Names, brands,
   options and copy come from the live capitaltiles.com.au catalogue.

   These four have no per-range image folder, so the gallery is filled at run
   time from the catalogue feed (liveGallery) exactly as the kitchen ranges do,
   with the collection card as the fallback shot.
*/

export const TILES_EXTRA_PRODUCTS = [
  {
    handle: "riverstone",
    name: "Riverstone",
    brand: "HF Tiles",
    card: "/img/outdoor/riverstone.jpg",
    images: ["/img/outdoor/riverstone.jpg"],
    liveGallery: true,
    tagline: "P5 external finish in a 600x600 format",
    short: "Riverstone by HF Tiles. Silver, external finish, 600x600 and a P5 slip rating. On display in our Mitchell showroom.",
    overview: [
      "Riverstone is part of the outdoor range we hold at Capital Tiles, supplied by HF Tiles. It runs in a single silver tone with an external finish, which is what you want underfoot on a path, a patio or around a pool surround.",
      "The format published for this range is 600x600 with a rectified edge. Thickness is 9mm and it carries a P5 slip rating, the highest of the pendulum classifications, so it stays sure-footed once it is wet. We list it under Floor Tiles and Outdoor Tiles.",
      "Come and see a full tile rather than a sample chip — the range sits in our Mitchell showroom where you can carry one to the doorway and check the colour in daylight. We supply trade and homeowners, and our own installers can take care of removal, substrate preparation, laying, grouting and sealing. The measure and quote is free.",
    ],
    features: [
      "Colour: Silver",
      "Finish: External",
      "Size: 600x600",
      "Thickness: 9mm",
      "Slip rating: P5",
      "Listed under Floor Tiles and Outdoor Tiles",
    ],
    seoTitle: "Riverstone Outdoor Tiles | Capital Tiles",
    seoDesc: "Riverstone in an external finish, 600x600, P5 slip rating. Outdoor tiles supplied and installed across Canberra by Capital Tiles.",
    colours: ["Silver"],
    sizes: ["600x600"],
    finishes: ["External"],
    thickness: ["9mm"],
    slip: ["P5"],
    material: [],
    specCols: [],
    specRows: [],
    rooms: [
      { label: "Outdoor Tiles", href: "/tiles/outdoor" },
      { label: "Floor Tiles", href: "/tiles/floor-tiles" },
    ],
  },
  {
    handle: "the-louvre",
    name: "The Louvre",
    brand: "Muses",
    card: "/img/all-tiles/the-louvre.jpg",
    images: ["/img/all-tiles/the-louvre.jpg"],
    liveGallery: true,
    tagline: "4D Glue & Grit in a 600x1200 format",
    short: "The Louvre by Muses. Glazed porcelain in a 4D Glue & Grit finish and a single 600x1200 format. On display in our Mitchell showroom.",
    overview: [
      "The Louvre is a refined glazed porcelain tile from Muses Australia in a 600x1200 format with a 4D Glue & Grit full body finish. It delivers a premium, contemporary look and strong performance on both floors and walls.",
      "The large format keeps grout lines to a minimum, which is what makes a room read as one continuous surface rather than a grid. It suits modern living spaces, bathrooms, kitchens and commercial areas alike.",
      "Come and see a full tile rather than a sample chip — the range sits in our Mitchell showroom where you can carry one to the doorway and check the colour in daylight. We supply trade and homeowners, and our own installers can take care of removal, substrate preparation, laying, grouting and sealing. The measure and quote is free.",
    ],
    features: [
      "Finish: 4D Glue & Grit",
      "Size: 600x1200",
      "Glazed porcelain, full body",
      "Rated for floor and wall use",
      "Suits residential and commercial projects",
      "Full tiles on display in the Mitchell showroom",
    ],
    seoTitle: "The Louvre Tiles | Capital Tiles",
    seoDesc: "The Louvre by Muses in a 4D Glue & Grit finish, 600x1200. Glazed porcelain floor and wall tiles supplied and installed across Canberra by Capital Tiles.",
    colours: [],
    sizes: ["600x1200"],
    finishes: ["4D Glue & Grit"],
    thickness: [],
    slip: [],
    material: ["Glazed porcelain"],
    specCols: [],
    specRows: [],
    rooms: [
      { label: "Floor Tiles", href: "/tiles/floor-tiles" },
      { label: "Wall Tiles", href: "/tiles/wall" },
    ],
  },
  {
    handle: "pilates-green",
    name: "Pilates Green",
    brand: "Muses",
    card: "/img/all-tiles/pilates-green.jpg",
    images: ["/img/all-tiles/pilates-green.jpg"],
    liveGallery: true,
    tagline: "4D Glue & Grit in a 600x1200 format",
    short: "Pilates Green by Muses. Large-format porcelain from the Elegance Collection in a 4D Glue & Grit finish and a 600x1200 format. On display in our Mitchell showroom.",
    overview: [
      "Pilates Green is a premium large-format porcelain tile from the Muses Australia Elegance Collection. It brings a striking but still refined green tone to contemporary interiors, shaping rooms that feel fresh rather than heavy.",
      "The format published for this range is 600x1200 in a 4D Glue & Grit finish, rated for both floors and walls. A colour this definite works best where it has room to breathe — a feature wall, a splashback, a powder room — with quieter surfaces around it.",
      "Come and see a full tile rather than a sample chip — the range sits in our Mitchell showroom where you can carry one to the doorway and check the colour in daylight. We supply trade and homeowners, and our own installers can take care of removal, substrate preparation, laying, grouting and sealing. The measure and quote is free.",
    ],
    features: [
      "Finish: 4D Glue & Grit",
      "Size: 600x1200",
      "Muses Elegance Collection",
      "Large-format porcelain",
      "Rated for floor and wall use",
      "Full tiles on display in the Mitchell showroom",
    ],
    seoTitle: "Pilates Green Tiles | Capital Tiles",
    seoDesc: "Pilates Green by Muses in a 4D Glue & Grit finish, 600x1200. Large-format green porcelain tiles supplied and installed across Canberra by Capital Tiles.",
    colours: ["Green"],
    sizes: ["600x1200"],
    finishes: ["4D Glue & Grit"],
    thickness: [],
    slip: [],
    material: ["Porcelain"],
    specCols: [],
    specRows: [],
    rooms: [
      { label: "Floor Tiles", href: "/tiles/floor-tiles" },
      { label: "Wall Tiles", href: "/tiles/wall" },
    ],
  },
  {
    handle: "navona-cross",
    name: "Navona Cross",
    brand: "Muses",
    card: "/img/all-tiles/navona-cross.jpg",
    images: ["/img/all-tiles/navona-cross.jpg"],
    liveGallery: true,
    tagline: "4D Glue & Grit in 2 colours",
    short: "Navona Cross by Muses. 2 colours, a 4D Glue & Grit finish and a single 600x1200 format. On display in our Mitchell showroom.",
    overview: [
      "Navona Cross is a glazed porcelain tile from Muses Australia in a 600x1200 format, finished with a refined cross-cut texture. It runs in beige and ivory, so there is a tone here for a warm room and for a lighter, cooler one.",
      "Its durable construction and subtle pattern make it suited to both floor and wall work in modern interiors — living areas, kitchens and bathrooms — for a look that stays contemporary without dating quickly.",
      "Come and see a full tile rather than a sample chip — the range sits in our Mitchell showroom where you can carry one to the doorway and check the colour in daylight. We supply trade and homeowners, and our own installers can take care of removal, substrate preparation, laying, grouting and sealing. The measure and quote is free.",
    ],
    features: [
      "Colours: Beige and Ivory",
      "Finish: 4D Glue & Grit",
      "Size: 600x1200",
      "Glazed porcelain",
      "Rated for floor and wall use",
      "Full tiles on display in the Mitchell showroom",
    ],
    seoTitle: "Navona Cross Tiles | Capital Tiles",
    seoDesc: "Navona Cross by Muses in beige and ivory, 4D Glue & Grit finish, 600x1200. Glazed porcelain tiles supplied and installed across Canberra by Capital Tiles.",
    colours: ["Beige", "Ivory"],
    sizes: ["600x1200"],
    finishes: ["4D Glue & Grit"],
    thickness: [],
    slip: [],
    material: ["Glazed porcelain"],
    specCols: [],
    specRows: [],
    rooms: [
      { label: "Floor Tiles", href: "/tiles/floor-tiles" },
      { label: "Wall Tiles", href: "/tiles/wall" },
    ],
  },
]

export function byHandle(handle) {
  return TILES_EXTRA_PRODUCTS.find((p) => p.handle === handle)
}
