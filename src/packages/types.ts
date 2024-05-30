import {z} from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    fullname: z.string(),
    email: z.string(),
    password: z.string(),
    profilepic: z.string().optional()
})

export type User = z.infer<typeof userSchema>