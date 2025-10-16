import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const { password } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminSupabasePassword = process.env.ADMIN_SUPABASE_PASSWORD;

  if (!adminPassword || !adminEmail || !adminSupabasePassword) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  if (password === adminPassword) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminSupabasePassword,
    });

    if (error) {
      return NextResponse.json({ error: 'Supabase authentication failed.' }, { status: 401 });
    }

    return NextResponse.json({ session: data.session });
  } else {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }
}