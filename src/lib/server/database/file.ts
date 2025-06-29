import { supabase } from "@/client/supabase"

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
