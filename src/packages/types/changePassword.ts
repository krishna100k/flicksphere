import {z} from "zod";


export const changePasswordSchema = z.object({
    userId : z.string(),
    currPassword : z.string().nullable(),
    newPassword : z.string()
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>