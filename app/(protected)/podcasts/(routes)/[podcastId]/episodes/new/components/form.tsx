"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

import { NewEpisodeSchema } from "@/schemas/episode";

import { Loader } from "lucide-react";

import { LanguageOptions, categories, convertFileToBase64 } from "@/lib/utils";

import { FileUploader } from "@/app/(protected)/components/file-uploader";

import { Checkbox } from "@/components/ui/checkbox";

import { createPodcast } from "@/actions/podcast";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/ui/text-editor";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EpisodeType } from "@prisma/client/edge";
import { Label } from "@/components/ui/label";

export default function NewEpisodeForm() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof NewEpisodeSchema>>({
    resolver: zodResolver(NewEpisodeSchema),
    defaultValues: {
      title: "",
      description: "",
      explicit: false,
      seasonNo: "",
      episodeNo: undefined,
      status: "Draft",
      episodeType: "Full",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewEpisodeSchema>) => {
    // try {
    //   setLoading(true);
    //   // Check if file exists
    //   if (!values.file) {
    //     return toast.error("Cover art is required");
    //   }
    //   // Prepare form data
    //   const file = values.file[0];
    //   const base64String = await convertFileToBase64(file);
    //   // Upload file
    //   const requestBody = {
    //     base64String: base64String,
    //   };
    //   const response = await fetch(
    //     `/api/podcast/upload?filename=${file.name}&filetype=${file.type}`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(requestBody),
    //     }
    //   );
    //   // Get image URL from response
    //   const imageUrl = await response.json();
    //   // Prepare podcast data
    //   const data = {
    //     imageUrl,
    //     description: values.description,
    //     language: values.language,
    //     author: values.author,
    //     copyright: values.copyright,
    //     explicit: values.explicit,
    //     website: values.website,
    //     category: values.category,
    //     title: values.title,
    //   };
    //   // Create podcast
    //   const podcastResponse = await createPodcast(data);
    //   // Check if there's an error
    //   if (podcastResponse?.error) {
    //     toast.error(podcastResponse.error);
    //   }
    //   if (podcastResponse?.success) {
    //     router.push(`/podcasts/${podcastResponse.success}`);
    //     toast.success("Podcast Created");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Opps,Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="mt-6 space-y-2">
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
                    disabled={isLoading}
                    className="bg-white"
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
                <div className="min-h-40 bg-white rounded-md">
                  <FormControl>
                    <Editor {...field} disabled={isLoading} />
                  </FormControl>
                </div>
                <FormDescription className="text-end">
                  3000 Maximum Characters (including Html Tags)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="episodeType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>The type of episode</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-2 flex-wrap "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Label
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary/50 dark:[&:has(:checked)]:bg-gray-800"
                          htmlFor={EpisodeType.Full}
                        >
                          <RadioGroupItem
                            id={EpisodeType.Full}
                            value={EpisodeType.Full}
                          />
                          {EpisodeType.Full}
                        </Label>
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Label
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary/50 dark:[&:has(:checked)]:bg-gray-800"
                          htmlFor={EpisodeType.Trailer}
                        >
                          <RadioGroupItem
                            id={EpisodeType.Trailer}
                            value={EpisodeType.Trailer}
                          />
                          {EpisodeType.Trailer}
                        </Label>
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Label
                          className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-primary/50 dark:[&:has(:checked)]:bg-gray-800"
                          htmlFor={EpisodeType.Bonus}
                        >
                          <RadioGroupItem
                            id={EpisodeType.Bonus}
                            value={EpisodeType.Bonus}
                          />
                          {EpisodeType.Bonus}
                        </Label>
                      </FormControl>
                      <FormLabel className="font-normal">Nothing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="episodeNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
                    type="number"
                    pattern="[0-9]+"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  If all your episodes have numbers and you would like the to be
                  based on the numbers use this tag
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seasonNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Season Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
                    type="number"
                    pattern="[0-9]+"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  If all your episode is within a season use this tag
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Cover Art</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={3 * 1024 * 1024}
                      disabled={isLoading}
                      accept={{ "audio/*": [] }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="explicit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0  p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="text-base lg:text-lg text-black">
                  This podcast includes explicit content
                </FormDescription>
              </FormItem>
            )}
          />
          <div>
            <Button size="lg" type="submit" disabled={isLoading}>
              {isLoading && <Loader className="h-5 w-5 animate-spin" />}
              <span>Create</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
