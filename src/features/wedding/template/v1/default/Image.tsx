import { type FC } from '@app/types'
import { createMutable } from 'solid-js/store'
import { lazy, onMount } from 'solid-js'
import { weddingImageType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import BackgroundImage from '@app/components/BackgroundImage'

const WeddingImageDefault: FC<typeof weddingImageType> = (arg) => {
  const { props } = useProps(arg, weddingImageType)
  const state = createMutable({
    hasSibling: false,
    hasArrow: false,
    counter: 0,
    url: {
      frame: '',
      shadow: '',
    },
  })

  const isPortrait = () => props.orientation === 'portrait'
  const isLandscape = () => props.orientation === 'landscape'
  const isRight = () => props.placement === 'right'
  const isCenter = () => props.placement === 'center'
  const isTopRight = () => props.caption?.placement === 'top right'
  const isTopLeft = () => props.caption?.placement === 'top left'
  const isBottomRight = () => props.caption?.placement === 'bottom right'
  const isBottomLeft = () => props.caption?.placement === 'bottom left'
  const ArrowIcon = lazy(() => import('./icon/arrow.svg'))

  let figureElement: HTMLElement | null = null
  let captionElement: HTMLElement | null = null

  onMount(() => {
    if (captionElement) state.hasArrow = captionElement.clientHeight > 28
    if (figureElement) state.hasSibling = !!figureElement?.nextElementSibling
  })

  onMount(async () => {
    const frameUrl = await import(`./frame/${props.orientation}.png`)
    const shadowUrl = await import(`./frame/${props.orientation}-shadow.png`)

    state.url.frame = frameUrl.default
    state.url.shadow = shadowUrl.default
  })

  return (
    <figure
      ref={(ref) => (figureElement = ref)}
      class={css('flex flex-col', props.class?.figure, {
        '-mb-8': isBottomRight() && state.hasSibling,
        '-mb-4': isBottomLeft() && state.hasSibling,
        'opacity-0': state.counter < 3,
        'opacity-100': state.counter === 3,
      })}
    >
      <div
        class={css('relative', {
          '-translate-x-[18.5%]': isRight() && isLandscape(),
        })}
      >
        <BackgroundImage
          url={state.url.frame}
          style={{ 'background-size': 'contain' }}
          onready={() => (state.counter += 1)}
          class={css({
            'pointer-events-none relative z-10 bg-no-repeat': true,
            'pt-[131.295%]': isPortrait(),
            'w-[119.0058479%] pt-[90.6432748%]': isLandscape() && !isCenter(),
            'w-full pt-[76.75%]': isLandscape() && isCenter(),
          })}
        />
        <BackgroundImage
          url={state.url.shadow}
          style={{ 'background-size': '100%' }}
          onready={() => (state.counter += 1)}
          class={css({
            'pointer-events-none absolute': true,
            'left-0 top-0 bg-no-repeat': true,
            'h-[calc(100%_+_64px)] w-[120%]': isPortrait(),
            'h-[calc(100%_+_64px)] w-[137%]': isLandscape() && !isCenter(),
            'h-[calc(100%_+_64px)] w-[115%]': isLandscape() && isCenter(),
          })}
        />
        <div
          class={css('absolute left-0 top-0 h-full rounded-[5.2747%]', {
            'w-full p-[3.55%]': isPortrait(),
            'w-[119.0058479%] p-[3.21637426%]': isLandscape() && !isCenter(),
            'w-full p-[3.06391437%]': isLandscape() && isCenter(),
          })}
        >
          <BackgroundImage
            url={props.url ?? '/images/example.webp'}
            onready={() => (state.counter += 1)}
            style={{ 'background-position': props.position ?? '50% 50%' }}
            class={css('h-full w-full bg-cover', props.class?.image)}
          />
        </div>
      </div>
      {props.caption && (
        <figcaption
          ref={(ref) => (captionElement = ref)}
          class={css(
            'flex items-center whitespace-pre-line font-good text-good',
            {
              'ml-auto mr-8': props.caption?.placement.includes('right'),
              'ml-8 mr-auto': props.caption?.placement.includes('left'),
              '-order-1 mb-1.5': props.caption?.placement.includes('top'),
              'mt-1.5': props.caption?.placement.includes('bottom'),
              [props.class?.caption ?? '']: !!props.class?.caption,
            }
          )}
        >
          <span class='box-content line-clamp-2 max-h-12 max-w-[120px] py-1'>
            {props.caption.text}
          </span>
          {state.hasArrow && (
            <span
              class={css('box-content block h-6 w-6 p-1', {
                '-order-1 self-end': isTopRight(),
                '-scale-x-100 self-end': isTopLeft(),
                '-scale-100 self-start': isBottomLeft(),
                '-order-1 -scale-y-100 self-start': isBottomRight(),
                'mr-2': props.caption?.placement.includes('right'),
                'ml-2': props.caption?.placement.includes('left'),
              })}
            >
              <ArrowIcon />
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

export default WeddingImageDefault
