import { type FC } from '@app/types'
import { weddingSectionImageType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import WeddingImage from '@wedding/components/Image'
import TemplateCouple from '@wedding/template/Couple'

const TemplateImage: FC<typeof weddingSectionImageType> = (args) => {
  const { props } = useProps(args, weddingSectionImageType)

  if (!props.image || props.label === 'section-intro-3') {
    return null
  }

  if (props.label === 'section-intro-2') {
    return <TemplateCouple />
  }

  return (
    <WeddingImage
      {...props.image}
      class={{
        figure: css({
          'mt-4': props.label.includes('comment'),
          'px-4': props.image.orientation === 'portrait',
        }),
      }}
    />
  )
}

export default TemplateImage
