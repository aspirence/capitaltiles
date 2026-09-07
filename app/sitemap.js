import { PAGE_INDEX, SEARCH_INDEX } from '@/components/searchData'
import { POLICIES } from '@/components/policyData'
import { POSTS } from '@/components/blogData'

/* ---------------------------------------------------------------------------
   The sitemap, assembled from the same data the pages are built from.

   searchData.js already resolves both halves of this: PAGE_INDEX is every
   collection and service page, and SEARCH_INDEX is every range at the one URL
   its detail page actually lives at, deduplicated. Listing routes by hand here
   would rot the first time a collection is added, and would quietly disagree
   with the canonical each page returns.

   Nothing that renders ComingSoon appears below. That component backs the
   catch-all and the miss branch of the three /<section>/<handle> routes, and
   neither source holds an address that lands there.
   ------------------------------------------------------------------------- */

const SITE_URL = 'https://capitaltiles.com.au'
const abs = (path) => SITE_URL + path

/* /contact-us/enquiry renders the contact page and canonicalises to
   /contact-us, so submitting both would offer Google a duplicate to choose
   between. */
const CANONICALISED_AWAY = new Set(['/contact-us/enquiry'])

/* A section landing — /tiles, /flooring, /carpet — is one segment deep and is
   the entry point to a whole catalogue, so it outranks the collections beneath
   it, which in turn outrank a single range. */
function priorityFor(page) {
  if (page.section === 'Service') return 0.7
  return page.href.split('/').length === 2 ? 0.9 : 0.8
}

export default function sitemap() {
  return [
    { url: abs('/'), changeFrequency: 'weekly', priority: 1 },

    ...PAGE_INDEX.filter((page) => !CANONICALISED_AWAY.has(page.href)).map((page) => ({
      url: abs(page.href),
      changeFrequency: 'weekly',
      priority: priorityFor(page),
    })),

    ...SEARCH_INDEX.map((product) => ({
      url: abs(product.href),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),

    /* The only routes with a real publication date to declare — everywhere else
       lastModified would just be the time of the last build, which says nothing
       about whether the page changed. */
    ...POSTS.map((post) => ({
      url: abs(`/blogs/${post.slug}`),
      lastModified: post.iso,
      changeFrequency: 'yearly',
      priority: 0.5,
    })),

    ...POLICIES.map((policy) => ({
      url: abs(`/policies/${policy.slug}`),
      changeFrequency: 'yearly',
      priority: 0.3,
    })),
  ]
}
