import { z } from 'zod'

export const guestType = z.string()
export const iconType = z.enum(['message', 'bride', 'groom'])

export const commentType = z.object({
  uid: z.string().uuid(),
  wid: z.string().uuid(),
  name: guestType,
  email: z.string().email(),
})

export const invitationImageCaptionType = z.object({
  text: z.string().min(3).max(60),
  placement: z.enum(['top left', 'top right', 'bottom left', 'bottom right']),
})

export const invitationImageType = z.object({
  url: z.string(),
  orientation: z.enum(['portrait', 'landscape']),
  placement: z.enum(['left', 'right', 'center']).optional(),
  position: z.string().optional(),
  caption: invitationImageCaptionType.nullable(),
})

export const invitationEntityType = z.object({
  label: z.string().startsWith('section-'),
  image: invitationImageType.nullable(),
  text: z.object({ body: z.string(), icon: iconType }).nullable(),
})

export const invitationSectionType = z.object({
  intro: invitationEntityType.array(),
  date: invitationEntityType.array(),
  story: invitationEntityType.array(),
  comment: invitationEntityType.array(),
})

export const invitationType = z.object({
  uid: z.string().uuid(),
  wid: z.string().uuid(),
  name: z.string(),
  status: z.enum(['paid', 'pending', 'unpaid']),
  guest: guestType,
  template: z.enum(['default']),
  section: invitationSectionType,
})

const weddingPageType = z.object({
  current: invitationType.nullable(),
  list: invitationType.array(),
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

export const weddingPropsType = z.object({
  page: z.enum(['editor', 'couple']),
})

export const weddingColumnType = z.object({
  editor: z.literal('wid'),
  couple: z.literal('name'),
})

// Api
export const getInvitationQueryType = weddingPropsType.extend({
  guest: z.string(),
  value: z.string(),
})

// Components
const weddingImageClassType = z.record(
  z.enum(['figure', 'image', 'caption']),
  z.string().optional()
)

export const weddingImageType = invitationImageType
  .partial({ url: true })
  .extend({ class: weddingImageClassType.optional() })

export const weddingCopyType = z.object({
  class: z.string().optional(),
  section: invitationSectionType.keyof(),
})

export const weddingSectionImageType = invitationEntityType.pick({
  image: true,
  label: true,
})

export const weddingSectionTextType = invitationEntityType
  .pick({ text: true })
  .extend({
    color: z.string().nullable(),
    // show: z.function(),
  })
