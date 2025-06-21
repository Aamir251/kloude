import { json, type RequestEvent } from "@sveltejs/kit";
import type { Tables } from "../../../database.types";
import { supabase } from "@/client/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type File = Tables<"files">

export async function POST(req : RequestEvent) {
  const { request } = req
  
  try {
    const data : File[] = await request.json()

    const resp = await supabase.from('files').insert(data)

    if (resp.error) throw new Error(resp.error.message);

    return json({ data : resp.data }, { status : 201 })
  } catch (err) {
    const error = err as any as PostgrestError | Error
    return json({ message : error.message }, { status : 403 })
  }

}