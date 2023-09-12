import { z } from 'zod'
import { bankStateType, guestType } from '@app/state/schema'

export const weddingIconType = z.enum([
  'cake',
  'couple',
  'bride',
  'groom',
  'quotes',
  'ceremony',
  'ring',
  'location',
])

export const weddingImageCaptionType = z.object({
  text: z.string().min(3).max(60),
  placement: z.enum(['top left', 'top right', 'bottom left', 'bottom right']),
})

export const weddingImageType = z.object({
  url: z.string(),
  orientation: z.enum(['portrait', 'landscape']),
  placement: z.enum(['left', 'right', 'center']).nullable(),
  position: z.string().nullable(),
  size: z.string().nullable(),
  caption: weddingImageCaptionType.nullable(),
})

export const weddingTextType = z.object({
  body: z.string(),
  icon: weddingIconType,
})

export const weddingEntityType = z.object({
  label: z.string().startsWith('section-'),
  image: weddingImageType.nullable(),
  text: weddingTextType.nullable(),
})

export const weddingSectionType = z.object({
  intro: weddingEntityType.array(),
  date: weddingEntityType.array(),
  story: weddingEntityType.array(),
  comment: weddingEntityType.array(),
})

export const weddingHeroType = weddingImageType
  .pick({ url: true, position: true })
  .extend({ size: z.string().nullable() })

export const weddingType = z.object({
  uid: z.string().uuid(),
  wid: z.string().uuid(),
  name: z.string(),
  song: z.string().nullable(),
  status: z.enum(['paid', 'pending', 'unpaid']),
  guest: guestType,
  template: z.enum(['default']),
  section: weddingSectionType,
  hero: weddingHeroType,
  gift: bankStateType.array(),
})

export const weddingPageType = z.object({
  current: weddingType.nullable(),
  list: weddingType.array(),
})

export const weddingStateType = z.object({
  couple: weddingPageType,
  editor: weddingPageType,
})

export const weddingParamType = z.object({
  name: z.string().optional(),
  wid: z.string().optional(),
})

export const weddingQueryType = z.object({
  to: z.string().optional(),
})

export const weddingColumnType = z.object({
  editor: z.literal('wid'),
  couple: z.literal('name'),
})

// Api
export const getInvitationQueryType = z.object({
  page: z.enum(['editor', 'couple']),
  guest: z.string(),
  value: z.string(),
})

// Components
export const weddingImageClassType = z.record(
  z.enum(['figure', 'image', 'caption']),
  z.string().optional()
)

export const weddingImageEntityType = weddingImageType
  // .partial({ url: true })
  .extend({ class: weddingImageClassType.optional() })

export const weddingTitleEntityType = z.object({
  class: z.string().optional(),
  title: weddingSectionType.keyof(),
})

export const weddingSectionImageType = weddingEntityType.pick({
  image: true,
  label: true,
})

export const weddingSectionTextType = weddingEntityType
  .pick({ text: true })
  .extend({ color: z.string().nullable() })
