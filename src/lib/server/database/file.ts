import { supabase } from "@/client/supabase"
import { handleResponse } from "@/utils/helpers";

/**
 * Gets the files in the root directory
 */
export const getRootFiles = async (user_id : string) => {
  const resp = await supabase.from('files')
    .select("name, id, size, type")
    .eq('user_id', user_id)
    .is('folder_id', null);
  
   if (resp.error) {
    return {
      error : resp.error.message
    }
  }

  return {
    data : resp.data
  }
}

export const getFiles = async (user_id : string, folder_id : string) => {
  const resp = await supabase.from('files')
    .select("name, id, size, type")
    .match({ user_id, folder_id })
    
  
   if (resp.error) {
    return {
      error : resp.error.message
    }
  }

  return {
    data : resp.data
  }
}

export const deleteFile = async (user_id : string, id : string) => {
  return handleResponse(await supabase.from('files').delete().match({
    user_id,
    id
  }))
}

export type GetStorageCostReturnType = ReturnType<typeof getStorageCost>;

export const getStorageCost = async (user_id : string) => {
  return handleResponse(await supabase.rpc('fn_get_user_storage_cost', {
    p_user_id : user_id
  }))
}

export type GetStorageStatsReturnType = ReturnType<typeof getStorageStats>;

export const getStorageStats = async (user_id : string) => {
  return handleResponse(await supabase.rpc('fn_get_storage_stats', {
    p_user_id : user_id
  }))
} 