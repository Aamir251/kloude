import type { EmailOtpType } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export async function load({ url, locals : { supabase }}) {
  const token_hash = url.searchParams.get('token_hash')

  const type = url.searchParams.get('type') as unknown as EmailOtpType;
  if (!token_hash || !type) {
    throw redirect(303, '/login')
  }
  const { error, data } = await supabase.auth.verifyOtp({
    token_hash,
    type
  })

  if (error) {
    redirect(303, '/register?account-status=rejected')     
  }

  redirect(303, '/register?account-status=confirmed')     

  
}
