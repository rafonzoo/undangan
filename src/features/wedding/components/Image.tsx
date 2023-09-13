import { type FC } from '@app/types'
import { lazy } from 'solid-js'
import { weddingImageEntityType } from '@wedding/state/schema'
import { getWedding } from '@wedding/helpers'
import { useProps } from '@app/helpers/hook'

const WeddingImage: FC<typeof weddingImageEntityType> = (args) => {
  const { props } = useProps(args, weddingImageEntityType)

  const ImageElement: FC<typeof weddingImageEntityType> = lazy(
    () => import(`../template/v1/${getWedding('template')}/Image.tsx`)
  )

  return <ImageElement {...props} />
}

export default WeddingImage
