import { notFound } from 'next/navigation'
import PolicyPage from '@/components/sections/PolicyPage'
import { POLICIES, policyBySlug } from '@/components/policyData'

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const policy = policyBySlug(slug)
  if (!policy) return { title: 'Policy not found | Capital Tiles' }
  return {
    title: `${policy.title} | Capital Tiles & Flooring`,
    description: policy.lede.slice(0, 155),
    alternates: { canonical: `/policies/${policy.slug}` },
  }
}

export default async function StorePolicyPage({ params }) {
  const { slug } = await params
  const policy = policyBySlug(slug)
  if (!policy) notFound()

  return <PolicyPage policy={policy} />
}
