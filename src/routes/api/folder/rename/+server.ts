import { renameFolder } from "@/server/database/folder";
import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const PATCH = async (req : RequestEvent) => {

  const { request, locals } = req;

  const data = await request.json()

  const { folder_id, name } = data;

  console.log({ folder_id, name });
  

  if (!folder_id || !name) {
    return json({ message : "Details Missing" }, { status : 401 })
  }
  
  const user_id = locals.session?.user.id;
  
  if (!user_id) {
    return json({ message : "Unauthorized"}, { status : 403 })
  }
  const resp = await renameFolder(user_id, folder_id, name);
  
  console.log('Resp ', resp);
  
  if (!resp.success) {
    return json({ message : resp.error }, { status : 403 })
  }
  
  return json({ success : true })
}