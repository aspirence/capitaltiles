import Contact from '@/components/sections/Contact'

/* The "Enquire" button in the header, the floating rail and every collection
   card point here, so this route renders the contact page rather than 404ing.
   Canonical stays /contact-us so the two URLs are not treated as duplicates.

   variant="enquiry" is what stops it being a silent alias: the crumb reads
   Contact Us / Enquiry, the head band talks about the quote rather than saying
   hello, and on a phone the form comes before the showroom rail — the visitor
   pressed a button to get here. */

export const metadata = {
  title: 'Enquiry — Capital Tiles & Flooring, Canberra',
  description:
    'Send an enquiry to Capital Tiles & Flooring — tiles, flooring, carpet and installation across Canberra, with a free measure and quote.',
  alternates: { canonical: '/contact-us' },
}

export default function EnquiryPage() {
  return <Contact variant="enquiry" />
}
