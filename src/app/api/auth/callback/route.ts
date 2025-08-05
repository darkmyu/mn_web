import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();

    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      if (profile?.onboarding_completed) {
        return NextResponse.redirect(new URL('/', requestUrl.origin));
      } else {
        return NextResponse.redirect(new URL('/onboarding', requestUrl.origin));
      }
    }
  }
}
