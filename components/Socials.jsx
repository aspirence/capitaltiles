'use client'

import { useId } from 'react'
import { SHOWROOM } from './siteData'
import s from './Socials.module.css'

/* The social row, in the platforms' own colours.

   One component instead of two copies: the Facebook and Instagram path data
   used to be pasted into both Footer.jsx and Contact.jsx, so a change to either
   mark — or adding a third — meant editing the same SVG twice and hoping they
   stayed identical.

   The marks are brand assets, so they are drawn as each platform publishes
   them: Facebook #1877F2, WhatsApp #25D366, and Instagram's four-stop gradient
   rather than a flat pink. Instagram's gradient needs an id that is unique per
   instance — the footer and the contact page both render this row on the same
   document, and two <linearGradient> elements sharing an id means the second
   silently takes the first one's stops. useId gives each instance its own. */

const WHATSAPP_TEXT = 'Hi Capital Tiles'

export default function Socials({ className = '' }) {
  const gid = useId().replace(/:/g, '')

  /* The number is the showroom's, written once in siteData; wa.me wants it in
     international form with no spaces, which phoneHref already is. */
  const waNumber = SHOWROOM.phoneHref.replace('tel:+', '')

  const items = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/capitaltilesandflooring/',
      className: s.facebook,
      path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/capitaltilesandflooring/',
      className: s.instagram,
      gradient: true,
      path: 'M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.57-1.58 1.58 1.58 0 0 1 1.57 1.58Z',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${waNumber}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      className: s.whatsapp,
      path: 'M12.04 2A9.9 9.9 0 0 0 2.1 11.9a9.8 9.8 0 0 0 1.35 4.96L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01a9.9 9.9 0 0 0 9.93-9.9A9.9 9.9 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.3-1.96 1.35-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.93-4.69-4.11-.14-.19-1.12-1.5-1.12-2.85 0-1.36.71-2.03.96-2.3.25-.28.55-.35.73-.35h.52c.17 0 .4-.06.62.48.24.57.8 1.97.87 2.11.07.14.11.31.02.5-.09.19-.14.3-.28.47-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.62.76 1.9.9.28.14.46.21.53.33.07.11.07.65-.17 1.33Z',
    },
  ]

  return (
    <div className={s.row + (className ? ' ' + className : '')}>
      {items.map((it) => (
        <a
          key={it.label}
          className={s.link + ' ' + it.className}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={it.label}
          title={it.label}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            {it.gradient && (
              <defs>
                <linearGradient id={'ig' + gid} x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FEDA75" />
                  <stop offset="30%" stopColor="#FA7E1E" />
                  <stop offset="55%" stopColor="#D62976" />
                  <stop offset="80%" stopColor="#962FBF" />
                  <stop offset="100%" stopColor="#4F5BD5" />
                </linearGradient>
              </defs>
            )}
            <path d={it.path} fill={it.gradient ? `url(#ig${gid})` : 'currentColor'} />
          </svg>
        </a>
      ))}
    </div>
  )
}
