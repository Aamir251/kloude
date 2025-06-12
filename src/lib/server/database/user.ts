import { supabase } from "@/client/supabase"
import type { Tables } from "../../../database.types"


type Response = Promise<{
  success: true;
  data: { message: string };
} | {
  success: false;
  error: string;
}>;

/**
 * 
 * @param detailsToFetch the details of the user to fetch like the email, avatar_url and so on
 * @param email the email of the target user
 * @returns the details of the user
 */
export const getCurrentUserProfile = async ( id : string) => {

  const resp = await supabase.from('user_profiles').select("*").eq('id', id).limit(1)
  
  if(!resp.error) {
    return {
      success : true,
      user : resp.data[0]
    }
  }

  return {
    success : false,
    message : 'user not found'
  }
  
}

export const createNewUser = async ({ 
  name, email, id 
}: Pick<Tables<'user_profiles'>, 'id' | 'email' | 'name'>): Response => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        email,
        id,
        name
      })

    if (error) {
      console.error('Database error creating user:', error);
      throw new Error(error.message);
    }

    console.log('User created successfully:', data);
    
    return {
      success: true,
      data: { message: 'User created successfully' }
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Failed to create user:', errorMessage);
    
    return {
      success: false,
      error: errorMessage
    };
  }
};