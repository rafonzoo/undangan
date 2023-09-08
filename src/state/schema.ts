import { z } from 'zod'

export const commonStateType = z.object({
  loading: z.boolean(),
})
