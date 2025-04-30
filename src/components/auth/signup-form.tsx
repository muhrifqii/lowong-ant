"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, LoadingButton } from "@/components/ui/button";
import { useState } from "react";
import { AuthWithPasswordCredentials, AuthWithPasswordResponse } from "@/types/auth";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters")
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include a lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include an uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Must include a number",
    })
    .refine((val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(val), {
      message: "Must include a special character",
    }),
  confirmPassword: z.string().min(8),
  captchaToken: z.string().optional(), // ignored for now. dev on localhost is tidious
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export type SignUpFormProps = {
  onSubmit: (data: AuthWithPasswordCredentials) => Promise<AuthWithPasswordResponse>,
  goToSignIn?: () => void,
};

// const hcaptcha = hcaptchaSite();

export function SignupForm({ onSubmit, goToSignIn }: SignUpFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      captchaToken: "",
    },
    mode: "onChange",
  });
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: SignupFormValues) => {
    setError(null);
    const { error } = await onSubmit(values);
    if (error) setError(error.message);
    else {
      router.push("/");
      toast.info("Please verify your email. Check your email inbox or spam folder.")
    }
  };

  const checkOnChanges = () => {
    if (error) setError(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} onChange={checkOnChanges} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Your Account Now</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Create account using your valid email
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input id={field.name} type="email" placeholder="muhrifqii@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input id={field.name} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input id={field.name} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="grid gap-3">
            <FormField
              control={form.control}
              name="captchaToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <HCaptcha
                      sitekey={hcaptcha}
                      onVerify={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <LoadingButton
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
            isLoading={form.formState.isSubmitting}
            >
            Create Account
          </LoadingButton>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0"
            onClick={() => goToSignIn?.()}
            disabled={form.formState.isSubmitting}>
            Log In
          </Button>
        </div>
      </form>
    </Form>
  );
}
