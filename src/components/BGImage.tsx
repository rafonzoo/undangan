import { type Child, type Infer, type SX } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { createEffect, createMemo, splitProps } from 'solid-js'
import { intersectionOptionType } from '@app/state/schema'
import { css } from '@app/helpers/lib'
import { useIntersection, useProps } from '@app/helpers/hook'

const backgroundImageType = z.object({
  url: z.string(),
  observer: intersectionOptionType.optional(),
  onready: z.function().optional(),
})

type BackgroundImageType = Infer<typeof backgroundImageType>
type BackgroundImageProps = SX<'div'> & BackgroundImageType

const BackgroundImage: Child<BackgroundImageProps> = (arg) => {
  const state = createMutable({ url: '' })
  const [local, div] = splitProps(arg, ['url', 'onready', 'observer'])

  const { props } = useProps(local, backgroundImageType)
  const { isIntersecting, setElement } = useIntersection(props.observer)

  const isDataUri = createMemo(() => props.url.includes('data:image/png'))

  const backgroundUrl = createMemo(() => {
    if (isDataUri()) {
      return `url("${props.url}")`
    }

    return !!state.url ? `url("${state.url}")` : 'none'
  })

  createEffect(() => {
    const img = new Image()

    if (isDataUri() || !isIntersecting() || !Boolean(props.url)) {
      return
    }

    img.src = props.url
    img.onload = () => {
      img.decode().then(() => {
        state.url = img.src
        /**
         * Callback if the image truely load.
         */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => props.onready?.())
        })
      })
    }
  })

  return (
    <div
      {...div}
      ref={setElement}
      class={css('bg-no-repeat', div.class)}
      style={{
        ...(typeof div.style === 'object' ? div.style : {}),
        'background-image': backgroundUrl(),
      }}
    />
  )
}

export default BackgroundImage
