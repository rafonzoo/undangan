import { type FC } from '@app/types'
import { z } from 'zod'
import { lazy, splitProps } from 'solid-js'
import { weddingTitleEntityType, weddingType } from '@wedding/state/schema'
import { useProps } from '@app/helpers/hook'

const templateTitleType = z.object({
  template: weddingType.shape.template,
  props: weddingTitleEntityType,
})

const TemplateTitle: FC<typeof templateTitleType> = (args) => {
  const [local, title] = splitProps(args, ['template'])
  const { props } = useProps(title.props, weddingTitleEntityType)

  const TitleElement: FC<typeof weddingTitleEntityType> = lazy(
    () => import(`./v1/${local.template}/Title.tsx`)
  )

  return <TitleElement {...props} />
}

export default TemplateTitle
