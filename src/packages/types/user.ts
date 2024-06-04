import {z} from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    image: z.string().optional(),
    createdAt : z.string().optional(),
    updatedAt : z.string().optional(),
    emailVerified : z.string().optional()
})


export type User = z.infer<typeof userSchema>

export interface UserSession{
    name?: string,
    email?: string,
    image?: string 
}