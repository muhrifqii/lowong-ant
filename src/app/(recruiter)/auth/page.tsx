'use client'

import LogoIcon from "@/assets/icon.svg";
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { AuthWithPasswordCredentials } from "@/types/auth";
import { createClient } from "@/lib/supabase/client";
import { mapAuthResponse } from "@/lib/mapper";

const login = async (args: AuthWithPasswordCredentials) => {
  const result = await createClient().auth.signInWithPassword(args);
  return mapAuthResponse(result);
};

const signup = async (args: AuthWithPasswordCredentials) => {
  const result = await createClient().auth.signUp(args);
  return mapAuthResponse(result);
};

export default function AuthPage() {
  const [mode, setMode] = useState<"login"|"signup">("login");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      <div className="relative hidden lg:block pointer-events-none">
        <Image
          src="/ant_picture.png"
          alt="AI Generated Photo"
          fill={true}
          sizes="50vw"
          // loading="lazy"
          className="object-cover"
          priority={true}
        />
        <div className="fixed flex-row bottom-12 left-0 right-1/2 text-center py-4 px-2">
          <div>
            <h2 className="text-4xl font-bold text-primary-foreground">
              Every step forward leads to something greater.<br/>
              Stay on the path to your next opportunity.<br/>
            </h2>
            <p className="text-primary-foreground text-lg font-bold mt-3">@muhrifqii</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="">
              <Image src={LogoIcon} alt="LowongAnt" className="mr-2 size-16" />
            </div>
            LowongAnt
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {mode === 'signup' ?
              <SignupForm
                onSubmit={signup}
                goToSignIn={() => setMode("login")}
              />
              :
              <LoginForm
                onSubmit={login}
                goToSignUp={() => setMode("signup")}
              />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
