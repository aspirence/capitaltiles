import Link from 'next/link'
import { POLICIES, BUSINESS } from '@/components/policyData'
import s from '@/components/sections/PolicyPage.module.css'

export const metadata = {
  title: 'Store Policies | Capital Tiles & Flooring',
  description:
    'Refunds, privacy, shipping and terms of service for Capital Tiles & Flooring, Canberra. Written plainly, in line with Australian Consumer Law.',
  alternates: { canonical: '/policies' },
}

export default function PoliciesIndexPage() {
  return (
    <>
      <section className={s.head}>
        <div className="container">
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i>/</i>
            <span>Store Policies</span>
          </nav>

          <p className="eyebrow">The fine print, in plain words</p>
          <h1 className={s.title}>Store Policies</h1>
          <p className={s.lede}>
            Four documents cover how we trade: what happens if something has to come back, how we
            handle your details, how the goods reach you, and the terms you agree to when you deal
            with us. Nothing here reduces your rights under Australian Consumer Law.
          </p>
          <p className={s.updated}>Last reviewed {BUSINESS.updated}</p>
        </div>
      </section>

      <section className={'sectionPad ' + s.more}>
        <div className="container">
          <ul className={s.moreGrid}>
            {POLICIES.map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} className={s.moreCard}>
                  <span className={s.moreName}>{p.title}</span>
                  <span className={s.moreCopy}>{p.eyebrow}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
