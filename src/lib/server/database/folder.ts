import { supabase } from "@/client/supabase";
import { handleResponse, type DatabaseResponse } from "$lib/utils/helpers"

type FolderItems = {
  name : string
  id : string
}[]

export const getRootFolders = async (user_id : string ) => {

  return handleResponse<FolderItems>(await supabase.from('folder')
    .select('name, id')
    .eq('user_id', user_id)
    .is('parent_id', null)
  )
}
export const getFolders = async (user_id : string, parent_id : string) => {

  return handleResponse<FolderItems>(await supabase.from('folder')
    .select('name, id')
    .match({ user_id, parent_id })
  )
}

export const createFolder = async (name : string, user_id : string, parent_id : string | null = null) : DatabaseResponse => {

  return handleResponse(await supabase.from('folder').insert({
    name,
    user_id,
    parent_id
  }))
}


export const deleteFolder = async (user_id : string, id : string) : DatabaseResponse => {
  
  return handleResponse(await supabase.from('folder').delete().match({
    user_id,
    id
  }))
}

export const renameFolder = async (user_id : string, id : string, name : string) : DatabaseResponse => {
  
  return handleResponse(await supabase.from('folder').update({
    name
  }).match({
    user_id,
    id
  }))
}