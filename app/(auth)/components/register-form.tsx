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
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/loader";
import { RegisterSchema } from "@/schemas/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GoogleButton from "./google-button";
import { buttonVariants } from "@/components/ui/button";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
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
        <div className="mb-6 text-center space-y-6">
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
            Create an account
          </h1>
        </div>
        <div className="mb-8">
          <div>
            <div>
              <div className="">
                <GoogleButton />
              </div>
            </div>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter full name"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a name that will be displayed to others on Kcast.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <div>
                  <div>
                    <Button
                      size="lg"
                      type="submit"
                      className="w-full border py-3 px-4 text-base shadow-sm border-black"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="flex justify-center items-center">
              Already have an account?
              <Link
                href="/login"
                className={buttonVariants({ variant: "link" })}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
