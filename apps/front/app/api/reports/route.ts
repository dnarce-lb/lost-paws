import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  console.log(body);

  return NextResponse.json({}, { status: 200 });
}
