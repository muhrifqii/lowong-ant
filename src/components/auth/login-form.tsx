"use client";

import { cn } from "@/lib/utils"
import { Button, LoadingButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthWithPasswordResponse, AuthWithPasswordCredentials } from "@/types/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormProps = {
  onSubmit: (data: AuthWithPasswordCredentials) => Promise<AuthWithPasswordResponse>,
  goToSignUp?: () => void,
};

export function LoginForm({onSubmit, goToSignUp }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    const { error } = await onSubmit(values);
    if (error) setError(error.message);
    else {
      router.replace('/dashboard');
    }
  };

  const checkOnChanges = () => {
    if (error) setError(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} onChange={checkOnChanges} className={cn("flex flex-col gap-6")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
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
              {/* <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a> */}
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <LoadingButton
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
            isLoading={form.formState.isSubmitting}
            >
            Login
          </LoadingButton>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0"
            onClick={() => goToSignUp?.()}
            disabled={form.formState.isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  )
}
