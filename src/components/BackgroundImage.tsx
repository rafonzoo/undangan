import { type Children } from '@app/types'
import { createMutable } from 'solid-js/store'
import { type JSX, createEffect, splitProps } from 'solid-js'
import { useIntersection } from '@app/helpers/hook'

type BackgroundImageProps = JSX.IntrinsicElements['div'] & {
  url: string
  offset?: string
  onready?: () => void
}

const BackgroundImage: Children<BackgroundImageProps> = (arg) => {
  const state = createMutable({ done: false, url: '' })
  const [local, props] = splitProps(arg, ['url', 'offset', 'onready'])

  const { isIntersecting, setElement } = useIntersection({
    rootMargin: local.offset ?? '0px 0px 150px 0px',
  })

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
