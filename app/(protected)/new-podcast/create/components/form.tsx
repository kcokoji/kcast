"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/loader";
import { NewPodcastSchema } from "@/schemas/podcast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth";
import { FormError } from "@/app/(auth)/components/form-error";
import { Loader } from "lucide-react";
import { Editor } from "./text-editor";

export default function NewPodcastForm() {
  const searchParams = useSearchParams();
  const calLbackUrl = searchParams.get("callbackUrl");

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof NewPodcastSchema>>({
    resolver: zodResolver(NewPodcastSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      language: "",
      website: "",
      author: "",
      category: [],
      country: "",
      copyright: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPodcastSchema>) => {
    // startTransition(() => {
    //   signIn(values, calLbackUrl)
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
    <div className="mt-6 space-y-2">
      <FormError message={error} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="bg-white"
                    placeholder="Enter Email"
                    type="text"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  100 Maximum Characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="bg-white">
                    <Editor {...field} />
                  </div>
                </FormControl>
                <FormDescription className="text-end">
                  3000 Maximum Characters (including Html Tags)
                </FormDescription>
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
                disabled={isPending}
              >
                {isPending && <Loader className="h-5 w-5 animate-spin" />}
                <span>Next</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
