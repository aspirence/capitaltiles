import Link from 'next/link'
import { SHOWROOM, SERVICE_AREA } from '@/components/siteData'
import s from './Featured.module.css'

/* ---------------------------------------------------------------------------
   The showroom band — the About page's proof block.

   The file is still called Featured because /about is its only consumer and
   renaming it mid-flight would break nothing but would collide with work in
   other templates; the section it renders is no longer a "Featured In" strip.
   What stood here was four tile categories under one shared photo — the same
   range index Explore already runs on the homepage, and nothing about the
   business. This carries what an About page owes a visitor instead: where the
   showroom is, when it is open, and what the company actually does.

   Shape borrowed from the ProductDetail range band: copy one side, a plate
   bleeding off the other, then a proof strip along the foot.
   ------------------------------------------------------------------------- */

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOWROOM.address)}`

const PROOF = [
  {
    k: 'Since 1977',
    v: 'Nearly fifty years supplying and laying floors for Canberra homes, builders and fitouts.',
  },
  {
    k: 'Our own installers',
    v: 'Old floor lifted, subfloor prepared, laid, grouted and sealed by the team that quoted it.',
  },
  {
    k: 'Free measure & quote',
    v: SERVICE_AREA,
  },
  {
    k: 'Every surface',
    v: 'Porcelain and ceramic tiles, hybrid, laminate, engineered and natural timber, vinyl and carpet.',
  },
]

export default function AboutShowroom() {
  return (
    <section className={s.section} aria-label="The Mitchell showroom">
      <div className={s.grid}>
        <div className={s.copy}>
          <p className={s.eyebrow} data-reveal>The Mitchell showroom</p>

          <h2 className={s.title} data-reveal style={{ '--reveal-delay': '80ms' }}>
            Tiles, flooring and carpet in the one room
          </h2>

          <p className={s.lead} data-reveal style={{ '--reveal-delay': '150ms' }}>
            Everything we supply is out on the floor at Pelle Street: tiles at full sheet size,
            hybrid and timber laid down to walk on, and carpet set out by fibre. Hold a wall tile
            against a floorboard against a carpet without driving anywhere else, then take the
            shortlist home and look at it in your own light.
          </p>

          <dl className={s.facts} data-reveal style={{ '--reveal-delay': '220ms' }}>
            <div>
              <dt>Showroom</dt>
              <dd>{SHOWROOM.street}, {SHOWROOM.suburb}</dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>{SHOWROOM.hours}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href={SHOWROOM.phoneHref}>{SHOWROOM.phone}</a></dd>
            </div>
          </dl>

          <div className={s.actions} data-reveal style={{ '--reveal-delay': '300ms' }}>
            <a
              className="cta ctaLight"
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get directions</span>
            </a>
            <Link href="/contact-us" className="cta ctaGhost">
              <span>Contact the showroom</span>
            </Link>
          </div>
        </div>

        <div className={s.plate} data-reveal="scale">
          <img
            src="/img/about/why-choose.jpg"
            alt="Large-format stone-look porcelain on the wall and floor of a living room"
            loading="lazy"
          />
        </div>
      </div>

      {/* proof strip — the years, the team and the service, stated once */}
      <div className={s.proof}>
        {PROOF.map((item, i) => (
          <div key={item.k} className={s.fact} data-reveal style={{ '--reveal-delay': i * 80 + 'ms' }}>
            <p className={s.factKey}>{item.k}</p>
            <p className={s.factVal}>{item.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
