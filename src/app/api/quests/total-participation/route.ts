import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const backendUrl = process.env.BACKEND_API_URL

    const response = await fetch(`${backendUrl}/quests/total-participation?walletAddress=${walletAddress}`);

    if (!response.ok) {
      throw new Error('Failed to fetch total participation');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching total participation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}