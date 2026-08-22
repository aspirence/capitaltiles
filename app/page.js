import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Explore from '@/components/sections/Explore'
import Collections from '@/components/sections/Collections'
import Spaces from '@/components/sections/Spaces'
import Bathware from '@/components/sections/Bathware'
import Visualizer from '@/components/sections/Visualizer'
import Ranges from '@/components/sections/Ranges'
import Commercials from '@/components/sections/Commercials'
import Journey from '@/components/sections/Journey'
import Blogs from '@/components/sections/Blogs'
import Social from '@/components/sections/Social'
import Press from '@/components/sections/Press'
import WhyChoose from '@/components/sections/WhyChoose'

/* Homepage running order. Light and dark sections alternate on purpose so the
   page breathes between the two dark anchors (Collections and Bathware). */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyChoose />
      <Explore />
      <Collections />
      <Spaces />
      <Bathware />
      <Visualizer />
      <Ranges />
      <Commercials />
      <Journey />
      <Blogs />
      <Social />
      <Press />
    </>
  )
}
