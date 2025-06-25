import { getRootFiles } from '@/server/database/file.js'
import { createFolder, getRootFolders } from '@/server/database/folder.js'
import { fail, redirect, type Actions } from '@sveltejs/kit'

export const load = async ({ locals: { session } }) => {

  return {
    folders: getRootFolders(session?.user.id!),
    files: getRootFiles(session?.user.id!)
  }
}

export const actions: Actions = {
  createFolder: async ({ request, locals: { session } }) => {
    const formData = await request.formData()
    try {
      const folderName = formData.get("folder-name") as string

      if (!folderName) throw new Error("Enter folder Name")

      if (!session?.user.id) {
        redirect(303, "/login")
      }
      const { success, error } = await createFolder(folderName, session.user.id);

      if (!success) throw new Error(error)

      return {
        success : true
      }
    } catch (error) {

      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      return fail(403, {
        message
      })
    }

  }
}


