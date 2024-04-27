"use client";

import { useState, useTransition } from "react";
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

import { NewPodcastSchema } from "@/schemas/podcast";

import { Loader } from "lucide-react";
import { Editor } from "../../../../../components/ui/text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageOptions, categories } from "@/lib/utils";

import { FileUploader } from "@/app/(protected)/components/file-uploader";

import { Checkbox } from "@/components/ui/checkbox";
import MultiSelectFormField from "@/app/(protected)/components/multi-select";
import { createPodcast } from "@/actions/podcast";
import { toast } from "sonner";
import axios from "axios";

export default function NewPodcastForm() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof NewPodcastSchema>>({
    resolver: zodResolver(NewPodcastSchema),
    defaultValues: {
      title: "",
      description: "",
      language: undefined,
      author: "",
      copyright: "",
      explicit: false,

      category: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPodcastSchema>) => {
    try {
      setLoading(true);
      // Check if file exists
      if (!values.file) {
        return toast.error("Cover art is required");
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("file", values.file[0]);

      // Upload file
      const response = await axios.post("/api/podcast/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      });

      // Get image URL from response
      const imageUrl = response.data.publicUrl;

      // Prepare podcast data
      const data = {
        imageUrl,
        description: values.description,
        language: values.language,
        author: values.author,
        copyright: values.copyright,
        explicit: values.explicit,
        website: values.website,
        category: values.category,
        title: values.title,
      };

      // Create podcast
      const podcastResponse = await createPodcast(data);

      // Check if there's an error
      if (podcastResponse?.error) {
        toast.error(podcastResponse.error);
      } else {
        toast.success("Podcast created!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Oops!, Something went wrong");
    } finally {
      setLoading(false);
    }
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
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Choose a language " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LanguageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
                    type="text"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  The creator of the podcast
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copyright"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copyright Notice</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
                    type="text"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  e.g Jane 2022
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <MultiSelectFormField
                    options={categories}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Choose a category"
                    variant="inverted"
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    className="bg-white"
                    type="text"
                  />
                </FormControl>
                <FormDescription className="text-end">
                  (This is optional )
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
                      accept={{ "image/png": [], "image/jpeg": [] }}
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
