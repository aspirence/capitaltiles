import ComingSoon, { titleFromSlug } from '@/components/sections/ComingSoon'

/* Not every link on the site has a page behind it yet. This catch-all gives the
   ones that do not a real destination — without it, Next prefetches dead routes
   on load and each nav click lands on a 404. */

/* Every address the site does not have a page for lands here and answers 200,
   so without the robots tag Google indexes an unbounded set of thin, nearly
   identical "in production" pages — one for every mistyped or stale URL anyone
   ever links to. `follow: true` keeps the crumbs and CTAs on the page working
   as ordinary links out.

   The separator is a pipe because that is what the rest of the site uses; this
   route was the one place still on an em dash. */
export async function generateMetadata({ params }) {
  const { slug } = await params
  return {
    title: titleFromSlug(slug) + ' | Capital Tiles',
    robots: { index: false, follow: true },
  }
}

export default async function CatchAll({ params }) {
  const { slug } = await params
  return <ComingSoon slug={slug || []} />
}
