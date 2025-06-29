import { json, type RequestEvent } from "@sveltejs/kit";
import { supabase } from "@/client/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Tables } from "../../../../database.types";

type File = Omit<Tables<"files">, "id">

export async function POST(req : RequestEvent) {
  const { request, locals } = req
  
  try {
    let data : File[] = await request.json()

    const user_id = locals.session?.user.id
    if (!user_id) {
      return json({ message : 'Unauthorized' }, { status : 404 })
    }

    data = data.map(item => ({ ...item, user_id : user_id }))
    
    const resp = await supabase.from('files').insert(data)

    if (resp.error) throw new Error(resp.error.message);

    return json({ data : resp.data }, { status : 201 })

  } catch (err) {
    const error = err as any as PostgrestError | Error
    return json({ message : error.message }, { status : 403 })
  }

}