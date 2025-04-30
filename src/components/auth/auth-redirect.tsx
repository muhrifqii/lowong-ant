"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const errorCode = searchParams.get('error_code') ?? '';
    const callbackCode = searchParams.get('code') ?? '';
    if (!errorCode) {
      if (callbackCode) {
        toast.success('Email verified. Please log in again.');
        router.replace('/auth');
      }
      return;
    }

    if (errorCode === 'otp_expired') {
      // handle re-send verification email
    } else if (errorCode.startsWith('4')) {
      // handle any auth error
    }
    toast.error(searchParams.get('error_description') ?? errorCode);
  }, [searchParams, router]);

  return null;
}
