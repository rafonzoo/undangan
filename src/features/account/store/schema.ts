import { z } from 'zod'

export const userAccountSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email(),
  wedding: z.string().uuid().array(),
})

export const userSchema = z.object({
  account: userAccountSchema.or(z.null()),
  profile: z.null(),
})
