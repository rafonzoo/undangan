import { type FC } from '@app/types'
import { z } from 'zod'
import { lazy, splitProps } from 'solid-js'
import { weddingSectionTextType, weddingType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useIntersection, useProps } from '@app/helpers/hook'
import SVGIcon from '@app/components/SVGIcon'

const templateTextType = z.object({
  template: weddingType.shape.template,
  props: weddingSectionTextType,
})

const TemplateText: FC<typeof templateTextType> = (args) => {
  const [local, text] = splitProps(args, ['template'])
  const { props } = useProps(text.props, weddingSectionTextType)
  const { isIntersecting, setElement } = useIntersection({ threshold: 0.25 })

  if (!props.text) {
    return null
  }

  const icon = props.text.icon
  const IconComponent = lazy(
    () => import(`./v1/${local.template}/icon/${icon}.svg`)
  )

  return (
    <div
      ref={setElement}
      class={css('mt-8', {
        'transition duration-700': true,
        'translate-y-20 opacity-0': !isIntersecting(),
      })}
    >
      <div class='mb-4'>
        <SVGIcon size={36} class={css(props.color)}>
          <IconComponent />
        </SVGIcon>
      </div>
      <p class='text-lead font-semibold -tracking-lead'>{props.text.body}</p>
    </div>
  )
}

export default TemplateText
