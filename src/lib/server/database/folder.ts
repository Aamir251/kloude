import { supabase } from "@/client/supabase"

export const getRootFolders = async (user_id : string ) => {
  
  const resp = await supabase.from('folder')
    .select('name, id')
    .eq('user_id', user_id)
    .is('parent_id', null);

  if (resp.error) {
    return {
      error : resp.error.message
    }
  }

  return {
    folders : resp.data
  }
}
export const getFolders = async (user_id : string, parent_id : string) => {
  const resp = await supabase.from('folder')
    .select('name, id')
    .match({ user_id, parent_id })

  if (resp.error) {
    return {
      error : resp.error.message
    }
  }

  return {
    folders : resp.data
  }
}

export const createFolder = async (name : string, user_id : string, parent_id : string | null = null) => {

  const resp = await supabase.from('folder').insert({
    name,
    user_id,
    parent_id
  })

  if (resp.error) {
    return {
      success : false,
      error : resp.error.message
    }
  }

  return {
    success : true,
    data : resp.data
  }
}


export const deleteFolder = async (user_id : string, id : string) => {
  const resp = await supabase.from('folder').delete().match({
    user_id,
    id
  })

  if (resp.error) {
    return {
      success : false,
      error : resp.error
    }
  }

  return {
    success : true,
    data : resp.data
  }
}