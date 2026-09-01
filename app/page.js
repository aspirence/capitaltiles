import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Explore from '@/components/sections/Explore'
import Spaces from '@/components/sections/Spaces'
import Bathware from '@/components/sections/Bathware'
import Visualizer from '@/components/sections/Visualizer'
import Advice from '@/components/sections/Advice'
import Social from '@/components/sections/Social'

/* Homepage running order. Light and dark sections alternate on purpose so the
   page breathes between its dark anchors, Explore and Bathware.

   This was fourteen sections. It sold the catalogue five times and the business
   once, and /flooring/hybrid-flooring was reachable from seven of them.

   Cut — each restated something an earlier section had already said, and every
   destination they carried still appears above them:
     Ranges   a fourth pass at Tiles / Flooring / Carpet / Installation.
     Journey  its first two cards were Visualizer's two doors, its last two were
              Explore's index, and FloatingActions has been offering the same
              enquiry form since 700px of scroll.
     Press    a band of four magazine mastheads the business does not own.

   Merged:
     WhyChoose  -> About    It reopened with About's own paragraph almost word
                            for word. Its four unique facts — address, hours,
                            phone, email — are now permanently visible there
                            instead of clipped behind a "Read more".
     Collections -> Explore  Byte-identical routes one section apart. Explore
                            kept the coverage, Collections kept the treatment.
     Commercials -> Advice   Two near-identical carousels covering the same
                            ground, one in film and one in writing. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Explore />
      <Spaces />
      <Bathware />
      <Visualizer />
      <Advice />
      <Social />
    </>
  )
}
