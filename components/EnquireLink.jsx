import Link from 'next/link'

/* ---------------------------------------------------------------------------
   An enquiry CTA that remembers what the visitor was looking at.

   Every "Enquire Now" on the site is a bare link to /contact-us/enquiry, so a
   visitor three clicks deep in Carrara Matt arrives at an empty form with no
   record of how they got there. The showroom then gets "I want tiles", and has
   to write back asking which range before it can quote anything.

   This carries the range and the reason across in the query string; the form on
   the other end reads them and prefills itself. Both are optional and an empty
   one is left out of the URL entirely, so a generic CTA still lands on a clean
   /contact-us/enquiry.

     <EnquireLink range="Carrara Matt" subject="Product enquiry" className="cta">
       <span>Enquire Now</span>
     </EnquireLink>
   ------------------------------------------------------------------------- */
export default function EnquireLink({ range, subject, className, children, ...rest }) {
  const params = new URLSearchParams()
  if (range) params.set('range', range)
  if (subject) params.set('subject', subject)

  const query = params.toString()
  const href = query ? `/contact-us/enquiry?${query}` : '/contact-us/enquiry'

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
