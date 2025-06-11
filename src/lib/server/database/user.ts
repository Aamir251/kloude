import { supabase } from "@/client/supabase"
import type { Tables } from "../../../database.types"


type Response = Promise<{
  success: true;
  data: { message: string };
} | {
  success: false;
  error: string;
}>;


export const checkIfUserExists = async (email :string) : Promise<boolean> => {
  const resp = (await supabase.from('user_profiles').select('email').eq('email', email).limit(1))

  if (!resp.count) {
    return true
  }
  return false
  
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