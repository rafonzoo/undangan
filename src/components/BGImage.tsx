import { type Child, type Infer, type SX } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { createEffect, splitProps } from 'solid-js'
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

  createEffect(() => {
    const img = new Image()

    if (!isIntersecting() || !Boolean(props.url)) {
      return
    }

    img.src = props.url
    img.onload = () => {
      state.url = img.src
      /**
       * Callback if the image truely load.
       */
      props.onready?.()
    }
  })

  return (
    <div
      {...div}
      ref={setElement}
      class={css('bg-no-repeat', div.class)}
      style={{
        ...(typeof div.style === 'object' ? div.style : {}),
        'background-image': !!state.url ? `url("${state.url}")` : 'none',
      }}
    />
  )
}

export default BackgroundImage
