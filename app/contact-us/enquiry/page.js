import Contact from '@/components/sections/Contact'

/* The "Enquire" button in the header, the floating rail and every collection
   card point here, so this route renders the contact page rather than 404ing.
   Canonical stays /contact-us so the two URLs are not treated as duplicates. */

export const metadata = {
  title: 'Enquiry — Capital Tiles & Flooring, Canberra',
  description:
    'Send an enquiry to Capital Tiles & Flooring — tiles, flooring, carpet and installation across Canberra, with a free measure and quote.',
  alternates: { canonical: '/contact-us' },
}

export default function EnquiryPage() {
  return <Contact />
}
