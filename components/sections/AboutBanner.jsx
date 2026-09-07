import s from './AboutBanner.module.css'

/* Page title bar, built to the supplied reference: a dimmed room photo under a
   small eyebrow and an oversized uppercase headline.

   It used to rotate two slides on a 7-second timer with two flush edge arrows
   as the only hint that a second one existed — no dots, no pause control (so
   the rotation also failed WCAG 2.2.2), and the page's strongest claim, "since
   1977", sat in the slide nobody waited for. One slide now, and the claim is
   in the page title where it belongs. */

export default function AboutBanner() {
  return (
    <section className={s.banner} data-hero="" aria-label="About Capital Tiles">
      <img
        className={s.shot}
        src="/img/about/banner-1.jpg"
        alt=""
        fetchPriority="high"
        decoding="sync"
      />
      <span className={s.shade} aria-hidden="true" />

      <div className={'container ' + s.copy}>
        <p className={s.eyebrow}>About Capital Tiles &amp; Flooring</p>
        <h1 className={s.title}>
          <span>Supplying Canberra</span>
          <span>floors since 1977</span>
        </h1>
      </div>
    </section>
  )
}
