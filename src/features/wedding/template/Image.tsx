import { type FC, type Infer } from '@app/types'
import { z } from 'zod'
import { splitProps } from 'solid-js'
import {
  invitationType,
  weddingPropsType,
  weddingSectionImageType,
} from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import WeddingImage from '@wedding/components/Image'
import TemplateCouple from '@wedding/template/Couple'

const templateImageType = z.object({
  page: weddingPropsType.shape.page,
  props: weddingSectionImageType,
})

const TemplateImage: FC<typeof templateImageType> = (args) => {
  const [local, img] = splitProps(args, ['page'])
  const { props } = useProps(img.props, weddingSectionImageType)

  const current = <T extends keyof Infer<typeof invitationType>>(key: T) => {
    return check(invitationType, wedding[local.page].current)[key]
  }

  if (!props.image || props.label === 'section-intro-3') {
    return null
  }

  if (props.label === 'section-intro-2') {
    return (
      <TemplateCouple
        template={current('template')}
        entities={current('section').intro}
      />
    )
  }

  return (
    <WeddingImage
      template={current('template')}
      props={{
        ...props.image,
        class: {
          figure: css({
            'mt-4': props.label.includes('comment'),
            'px-4': props.image.orientation === 'portrait',
          }),
        },
      }}
    />
  )
}

export default TemplateImage
