import { type FC, type SX } from '@app/types'
import { z } from 'zod'
import { splitProps } from 'solid-js'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'

const SVGIconType = z.object({
  size: z.number().optional(),
})

const SVGIcon: FC<typeof SVGIconType, SX<'span'>> = (arg) => {
  const [local, span] = splitProps(arg, ['size'])
  const { props } = useProps(local, SVGIconType)

  return (
    <span
      class={css('pointer-events-none block', span.class)}
      style={{
        ...(typeof span.style === 'object' ? span.style : {}),
        width: `${props.size ?? 17}px`,
        height: `${props.size ?? 17}px`,
      }}
    >
      {span.children}
    </span>
  )
}

export default SVGIcon
