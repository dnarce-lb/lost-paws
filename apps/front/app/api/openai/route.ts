import { NextResponse } from 'next/server';
import getPetDescription from '@/app/services/ai-recognition/pet-description';

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  console.log(body);

  const description = await getPetDescription(body.images);

  return NextResponse.json({ description }, { status: 200 });
}
