import { createFolder } from "@/server/database/folder"
import { json, type RequestEvent } from "@sveltejs/kit"

export const POST = async ({ request, locals : { session } } : RequestEvent) => {
  const data  = await request.json()

  const userId = session?.user.id;

  const { name, parent_id = null } = data as { 
    name : string
    parent_id : string | null
  }

  if (!userId) {
    return json({ message : 'Unauthorized' }, { status : 403 })
  }
  const resp = await createFolder(name, userId, parent_id)
  
  if (resp.success) {
    return json({ success : true })
    
  }

  return json({ message : resp.error }, { status : 403 })
}