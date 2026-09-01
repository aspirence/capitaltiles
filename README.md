# Capital Tiles — new homepage

A fresh Next.js 15 (App Router) build of the Capital Tiles homepage, assembled
from the two supplied references:

| Area | Modelled on |
| --- | --- |
| Header, navigation, mega menus | **Simpolo** |
| Hero banner | **Simpolo** |
| Footer | **Hindware** |
| Everything in between | a blend of both, with scroll animation throughout |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node 18.18+ required.

## Layout

```
app/
  layout.js          Header + Footer + floating rail + the reveal observer
  page.js            homepage running order
  globals.css        tokens, local @font-face, the [data-reveal] system
  [...slug]/         "in production" page so every homepage link resolves
components/
  Header.jsx         utility strip, main bar, mega panels, mobile drawer
  Hero.jsx           full-bleed carousel (autoplay, swipe, keyboard, dots)
  Footer.jsx         black link deck + white address band + copyright
  Carousel.jsx       scroll-snap carousel used by three sections
  Reveal.jsx         one IntersectionObserver driving every reveal
  FloatingActions.jsx enquiry / WhatsApp / back-to-top
  navData.js         navigation taxonomy
  sections/          the body sections
public/
  fonts/             Corbert + Fraunces + DM Sans, served locally
  img/               all imagery, local
```

## Homepage order

Hero → About (showroom, with the address, hours and phone) → Explore (tab rail
over an editorial index) → Spaces (expanding rack) → Bathware (the installation
pitch) → Visualizer (measure & quote / showroom) → Advice (films and articles on
one rail) → Social rails.

Eight sections, down from fourteen. Ranges, Journey and Press were cut; Why
Choose folded into About, Collections into Explore, and Commercials into Blogs
to become Advice. See the note in `app/page.js` for what each one duplicated.

## Animation

Everything runs on CSS transitions driven by a single observer in
`components/Reveal.jsx`. Mark any element with `data-reveal` (optionally
`="left" | "right" | "scale" | "blur" | "mask"`) and set `--reveal-delay`
inline to stagger it. Content inside a scroll container needs
`data-reveal-scope` on that container — a card parked outside a carousel track
is clipped by the track and never intersects the viewport on its own.

`prefers-reduced-motion` disables reveals, the marquees, the Ken Burns push and
the autoplay.

## Assets

No CDN, no remote fonts, no remote images — everything is served from
`public/`. Imagery was sourced from the reference material and filtered: no
third-party logos, brand marks or brand-ambassador likenesses are used
anywhere.

## Not built yet

Only the homepage exists. Every link on it resolves to the `[...slug]`
placeholder page, so nothing 404s and Next's link prefetching stays quiet —
replace that route as real pages get built.
