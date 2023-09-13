import { type FC } from '@app/types'
import { lazy } from 'solid-js'
import { weddingTitleEntityType } from '@wedding/state/schema'
import { getWedding } from '@wedding/helpers'
import { useProps } from '@app/helpers/hook'

const TemplateTitle: FC<typeof weddingTitleEntityType> = (args) => {
  const { props } = useProps(args, weddingTitleEntityType)

  const TitleElement: FC<typeof weddingTitleEntityType> = lazy(
    () => import(`./v1/${getWedding('template')}/Title.tsx`)
  )

  return <TitleElement {...props} />
}

export default TemplateTitle
