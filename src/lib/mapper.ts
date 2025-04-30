import { AuthWithPasswordResponse } from "@/types/auth";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/auth-js"

export function mapAuthResponse({data, error}: AuthTokenResponsePassword | AuthResponse): AuthWithPasswordResponse {
  return {
    data: {
      user: data.user,
      session: data.session,
    },
    error,
  } as AuthWithPasswordResponse;
}
