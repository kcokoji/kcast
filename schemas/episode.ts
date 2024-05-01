import { EpisodeStatus, EpisodeType } from "@prisma/client/edge";

import * as z from "zod";
export const NewEpisodeSchema = z.object({
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
  explicit: z.boolean(),
  audioUrl: z.string().optional(),
  seasonNo: z.string(),
  episodeNo: z.number().int(),
  status: z.enum([
    EpisodeStatus.Draft,
    EpisodeStatus.Published,
    EpisodeStatus.Scheduled,
  ]),
  episodeType: z.enum([
    EpisodeType.Trailer,
    EpisodeType.Full,
    EpisodeType.Bonus,
  ]),
});
