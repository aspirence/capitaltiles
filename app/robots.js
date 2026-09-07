/* Same origin app/sitemap.js uses — see the note in app/layout.js. */
const SITE_URL = 'https://capitaltiles.com.au'

/* /api is the search box's lookup, the product-variant fetch and the enquiry
   form's endpoint: JSON with nothing in it for a crawler, and it duplicates
   catalogue text that is already indexable on the pages themselves. */
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
