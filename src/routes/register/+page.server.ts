import { type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { checkIfUserExists, createNewUser } from "@/server/database/user";


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

    

    /**
     * Check if user already exists
    */

    const { error, data } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      return fail(400, {
        message : error.message
      })
    }

    /**
     * Create the user in user_profiles table
    */
    const resp = await createNewUser({ id : data?.user?.id!, email, name });

    if (!resp.success) {
      return fail(400, {
        message : resp.error
      })

    }

    return {
      success : true,
      message : 'Account Created Successfully 🚀! Redirecting...'
    }
   
  }
}

