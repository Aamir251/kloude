import { type Actions, fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {

  default: async ({ request, locals: { supabase } })=> {
    const formData = await request.formData()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return fail(400, {
        message : error.message
      })
    }

    redirect(303, '/')
   
  }
}


export async function load({ locals : { session }}) {
  
  if (session?.user) {
    redirect(303, '/')
  }

}