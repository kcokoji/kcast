"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import Image from "next/image";
import SoundWaves from "public/img/sound-waves.svg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/loader";
import { ResetPasswordSchema } from "@/schemas/auth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    // startTransition(() => {
    //   login(values, calLbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }
    //     })
    //     .catch(() => setError("Oops! Something went wrong!"));
    // });
    console.log(values);
  };

  return (
    <div>
      {" "}
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div className="mb-6 text-center space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center select-none gap-1"
          >
            <Image
              src={SoundWaves}
              alt="Kcast logo"
              width={40}
              height={40}
              quality={100}
            />
          </Link>
          <h1 className=" bg-clip-text text-balance text-center text-[#0A0A0A] text-2xl font-semibold leading-tight sm:text-3xl sm:leading-tight md:leading-tight">
            Forgot Password?
          </h1>
          <h2 className="text-muted-foreground">
            No worries we would send reset instructions.
          </h2>
        </div>
        <div className="mb-8">
          <div className="mt-6 space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <div>
                  <div>
                    <Button
                      size="lg"
                      type="submit"
                      className="w-full border py-3 px-4 text-base shadow-sm border-black"
                    >
                      Reset Password
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="flex justify-center items-center">
              <Link
                href="/login"
                className="hover:underline flex gap-1.5 items-center p-2 hover:text-primary transition-all ease-in-out duration-200 "
              >
                <ArrowLeftIcon className="h-5 w-5" /> Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
