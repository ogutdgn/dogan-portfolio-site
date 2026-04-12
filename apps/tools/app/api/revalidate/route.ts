import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookBody = {
  _type: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 })
    }

    if (body._type === 'tool' || body._type === 'toolCategory') {
      revalidatePath('/')
      if (body.slug?.current) revalidatePath(`/${body.slug.current}`)
    }

    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ message }, { status: 500 })
  }
}
