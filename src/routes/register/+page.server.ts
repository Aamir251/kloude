import { type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load : PageServerLoad = ({ url }) => {
  const accountStatus = url.searchParams.get('account-status')
  const statusValues = ['confirmed', 'rejected']
  
  if (accountStatus && statusValues.includes(accountStatus)) {
    return {
      accountStatus
    }
  }
}

export const actions: Actions = {

  default: async ({ request, locals: { supabase } })=> {
    const formData = await request.formData()
    const name = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error, data } = await supabase.auth.signUp({ email, password })

    if (error) {
      console.log({ error });
      
      return fail(400, {
        message : error.message
      })
    }
    
    await supabase.from('user_profiles').insert({
      id : data.user?.id!,
      name : name,
      email,
    })


    return {
      success : true,
      message : 'Account Created Successfully 🚀! Redirecting...'
    }
   
  }
}

