import { type FC, type Infer } from '@app/types'
import { weddingSectionImageType, weddingType } from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps, useWeddingPath } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import WeddingImage from '@wedding/components/Image'
import TemplateCouple from '@wedding/template/Couple'

const TemplateImage: FC<typeof weddingSectionImageType> = (args) => {
  const { props } = useProps(args, weddingSectionImageType)

  const weddingPath = useWeddingPath()
  const current = <T extends keyof Infer<typeof weddingType>>(key: T) => {
    return check(weddingType, wedding[weddingPath].current)[key]
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
