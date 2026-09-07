/* The page itself is a client component and cannot export metadata, so the
   noindex lives here. This is an internal decision page — it must never turn up
   in search results alongside the real site. */
export const metadata = {
  title: 'Type decision | Capital Tiles',
  robots: { index: false, follow: false },
}

export default function FontTestLayout({ children }) {
  return children
}
