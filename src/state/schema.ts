import { z } from 'zod'

export const iconType = z.enum(['pause', 'play'])

export const bankType = z.enum(['mandiri', 'cimb'])

export const guestType = z.string()

export const commonStateType = z.object({
  loading: z.boolean(),
})

export const bankStateType = z.object({
  code: bankType,
  alias: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
})

export const intersectionOptionType = z.object({
  rootId: z.string().optional(),
  rootMargin: z.string().optional(),
  threshold: z.number().or(z.number().array()).optional(),
})
