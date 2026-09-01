/* The showroom's name, address and phone — the one place they are written.

   These four facts used to be typed out separately in Footer.jsx, in the
   homepage's WhyChoose section and again inside faqData.js. WhyChoose kept its
   copy behind a "Read more" collapse, which is exactly the copy nobody
   remembers to update: a stale Saturday hour sends someone to Pelle Street to
   find the door shut. Import from here instead of retyping.

   faqData.js still spells the hours and the number out inside answer prose,
   where a constant cannot easily go — if these change, grep for "6253" and
   "9am" before you ship. */

export const SHOWROOM = {
  street: '3 Pelle Street',
  suburb: 'Mitchell ACT 2911, Canberra',
  address: '3 Pelle Street, Mitchell ACT 2911, Canberra',
  hours: 'Mon–Fri 9am–5pm · Sat 10am–3pm',
  phone: '02 6253 8158',
  /* tel: wants no spaces, and the international form works from a mobile. */
  phoneHref: 'tel:+61262538158',
  email: 'cbr@capitaltiles.com.au',
}

/* Where the free measure and quote runs to. Kept as prose rather than a list
   because it reads as a sentence everywhere it is used. */
export const SERVICE_AREA =
  'Canberra and Queanbeyan, out to Yass, Bungendore and Murrumbateman, and across Gungahlin, Belconnen, Tuggeranong and Woden.'
