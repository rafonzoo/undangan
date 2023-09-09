import { type FC } from '@app/types'
import { z } from 'zod'
import { lazy, splitProps } from 'solid-js'
import { invitationType, weddingSectionTextType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useIntersection, useProps } from '@app/helpers/hook'

const templateTextType = z.object({
  template: invitationType.shape.template,
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
        'opacity-100 translate-3d-0': isIntersecting(),
      })}
    >
      <div class='mb-4'>
        <span
          class={css('block h-9 w-9', props.color, {
            'translate-y-1': icon === 'message',
          })}
        >
          <IconComponent />
        </span>
      </div>
      <p class='text-lead font-semibold -tracking-lead'>{props.text.body}</p>
    </div>
  )
}

export default TemplateText
