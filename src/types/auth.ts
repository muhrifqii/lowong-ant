import { User, Session, AuthError } from "@supabase/auth-js";

export type AuthWithPasswordCredentials = {
  /** The user's email address. */
  email: string
  /** The user's password. */
  password: string
  options?: {
    /** Verification token received when the user completes the captcha on the site. */
    captchaToken?: string
  }
};

export type AuthWithPasswordResponse = {
  data: {
    user: User
    session: Session
  }
  error: AuthError | null
};
