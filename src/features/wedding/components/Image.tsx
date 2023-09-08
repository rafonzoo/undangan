import { type FC } from '@app/types'
import { z } from 'zod'
import { lazy, splitProps } from 'solid-js'
import { invitationType, weddingImageEntityType } from '@wedding/state/schema'
import { useProps } from '@app/helpers/hook'

const weddingImageType = z.object({
  template: invitationType.shape.template,
  props: weddingImageEntityType,
})

const WeddingImage: FC<typeof weddingImageType> = (args) => {
  const [local, img] = splitProps(args, ['template'])
  const { props } = useProps(img.props, weddingImageEntityType)

  const ImageElement: FC<typeof weddingImageEntityType> = lazy(
    () => import(`../template/v1/${local.template}/Image.tsx`)
  )

  return <ImageElement {...props} />
}

export default WeddingImage
