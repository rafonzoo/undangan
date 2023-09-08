import { z } from 'zod'

export const commonStateType = z.object({
  loading: z.boolean(),
})

export const useIntersectionType = z.object({
  rootId: z.string().optional(),
  rootMargin: z.string().optional(),
  threshold: z.number().or(z.number().array()).optional(),
})
