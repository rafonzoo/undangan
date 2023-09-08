import { type Children, type Infer, type SX } from '@app/types'
import { createMutable } from 'solid-js/store'
import { createEffect, splitProps } from 'solid-js'
import { useIntersectionType } from '@app/state/schema'
import { check } from '@app/helpers/utils'
import { useIntersection } from '@app/helpers/hook'

type BackgroundImageProps = SX<'div'> & {
  url: string
  observer?: Infer<typeof useIntersectionType>
  onready?: () => void
}

const BackgroundImage: Children<BackgroundImageProps> = (arg) => {
  const [local, props] = splitProps(arg, ['url', 'onready', 'observer'])
  const state = createMutable({ done: false, url: '' })
  const { isIntersecting, setElement } = useIntersection(
    check(useIntersectionType.optional(), local.observer)
  )

  createEffect(() => {
    const img = new Image()

    if (!isIntersecting() || !Boolean(local.url)) {
      return
    }

    // Prevents local.url changed from parent
    if (state.done) {
      return
    }

    img.src = local.url
    img.onload = () => {
      state.url = img.src
      state.done = true
      /**
       * Callback if the image truely load.
       */
      local.onready?.()
    }
  })

  return (
    <div
      {...props}
      ref={setElement}
      style={{
        ...(typeof props.style === 'object' ? props.style : {}),
        'background-image': !!state.url ? `url("${state.url}")` : 'none',
      }}
    />
  )
}

export default BackgroundImage
