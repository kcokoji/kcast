"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/loader";
import { LoginSchema } from "@/schemas/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import FormWrapper from "./form-wrapper";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth";
import { FormError } from "./form-error";
import { Loader } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const calLbackUrl = searchParams.get("callbackUrl");

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signIn(values, calLbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
        })
        .catch(() => setError("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper loading={isPending} title=" Welcome Back 👋" socialButton>
      <div className="mt-6 space-y-2">
        <FormError message={error} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter Email"
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeIcon className="text-muted-foreground h-5 w-5" />
                        ) : (
                          <EyeSlashIcon className="text-muted-foreground h-5 w-5" />
                        )}
                      </span>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="link" className="p-0">
                <Link
                  className={isPending ? "pointer-events-none" : ""}
                  href="/reset-password"
                >
                  Forgot Password?
                </Link>
              </Button>
            </div>
            <div>
              <div>
                <Button
                  size="lg"
                  type="submit"
                  className="w-full border py-3 px-4 text-base shadow-sm border-black"
                  disabled={isPending}
                >
                  {isPending && <Loader className="h-5 w-5 animate-spin" />}
                  <span>Login</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="flex justify-center items-center">
          Don&apos;t have an account?
          <Button asChild variant="link">
            <Link
              href="/register"
              className={isPending ? "pointer-events-none" : ""}
            >
              Sign up for free
            </Link>
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
}
