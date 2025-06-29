import { getRootFiles } from '@/server/database/file.js'
import { getRootFolders } from '@/server/database/folder.js'

export const load = async ({ locals: { session }, depends }) => {
  
  depends("folders")
  return {
    folders: getRootFolders(session?.user.id!),
    files: getRootFiles(session?.user.id!)
  }
}

