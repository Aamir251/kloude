import { deleteFolder } from "@/server/database/folder";
import { json, type RequestEvent } from "@sveltejs/kit"

export const POST = async (req : RequestEvent) => {

  const { request, locals } = req
  const data = await request.json()

  const folder_id = data;

  if (!folder_id) {
    return json({ message : "Details Missing"}, { status : 401 })
  }

  const user_id = locals.session?.user.id;

  if (!user_id) {
    return json({ message : "Unauthorized"}, { status : 403 })
  }
  const resp = await deleteFolder(user_id, folder_id);
  
  if (!resp.success) {
    return json({ message : resp.error }, { status : 403 })
  }
  
  return json({ success : true })
}