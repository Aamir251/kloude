import { getStorageCost, getStorageStats } from "$lib/server/database/file";
import { error } from "@sveltejs/kit";



export const load = async ({ locals : { session }}) => {

  if (!session?.user.id) {
    error(404, { message : "UNAUTHORIZED"})
  }
  return {
    storageCost : getStorageCost(session?.user.id),
    storageStats : getStorageStats(session.user.id)
  }
}