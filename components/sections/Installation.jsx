import Link from 'next/link'
import InstallWhy from './InstallWhy'
import s from './Installation.module.css'

/* Installation service page: banner, intro, what we install, why choose us,
   service areas, and a closing measure-and-quote band. Content rewritten from
   the live capitaltiles.com.au installation-service page. */

const WORK = [
  {
    title: 'Hybrid & Timber Flooring',
    copy: 'Rigid-core hybrid, laminate, engineered timber and vinyl planks, laid over a subfloor we have levelled and checked for moisture first. Click systems float over a sound existing floor; glue-down goes straight to the slab.',
    img: '/img/installation/hybrid-timber.png',
    href: '/flooring/hybrid-flooring',
  },
  {
    title: 'Porcelain & Feature Tiles',
    copy: 'Floors, walls, splashbacks, showers and outdoor paving. We handle the setting out so cuts land where you will not notice them, then grout, seal and finish the edges properly.',
    img: '/img/installation/porcelain-tiles.png',
    href: '/tiles/wall',
  },
  {
    title: 'Measure, Supply & Install',
    copy: 'One team from the first site visit to the final clean-up. You get one quote covering product, preparation, labour and rubbish removal, so nothing appears on the invoice that was not on the quote.',
    img: '/img/installation/measure-supply-install.png',
    href: '/contact-us/enquiry',
  },
]

const REASONS = [
  {
    title: 'Free Measure & Quote',
    copy: 'We come to you, measure the rooms accurately, check what is under the existing floor, and put the price in writing. No obligation, no pressure.',
    icon: '/img/installation/free-quote.png',
  },
  {
    title: 'Work We Stand Behind',
    copy: 'Straight lines, even grout joints, tight thresholds and edges that are finished rather than covered up. If something is not right, we come back and fix it.',
    icon: '/img/installation/quality.png',
  },
  {
    title: 'Advice Before You Buy',
    copy: 'Slip ratings for a wet area, which fibre suits a hallway, whether hybrid or vinyl fits your subfloor. We would rather talk you into the right product than the dearest one.',
    icon: '/img/installation/advice.png',
  },
  {
    title: 'Start to Finish',
    copy: 'Old floor removal, subfloor preparation, laying, grouting, sealing and the clean-up afterwards. You deal with us the whole way through, not four different trades.',
    icon: '/img/installation/start-to-finish.png',
  },
]

const POINTS = [
  'Tiles, flooring and carpet compared side by side in one showroom',
  'Products chosen for Canberra conditions, not a national catalogue',
  'One quote covering supply, preparation and installation',
  'A clear start date and a room you can use again when we leave',
]

const AREAS = [
  'Canberra', 'Queanbeyan', 'Gungahlin', 'Belconnen', 'Tuggeranong',
  'Woden', 'Yass', 'Bungendore', 'Murrumbateman',
]

export default function Installation() {
  return (
    <>
      {/* ---------- banner ---------- */}
      <section className={s.banner}>
        <img src="/img/installation/banner.png" alt="" />
        <div className={s.bannerShade} aria-hidden="true" />
        <div className={'container ' + s.bannerInner}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i aria-hidden="true">/</i>
            <span>Installation</span>
          </nav>
          <p className={s.bannerEyebrow}>Supply &middot; Install &middot; Free Measure &amp; Quote</p>
          <h1 className={s.bannerTitle}>Installation Service</h1>
        </div>
      </section>

      {/* ---------- intro ---------- */}
      <section className={'sectionPad ' + s.intro}>
        <div className={'container ' + s.introGrid}>
          <div className={s.introHead} data-reveal>
            <p className="eyebrow">Canberra and surrounds</p>
            <h2 className={'title ' + s.h2 + ' ' + s.introTitle}>
              We do not just sell the floor. We lay it.
            </h2>
            <ul className={s.introMarks}>
              <li>Our own installers, not subcontractors</li>
              <li>Free measure and quote, on site</li>
              <li>One quoted price, start to finish</li>
            </ul>
          </div>
          <div className={s.introCopy} data-reveal style={{ '--reveal-delay': '120ms' }}>
            <p>
              Plenty of places will sell you tiles and wish you luck. We would rather see the job
              through — from working out what suits the room, to handing it back swept and ready to
              walk on. Our own installers do the work, so the person who quoted your floor is the
              person accountable for how it turns out.
            </p>
            <p>
              Renovation, new build or an investment property between tenants, the process is the
              same: we measure on site, tell you what the subfloor needs before anything is laid,
              and give you one price with no line items appearing later.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- what we install ---------- */}
      <section className={'sectionPad ' + s.work}>
        <div className="container">
          <header className={s.head}>
            <p className="eyebrow" data-reveal>What we install</p>
            <h2 className={'title ' + s.h2} data-reveal style={{ '--reveal-delay': '80ms' }}>
              Floors, walls and everything underfoot
            </h2>
          </header>

          <ul className={s.workGrid}>
            {WORK.map((w, i) => (
              <li key={w.title} data-reveal style={{ '--reveal-delay': i * 90 + 'ms' }}>
                <Link href={w.href} className={s.workCard}>
                  <span className={'zoomFrame ' + s.workFrame}>
                    <img src={w.img} alt="" loading="lazy" />
                  </span>
                  <span className={s.workBody}>
                    <span className={s.workTitle}>{w.title}</span>
                    <span className={s.workCopy}>{w.copy}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- why choose us ---------- */}
      <section className={'sectionPad ' + s.why}>
        <div className="container">
          <header className={s.head}>
            <p className="eyebrow" data-reveal>Why Capital Tiles</p>
            <h2 className={'title ' + s.h2} data-reveal style={{ '--reveal-delay': '80ms' }}>
              What you get when we do the job
            </h2>
          </header>

          <InstallWhy reasons={REASONS} />
        </div>
      </section>

      {/* ---------- feature band ---------- */}
      <section className={s.band}>
        <div className={'container ' + s.bandGrid}>
          <div className={s.bandMedia} data-reveal="left">
            <img src="/img/installation/feature-tile.png" alt="" loading="lazy" />
          </div>
          <div className={s.bandCopy} data-reveal="right">
            <p className="eyebrow">Why it matters</p>
            <h2 className={'title ' + s.h2}>A floor you stop thinking about</h2>
            <ul className={s.points}>
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={s.areasLabel}>We install across</p>
            <p className={s.areas}>{AREAS.join(' · ')}</p>
          </div>
        </div>
      </section>

      {/* ---------- closing cta ---------- */}
      <section className={'sectionPad ' + s.cta}>
        <div className={'container ' + s.ctaInner}>
          <h2 className={'title ' + s.ctaTitle} data-reveal>
            Ready to get a real price on it?
          </h2>
          <p className={s.ctaLede} data-reveal style={{ '--reveal-delay': '90ms' }}>
            Book a free measure and quote. We will visit the site, check the subfloor, talk through
            products and give you a written price with no obligation.
          </p>
          <div className={s.ctaRow} data-reveal style={{ '--reveal-delay': '160ms' }}>
            <Link href="/contact-us/enquiry" className="cta">
              <span>Book a Free Measure &amp; Quote</span>
            </Link>
            <a href="tel:0262538158" className={s.phone}>02 6253 8158</a>
          </div>
        </div>
      </section>
    </>
  )
}
