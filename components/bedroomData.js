/* Bedroom tiles.

   There is no bedroom collection on the live site to copy, so this one is
   picked rather than mirrored: the timber looks and the soft matt stone ranges,
   plus the marbles worth using where a main bedroom wants a feature floor.
   Pavers and external finishes are deliberately left out — they are outdoor
   formats and read wrong underfoot in a bedroom.

   The records come from the main tiles data, so names, brands, blurbs and the
   colour / finish / size options stay in one place.
*/

import { TILES } from './tilesData'

const HANDLES = [
  '21203-natural',
  '21205-200x1200-matt',
  '21206-off-white',
  'starry',
  'trav-vein-cut',
  'trav-cross-cut',
  'cocoon-collection',
  'unico-grey',
  'onyx',
  'calacatta-gold',
  'picasso',
]

const byHandle = new Map(TILES.map((t) => [t.handle, t]))

export const BEDROOM = HANDLES.map((h) => byHandle.get(h)).filter(Boolean)
