/* Store policies, written for Capital Tiles & Flooring.

   The previous site ran Shopify's stock templates, which described a mail-order
   clothing shop — USPS and ePacket shipping, a European cooling-off period,
   returns on perishable goods and beauty products. None of that describes a
   Canberra tile and flooring supplier that sells by the square metre and lays
   what it sells, so the substance has been rewritten around how this business
   actually trades. The commitments carried across from the old pages are the
   30-day return window, the condition and proof-of-purchase requirements, the
   inspect-on-delivery rule and the 10-business-day refund.
*/

export const BUSINESS = {
  name: 'Capital Tiles & Flooring',
  entity: 'Bhavani Engineering Works',
  address: '3 Pelle Street, Mitchell ACT 2911',
  registered: '2/3 Pelle Street, Mitchell ACT 2911, Australia',
  phone: '02 6253 8158',
  phoneHref: 'tel:0262538158',
  email: 'cbr@capitaltiles.com.au',
  updated: 'August 2026',
}

export const POLICIES = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    eyebrow: 'Returns, refunds and faulty goods',
    lede:
      'Tiles, flooring and carpet are ordered by the square metre and cut to your job, so returns work a little differently here than they do in a clothing shop. This sets out when we can take stock back, what we need from you, and how a refund is paid.',
    sections: [
      {
        heading: 'Your rights under Australian Consumer Law',
        paragraphs: [
          'Nothing on this page reduces the rights you have under Australian Consumer Law. If a product is faulty, is not fit for the purpose we said it was, or does not match the sample or description you were shown, you are entitled to a repair, replacement or refund, and to compensation for any other reasonably foreseeable loss. Those rights apply whatever this policy says, and they do not expire after 30 days.',
        ],
      },
      {
        heading: 'The 30-day return window',
        paragraphs: [
          'For change-of-mind returns on stocked product, you have 30 days from the day you receive the goods to ask us to take them back.',
          'To be accepted, the product has to come back in the condition it left us: unused, unlaid, uncut, in its original unopened packaging, and with the batch details intact. We also need your receipt or another proof of purchase so we can match the stock to the order.',
        ],
        bullets: [
          'Ask for the return within 30 days of receiving the goods',
          'Product must be unused, unlaid and in its original unopened packaging',
          'Original receipt or proof of purchase',
          'Full boxes only — part boxes and offcuts cannot be resold',
        ],
      },
      {
        heading: 'How to start a return',
        paragraphs: [
          `Contact us before you send anything back. Call ${BUSINESS.phone} or email ${BUSINESS.email} with your order details and what you would like to return, and we will confirm whether the stock can be accepted and how to get it to us.`,
          'Goods sent back without an agreed return will not be accepted. Returns are dropped to, or collected from, our Mitchell warehouse — we will confirm which when we approve the return.',
        ],
      },
      {
        heading: 'Damage, shortages and the wrong product',
        paragraphs: [
          'Check your delivery before the truck leaves, and open the boxes on the day if you can. Tiles and boards are fragile in transit, and a breakage is far easier to resolve when it is reported straight away.',
          'If something arrives broken, short, or is not what you ordered, tell us immediately and keep the packaging. Send a photo if you can. We will replace it, re-supply the shortfall or refund it — whichever suits the job — and we will not ask you to pay freight to put our mistake right.',
        ],
      },
      {
        heading: 'What we cannot take back',
        paragraphs: [
          'Some things genuinely cannot be resold, and we cannot accept a change-of-mind return on them:',
        ],
        bullets: [
          'Special orders and indent stock brought in specifically for your job',
          'Product that has been cut, laid, grouted, glued or otherwise installed',
          'Part boxes, offcuts and loose tiles or boards',
          'Clearance, run-out and sale stock',
          'Adhesives, grouts, sealers and other consumables once opened',
          'Gift cards',
        ],
      },
      {
        heading: 'Colour, shade and batch variation',
        paragraphs: [
          'Natural stone, timber and even porcelain vary between batches, and a screen or a small sample chip will never show that variation faithfully. That is why we keep full tiles and full boards on display in Mitchell, and why we recommend you see the actual product before you commit.',
          'Ordinary shade and grain variation within a range is a characteristic of the product, not a fault. If you are worried about it, ask us to show you several pieces together, and order the whole job in one batch — we will help you work out quantities so you do not run short.',
        ],
      },
      {
        heading: 'Ordering enough, and what happens to what is left',
        paragraphs: [
          'We will always recommend ordering a sensible allowance over the measured area for cuts, breakages and future repairs. That allowance is part of the job, not an over-supply, and we would rather you keep a spare box than have to chase a matching batch in two years.',
          'Where a return of full, unopened boxes of stocked product is agreed within the window, we will take them back on the terms above.',
        ],
      },
      {
        heading: 'Exchanges',
        paragraphs: [
          'The quickest way to change to a different range is to have the original return approved and place a separate order for the new product. That way your new stock is on its way while the return is being processed, rather than waiting behind it.',
        ],
      },
      {
        heading: 'Refunds',
        paragraphs: [
          'Once the returned stock is back with us and has been inspected, we will let you know whether the return has been approved. If it has, the refund goes back to the payment method you originally used, within 10 business days.',
          `Bear in mind that your bank or card provider can take a few days beyond that to post the money to your account. If more than 15 business days have passed since we approved your return and you still have not seen it, contact us at ${BUSINESS.email} and we will chase it.`,
        ],
      },
      {
        heading: 'Deposits on measure-and-install work',
        paragraphs: [
          'Where a job includes installation, the quote will set out the deposit and the payment stages before any work starts. If you cancel before we order your material, the deposit is refundable less any costs we have already committed on your behalf. Once material has been ordered or cut for your job, it falls under the special-order exclusion above.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: 'How we handle your information',
    lede:
      'We collect very little, we use it to answer you and to quote your job, and we do not sell it. This page explains what we hold, why we hold it, and how to ask us to change or delete it.',
    sections: [
      {
        heading: 'Who this policy covers',
        paragraphs: [
          `${BUSINESS.name} is operated by ${BUSINESS.entity}, registered at ${BUSINESS.registered}. This policy applies to our website, our social media pages, and any enquiry you send us through them.`,
          'We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). By sending us an enquiry you are agreeing to the handling described here.',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Almost everything we hold is information you have typed into a form and sent us on purpose. When you use the enquiry or contact form, that is typically:',
        ],
        bullets: [
          'Your name',
          'Your email address and phone number',
          'The site or delivery address, when you are asking for a measure and quote',
          'What you have told us about the job — rooms, products, rough areas, timing',
        ],
      },
      {
        heading: 'Information collected automatically',
        paragraphs: [
          'Our web server keeps standard access logs — the pages requested, the time, the browser type and the network address the request came from. We use these to keep the site working and to see which pages are worth improving. We do not use them to build a profile of you, and we do not run advertising trackers on this site.',
        ],
      },
      {
        heading: 'Why we use it',
        paragraphs: ['We use what you give us for the reason you gave it to us:'],
        bullets: [
          'To answer your enquiry',
          'To prepare a quote and, if you go ahead, to schedule the measure, supply and installation',
          'To arrange delivery to your site',
          'To keep a record of the job for warranty and future matching of batches',
        ],
      },
      {
        heading: 'Who we share it with',
        paragraphs: [
          'We do not sell, rent or trade your personal information.',
          'We share it only where the job needs it — with the installer attending your site, with a supplier or manufacturer when a product has to be ordered in or a warranty claim raised, and with a freight company when goods are being delivered to you. Each of them gets only what they need to do that one thing.',
          'We will also disclose information where the law requires it of us.',
        ],
      },
      {
        heading: 'How it is stored',
        paragraphs: [
          'Enquiries reach us as email and are held in our business email and quoting systems. We take reasonable steps to protect that information from misuse, loss and unauthorised access.',
          'We should be straight with you about one thing: no transmission over the internet is ever completely secure. We protect what we hold as well as we reasonably can, but sending information to us over the internet is at your own risk.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Enquiries that do not turn into a job are kept only as long as they are useful to us and are then deleted. Where you become a customer, we keep the job record for as long as we need it for warranty, tax and other legal obligations, and then destroy or de-identify it.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask us what personal information we hold about you, ask us to correct anything that is wrong, and ask us to delete it where we are not required to keep it.',
          `Write to ${BUSINESS.email} or call ${BUSINESS.phone}. We will need to confirm who you are before we act, and we will respond within a reasonable time and at no cost. If you are not satisfied with how we have handled a privacy issue, you can take it to the Office of the Australian Information Commissioner.`,
        ],
      },
      {
        heading: 'Cookies and other sites',
        paragraphs: [
          'This site uses only the cookies needed to make pages work. Where a page embeds something from another service — a map, for example — that service sets its own cookies and is governed by its own privacy policy, not ours.',
          'Our site links to other websites. We are not responsible for how those sites handle your information, and we would encourage you to read their policies before you hand anything over.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          `We may update this policy from time to time. The current version always lives on this page, and it was last reviewed in ${BUSINESS.updated}.`,
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    eyebrow: 'Pick-up, delivery and installation',
    lede:
      'We are a Canberra showroom and warehouse, not a mail-order business. Most orders are collected from Mitchell or delivered to site by us, and most of what we sell we also lay. This covers how the goods get to you.',
    sections: [
      {
        heading: 'Where we deliver',
        paragraphs: [
          'We deliver throughout Canberra and the ACT, into Queanbeyan, and to the surrounding NSW areas we regularly work in. If your site is further out, ask us — we will either quote the freight or point you to the sensible option.',
          'We do not run an online checkout or ship parcels interstate. Orders are placed with us directly, by phone, by email or in the showroom.',
        ],
      },
      {
        heading: 'Collecting from Mitchell',
        paragraphs: [
          `You are welcome to collect from ${BUSINESS.address}. Give us a call on ${BUSINESS.phone} before you come so we can have the order picked and ready, and so we can tell you what it weighs.`,
          'Tiles are heavy. A square metre of porcelain runs well over 20 kilograms once it is boxed, so bring a vehicle that can carry it and be realistic about how many boxes will fit. We will help you load.',
        ],
      },
      {
        heading: 'Delivery to site',
        paragraphs: [
          'Delivery is quoted per order, because the cost depends on where the site is, how much is going and how the truck can get to it. We will confirm the delivery charge with your quote, before you commit to anything.',
          'We will agree a delivery day with you and give you a window. Someone over 18 needs to be on site to take the delivery and check it.',
        ],
      },
      {
        heading: 'What a site delivery includes',
        paragraphs: [
          'Deliveries are kerbside or to the nearest safe point the vehicle can reach. Our driver is not able to carry material upstairs, through a house, or across a site that is not safely accessible, and cannot leave goods where they would be a hazard or exposed to weather.',
          'If the material needs to go somewhere a truck cannot reach, tell us when you order and we will work out how to handle it rather than turning up and finding out.',
        ],
      },
      {
        heading: 'Lead times',
        paragraphs: [
          'Stocked ranges held in our Mitchell warehouse are usually available immediately or within a few days.',
          'Special orders and indent ranges are brought in for your job and take longer — sometimes considerably longer, depending on the supplier and whether the product ships from overseas. We will give you an expected timeframe before you order, and we will tell you if it changes. Please do not book your trades until the material is confirmed.',
        ],
      },
      {
        heading: 'Checking your delivery',
        paragraphs: [
          'Inspect the goods when they arrive, before the driver leaves if you can. Note anything broken, short or wrong on the delivery paperwork and contact us the same day.',
          'Keep the packaging until you are satisfied everything is correct. Reporting damage straight away is the difference between a quick replacement and a long argument with a freight company.',
        ],
      },
      {
        heading: 'Storing material before it is laid',
        paragraphs: [
          'Once material is delivered it is in your care. Keep it flat, dry and out of the weather, and leave it in its packaging until the installer needs it.',
          'Timber, hybrid and laminate flooring needs to acclimatise in the room where it will be laid before installation — the manufacturer sets the period, and we will tell you what your product needs. Skipping that step is one of the most common causes of a floor moving after it is down.',
        ],
      },
      {
        heading: 'Supply and installation',
        paragraphs: [
          'If we are laying the floor, delivery is scheduled as part of the job and the timing is worked out with your installation date. There is nothing for you to arrange.',
          'Our own installers handle removal of the old surface, subfloor preparation, laying, grouting and sealing. Booking starts with a free measure and quote on site, so the quantities and the price are based on your actual rooms rather than an estimate.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    eyebrow: 'The terms you agree to',
    lede:
      'These terms cover the use of this website and the basis on which we quote, supply and install. They are written to be read, not to be impenetrable.',
    sections: [
      {
        heading: 'About these terms',
        paragraphs: [
          `This website is operated by ${BUSINESS.entity}, trading as ${BUSINESS.name}, of ${BUSINESS.registered}. Throughout these terms, "we", "us" and "our" mean that business.`,
          'By browsing this site or sending us an enquiry, you agree to these terms. If you do not agree with them, please do not use the site.',
        ],
      },
      {
        heading: 'Using this website',
        paragraphs: [
          'You may use this site to look at our ranges, read our advice and contact us. You must be at least 18, or have the consent of a parent or guardian, to send us an enquiry.',
          'You must not use the site for any unlawful purpose, attempt to gain unauthorised access to it, interfere with how it works, or upload anything malicious. We may refuse service or withdraw access if you do.',
        ],
      },
      {
        heading: 'Product information and images',
        paragraphs: [
          'We take care to describe our ranges accurately, and the specifications shown — sizes, finishes, slip ratings, thicknesses, roll widths and the like — are those published by the manufacturer for that product.',
          'Photographs and screen colours are a guide. Screens vary, and natural materials vary batch to batch. We will not be able to guarantee that what you see on a monitor matches what arrives on a pallet, which is exactly why we keep full tiles and boards on display in Mitchell.',
          'Where an error or omission appears on this site, we reserve the right to correct it, and to cancel or amend an order placed on the strength of it. We will always tell you if that happens.',
        ],
      },
      {
        heading: 'Quotes and pricing',
        paragraphs: [
          'Prices are current at the time of quoting and can change without notice until a quote is issued. A written quote holds for the period stated on it.',
          'A quote is based on the measurements and the site conditions known when it was prepared. If the job turns out to be different once work starts — an unsound subfloor, an unexpected level change, more area than was measured — we will stop, explain what has changed and agree any variation with you before continuing.',
          'Availability is not guaranteed until an order is confirmed. Where a range runs out or is discontinued after quoting, we will offer you the nearest alternative.',
        ],
      },
      {
        heading: 'Orders, deposits and payment',
        paragraphs: [
          'An order is accepted when we confirm it to you. Special orders and indent product are ordered specifically for your job and cannot be cancelled once placed with the supplier.',
          'Where a job includes installation, the quote sets out the deposit and the payment stages. Title to the goods stays with us until they are paid for in full; risk passes to you on delivery or collection.',
        ],
      },
      {
        heading: 'Installation',
        paragraphs: [
          'Installation dates are arranged with you and depend on material arriving and the site being ready. We will keep you informed if either changes.',
          'You are responsible for giving us safe, clear access to the work area, for removing furniture and fittings unless the quote says otherwise, and for making sure other trades are not working in the same space. Delays caused by a site not being ready may be charged.',
          'Our installation work is warranted against defective workmanship. Product warranties are provided by the manufacturer, and we will help you make a claim under one.',
        ],
      },
      {
        heading: 'Returns and refunds',
        paragraphs: [
          'Returns, refunds and faulty goods are covered by our Refund Policy, which forms part of these terms.',
        ],
      },
      {
        heading: 'Your consumer guarantees',
        paragraphs: [
          'Our goods and services come with guarantees that cannot be excluded under Australian Consumer Law. Nothing in these terms limits or removes those rights.',
          'To the extent the law allows, our liability for anything else arising out of the supply of goods or services is limited to replacing the goods, re-supplying the services, or refunding what you paid. We are not liable for indirect or consequential loss.',
        ],
      },
      {
        heading: 'Content on this site',
        paragraphs: [
          'The text, photographs, layout and design of this site belong to us or to our suppliers, and are protected by copyright. You may not reproduce or republish them commercially without our permission.',
          'Product names and brand marks belong to their respective owners and are used here to identify the ranges we sell.',
        ],
      },
      {
        heading: 'Links to other sites',
        paragraphs: [
          'Where we link to another website — a manufacturer, a supplier, a map — we do so for your convenience. We do not control those sites, we are not responsible for their content or their handling of your information, and a link is not an endorsement of everything on the other end of it.',
        ],
      },
      {
        heading: 'Privacy',
        paragraphs: [
          'Any personal information you give us is handled in accordance with our Privacy Policy, which forms part of these terms.',
        ],
      },
      {
        heading: 'Changes and governing law',
        paragraphs: [
          `We may update these terms from time to time; the current version always lives on this page and was last reviewed in ${BUSINESS.updated}. Continuing to use the site after a change means you accept the updated terms.`,
          'If any part of these terms is found to be unenforceable, the rest continues to apply. These terms are governed by the laws of the Australian Capital Territory, and the courts of the ACT have jurisdiction.',
        ],
      },
      {
        heading: 'Getting in touch',
        paragraphs: [
          `Questions about these terms can go to ${BUSINESS.email} or ${BUSINESS.phone}, or you can call into the showroom at ${BUSINESS.address}.`,
        ],
      },
    ],
  },
]

export function policyBySlug(slug) {
  return POLICIES.find((p) => p.slug === slug)
}
