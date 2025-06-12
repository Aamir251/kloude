import { getCurrentUserProfile } from "@/server/database/user";
import type { Tables } from "../database.types.js";

export const load = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()

  let userProfile : Tables<"user_profiles"> | undefined;

  if (session?.user.id) {
    const resp = await getCurrentUserProfile(session.user.id)

    if (resp.success) {
      userProfile = resp.user
    }
  }


  return {
    session,
    cookies: cookies.getAll(),
    userProfile
  }
}