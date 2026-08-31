/* Living Room and Hallway tiles.

   The same twelve ranges the live capitaltiles.com.au "Living Room and Hallway"
   collection lists. The records themselves come from the main tiles data, so
   names, brands, blurbs and the colour / finish / size options stay in one
   place and cannot drift apart.
*/

import { TILES } from './tilesData'

const HANDLES = [
  'starry',
  'trav-vein-cut',
  'trav-cross-cut',
  'cocoon-collection',
  'unico-grey',
  'bari-collection',
  'ardesia-collection',
  'quartzite-paver',
  'petra-mix-paver',
  'imperial-stone-paver',
  'crest-paver',
  'blaze-paver',
]

const byHandle = new Map(TILES.map((t) => [t.handle, t]))

export const LIVING_ROOM = HANDLES.map((h) => byHandle.get(h)).filter(Boolean)
