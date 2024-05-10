import { NextResponse } from 'next/server';
import supabase from '@/app/utils/supabase/client';

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Invalid Method' }, { status: 405 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'The file is not valid' }, { status: 400 });
    }

    const bucketName = 'images';
    const filePath = `public/${file.name}`;

    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw error;
    }

    const publicURL = await supabase.storage.from(bucketName).getPublicUrl(filePath);

    return NextResponse.json({ publicURL: publicURL.data.publicUrl }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: error.statusCode || 500 });
  }
}
