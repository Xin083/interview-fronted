import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  // Extract search parameters and origin from the request URL
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next")

  console.log('Auth callback received:', {
    url: request.url,
    origin,
    code: code ? 'present' : 'missing',
    next
  });

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
      // After successful auth, redirect back to checkout
      //return NextResponse.redirect(`${origin}`)
      // After successful auth, redirect to next if present, else home
    if (!error) {
      console.log('Auth successful, redirecting to:', `${origin}${next || ''}`);
      return NextResponse.redirect(`${origin}${next || ''}`)
    } else {
      console.error('Auth error:', error);
    }
  }

  // If there's no code or an error occurred, redirect to signin
  console.log('Auth failed, redirecting to signin');
  return NextResponse.redirect(
    `${origin}/signin?error=${encodeURIComponent(
      "Authentication failed. Please try again."
    )}`
  )
}
