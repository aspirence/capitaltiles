import Faqs from '@/components/sections/Faqs'
import { FAQ_GROUPS, FAQ_LEDE } from '@/components/faqData'

export const metadata = {
  title: "FAQ's — Visiting, Quotes, Installation & Aftercare | Capital Tiles",
  description:
    'Answers to the questions Canberra customers ask most — visiting the Mitchell showroom, how the free measure and quote works, how installation runs, and looking after your floor afterwards.',
}

export default function FaqsPage() {
  return <Faqs groups={FAQ_GROUPS} lede={FAQ_LEDE} />
}
