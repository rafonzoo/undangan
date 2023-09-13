import { type FC } from '@app/types'
import { createMemo, lazy } from 'solid-js'
import { weddingSectionTextType } from '@wedding/state/schema'
import { getWedding } from '@wedding/helpers'
import { css } from '@app/helpers/lib'
import { useIntersection, useProps } from '@app/helpers/hook'
import SVGIcon from '@app/components/SVGIcon'

const TemplateText: FC<typeof weddingSectionTextType> = (args) => {
  const { props } = useProps(args, weddingSectionTextType)
  const { isIntersecting, setElement } = useIntersection({ threshold: 0.25 })

  const isForbidden = createMemo(() => {
    const guest = getWedding('guest')
    const restrictedTo = props.restrictedTo

    if (!restrictedTo || restrictedTo.length === 0) {
      return false
    }

    return !Boolean(
      guest.match(new RegExp(`\(${restrictedTo.join('|')}\)`, 'i'))
    )
  })

  if (!props.text || isForbidden()) {
    return null
  }

  const icon = props.text.icon
  const IconComponent = lazy(
    () => import(`./v1/${getWedding('template')}/icon/${icon}.svg`)
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
      <p
        children={props.text.body}
        class={css('text-lead font-semibold -tracking-lead')}
      />
    </div>
  )
}

export default TemplateText
