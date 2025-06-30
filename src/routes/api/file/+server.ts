import { deleteFile } from "@/server/database/file";
import { json, type RequestEvent } from "@sveltejs/kit";

export const DELETE = async (req : RequestEvent) => {
  const { request, locals } = req;

  const userId = locals.session?.user?.id;

  if (!userId) {
    return json({ message : "Unauthorized" }, { status : 404 });
  }

  const fileId = await request.json()

  if (!fileId) {
    return json({ message : "Details Mising" }, { status : 401 });
  }

  const resp = await deleteFile(userId, fileId)

  if (!resp.success) {
    return json({ message : resp.error }, { status : 403 })
  }
  
  return json({ success : true })
  
}