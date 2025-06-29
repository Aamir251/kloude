import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export const handleResponse = <T>(response : PostgrestSingleResponse<null | T>) => {

  if (response.error) {
    return {
      success : false,
      error : response.error.message
    }
  }
  return {
    success : true,
    data : response.data
  }
}

export type DatabaseResponse = Promise<ReturnType<typeof handleResponse>>