import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const { password, email, supabaseUrl, supabaseAnonKey } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD || "shanukpshan1";

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Supabase credentials are not configured correctly on the client.' }, { status: 500 });
  }

  // Use the client-provided Supabase keys to create a temporary admin client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  if (password === adminPassword) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email, // Use the email from the request
      password: process.env.ADMIN_SUPABASE_PASSWORD!, // This should be the secure password for the admin user in Supabase
    });

    if (error) {
      return NextResponse.json({ error: `Supabase auth error: ${error.message}` }, { status: 401 });
    }

    return NextResponse.json({ session: data.session });
  } else {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }
}