import {z} from "zod"

export const ContinueWatching = z.object({
    id : z.string().optional(),
    userId : z.string(),
    contentName: z.string(),
    movieId: z.string(),
    category: z.string(),
    imageUrl: z.string(),
    season: z.string().optional(),
    episode: z.string().optional(),
    updatedAt: z.string().optional()
})

export type ContinueWatchingSchema = z.infer<typeof ContinueWatching>