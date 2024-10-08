import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { walletAddress } = await request.json()

  try {
    const backendUrl = process.env.BACKEND_API_URL


    const backendResponse = await fetch(`${backendUrl}/users/check-wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    })

    if (!backendResponse.ok) {
      throw new Error('Backend server error')
    }

    const data = await backendResponse.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error checking wallet' }, { status: 500 })
  }
}