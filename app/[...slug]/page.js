import ComingSoon, { titleFromSlug } from '@/components/sections/ComingSoon'

/* Not every link on the site has a page behind it yet. This catch-all gives the
   ones that do not a real destination — without it, Next prefetches dead routes
   on load and each nav click lands on a 404. */

export async function generateMetadata({ params }) {
  const { slug } = await params
  return { title: titleFromSlug(slug) + ' — Capital Tiles' }
}

export default async function CatchAll({ params }) {
  const { slug } = await params
  return <ComingSoon slug={slug || []} />
}
