import { type Children } from '@app/types'
import { type JSX, onMount, splitProps } from 'solid-js'

const Image: Children<JSX.IntrinsicElements['img']> = (arg) => {
  const [props, img] = splitProps(arg, ['src'])

  let imageElement: HTMLImageElement | null = null

  onMount(() => {
    const observer = new IntersectionObserver((entries, imageObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const isImage = entry.target instanceof HTMLImageElement

          if (isImage) {
            const url = entry.target.dataset.src
            const target = entry.target

            if (url) {
              target.src = url
              target.onload = () => target.removeAttribute('data-src')
            }
          }

          imageObserver.unobserve(entry.target)
        }
      })
    })

    if (imageElement) observer.observe(imageElement)
  })

  return (
    <img {...img} ref={(ref) => (imageElement = ref)} data-src={props.src} />
  )
}

export default Image
