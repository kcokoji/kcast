import * as z from "zod";
export const NewPodcastSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title is required",
    })
    .max(100, {
      message: "Maximum characters exceeded",
    }),
  description: z
    .string()
    .min(5, {
      message: "Description is required",
    })
    .max(3000, {
      message: "Maximum characters exceeded",
    }),
  file: z.array(z.instanceof(File)).optional(),
  language: z.string(),
  website: z.string().url().optional(),
  author: z
    .string()
    .min(5, {
      message: "Title is required",
    })
    .max(100, {
      message: "Maximum characters exceeded",
    }),
  category: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one category."),
  copyright: z
    .string()
    .min(5, {
      message: "Title is required",
    })
    .max(100, {
      message: "Maximum characters exceeded",
    }),
  explicit: z.boolean(),
  imageUrl: z.string().optional(),
});
