import { NextResponse } from 'next/server'
import { SHOWROOM } from '@/components/siteData'

/* ---------------------------------------------------------------------------
   The enquiry form's backend.

   Until this existed, submitting the contact form set `window.location.href` to
   a mailto: and immediately showed "thank you, we will be in touch". On a
   machine with no mail client wired up — most Windows desktops, every locked
   down office SOE, any phone that only has webmail — the mailto did nothing at
   all and the visitor was thanked anyway. Those enquiries were lost silently
   and neither end knew it had happened. So the one rule this file exists to
   keep is: `delivered: true` is only ever returned after a provider has
   accepted the message. Everything else is honest about what it could not do.

   ENV CONTRACT — set these where the site is deployed:

     RESEND_API_KEY  Resend API key ("re_..."). Present = mail goes out through
                     https://api.resend.com/emails. This is the only delivery
                     path implemented here.
     ENQUIRY_TO      Recipient. Defaults to SHOWROOM.email, so a deployment
                     that sets only RESEND_API_KEY still reaches the showroom.
     ENQUIRY_FROM    Sender, e.g. "Capital Tiles Website <site@example.com>".
                     Resend rejects a domain it has not verified, so this must
                     be a domain added to the Resend account — NOT the
                     visitor's address. The visitor goes in Reply-To instead,
                     which is what makes "reply" in the showroom's mail client
                     go back to them.
     SMTP_HOST       Recognised but NOT implemented — see the branch below.
     SMTP_PORT
     SMTP_USER
     SMTP_PASS

   With no provider configured the route still accepts the enquiry, writes it
   to the server log and answers `{ ok: true, delivered: false }`. The form
   says so plainly and offers the showroom phone number rather than promising
   a reply that nothing is going to send.
   ------------------------------------------------------------------------- */

/* Reads secrets from the environment and talks to a third party, so it stays
   on the Node runtime. */
export const runtime = 'nodejs'

/* `label` is the word handed back to the visitor when a rule bites, so the
   message reads as a sentence. `max` stops the endpoint being used to post a
   novel — or to fold a header into the subject line of every mail the
   showroom receives. */
const FIELDS = {
  firstName: { label: 'first name', max: 80, required: true },
  lastName: { label: 'last name', max: 80 },
  email: { label: 'email address', max: 254, required: true },
  phone: { label: 'phone number', max: 40 },
  subject: { label: 'enquiry type', max: 120 },
  range: { label: 'range', max: 120 },
  message: { label: 'message', max: 4000, required: true },
}

/* Deliberately loose: this catches "jane@" and a pasted sentence, it does not
   adjudicate RFC 5322. A real address rejected by a clever regex is a lost
   customer; a fake one that gets through only bounces. */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function fail(status, error, field) {
  return NextResponse.json({ ok: false, error, field }, { status })
}

function validate(body) {
  const values = {}

  for (const [name, rule] of Object.entries(FIELDS)) {
    const raw = body[name]
    const value = typeof raw === 'string' ? raw.trim() : ''

    if (rule.required && !value) {
      return { error: `Please enter your ${rule.label}.`, field: name }
    }
    if (value.length > rule.max) {
      return {
        error: `That ${rule.label} is too long — please keep it under ${rule.max} characters.`,
        field: name,
      }
    }
    values[name] = value
  }

  if (!EMAIL_SHAPE.test(values.email)) {
    return { error: 'That email address does not look right — please check it.', field: 'email' }
  }

  return { values }
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return fail(400, 'That enquiry did not arrive in one piece. Please try again.')
  }

  /* The form's hidden field. People never see it, so anything in it came from
     something filling in every input on the page. Answer 200 so the bot learns
     nothing from the shape of the reply — but `delivered: false`, because
     nothing was sent and this file does not lie about that. A human who
     somehow trips it is told the message is recorded and given the phone
     number, which is the right outcome either way. */
  if (typeof body?.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true, delivered: false })
  }

  const { values, error, field } = validate(body || {})
  if (error) return fail(400, error, field)

  const name = [values.firstName, values.lastName].filter(Boolean).join(' ')
  const about = [values.range, values.subject].filter(Boolean).join(' · ')
  const subject = about ? `Website enquiry — ${about}` : 'Website enquiry'

  const text = [
    `Name: ${name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || '—'}`,
    `Enquiry: ${values.subject || '—'}`,
    /* Only present when the visitor arrived from a range page through
       EnquireLink. It is the difference between quoting straight away and
       writing back to ask what they were looking at. */
    ...(values.range ? [`Range: ${values.range}`] : []),
    '',
    values.message,
  ].join('\n')

  const to = process.env.ENQUIRY_TO || SHOWROOM.email
  const from = process.env.ENQUIRY_FROM || `Capital Tiles Website <${SHOWROOM.email}>`

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: values.email,
          subject,
          text,
        }),
        /* A hung provider must not leave the visitor watching a spinner. */
        signal: AbortSignal.timeout(10000),
      })

      if (!res.ok) {
        /* The provider's own words go to the log, never to the browser: they
           name the account behind the key and the sending domain. */
        console.error('[enquiry] Resend rejected the send', res.status, await res.text())
        return fail(502, 'We could not send that just now. Please try again in a moment.')
      }
    } catch (err) {
      console.error('[enquiry] Resend request failed', err)
      return fail(502, 'We could not send that just now. Please try again in a moment.')
    }

    return NextResponse.json({ ok: true, delivered: true })
  }

  /* SMTP is recognised so that a deployment which sets those vars is told why
     nothing happened, instead of watching mail vanish. It is not implemented:
     sending over SMTP needs nodemailer, this project has three dependencies
     and none of them is that, and adding one is not this file's call. Set
     RESEND_API_KEY, or implement this branch and take the dependency
     deliberately. */
  if (process.env.SMTP_HOST) {
    console.warn(
      '[enquiry] SMTP_HOST is set but the SMTP path is not implemented — set RESEND_API_KEY instead. Recording the enquiry.',
    )
  }

  /* No provider. The enquiry is still real, so it goes to the server log,
     where the host keeps it and someone can retrieve it. Honest answer:
     accepted, not delivered. */
  console.info(
    '[enquiry] no mail provider configured — recording enquiry',
    JSON.stringify({
      to,
      subject,
      name,
      email: values.email,
      phone: values.phone,
      range: values.range,
      enquiry: values.subject,
      message: values.message,
      at: new Date().toISOString(),
    }),
  )

  return NextResponse.json({ ok: true, delivered: false })
}
