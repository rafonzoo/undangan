import { type FC } from '@app/types'
import { createMutable } from 'solid-js/store'
import { batch, createMemo, lazy, onMount } from 'solid-js'
import { weddingImageEntityType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps, useRemoteUrl } from '@app/helpers/hook'
import BackgroundImage from '@app/components/BGImage'

const WeddingImageDefault: FC<typeof weddingImageEntityType> = (arg) => {
  const { props } = useProps(arg, weddingImageEntityType)
  const ArrowIcon = lazy(() => import('./icon/arrow.svg'))
  const state = createMutable({
    hasSibling: false,
    hasArrow: false,
    ready: false,
    url: {
      frame: '',
      shadow: '',
    },
  })

  const url = useRemoteUrl()
  const isPortrait = () => props.orientation === 'portrait'
  const isLandscape = () => props.orientation === 'landscape'
  const isRight = () => props.placement === 'right'
  const isCenter = () => props.placement === 'center'
  const isTopRight = () => props.caption?.placement === 'top right'
  const isTopLeft = () => props.caption?.placement === 'top left'
  const isBottomRight = () => props.caption?.placement === 'bottom right'
  const isBottomLeft = () => props.caption?.placement === 'bottom left'
  const showClasses = createMemo(() => ({ 'opacity-0': !state.ready }))

  let figureElement: HTMLElement
  let captionElement: HTMLElement

  onMount(() => {
    batch(() => {
      if (props.caption) state.hasArrow = captionElement.clientHeight > 28
      state.hasSibling = !!figureElement.nextElementSibling
    })
  })

  onMount(async () => {
    const frameUrl = await import(`./frame/${props.orientation}.png`)
    const shadowUrl = await import(`./frame/${props.orientation}-shadow.png`)

    batch(() => {
      state.url.frame = frameUrl.default
      state.url.shadow = shadowUrl.default
    })
  })

  return (
    <figure
      ref={(ref) => (figureElement = ref)}
      class={css('flex flex-col', props.class?.figure, {
        '-mb-8': isBottomRight() && state.hasSibling,
        '-mb-4': isBottomLeft() && state.hasSibling,
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
          observer={{ rootMargin: '50%', rootId: 'scroller' }}
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
          observer={{ rootMargin: '50%', rootId: 'scroller' }}
          class={css({
            'pointer-events-none absolute': true,
            'left-0 top-0 bg-no-repeat': true,
            'h-[calc(100%_+_64px)] w-[120%]': isPortrait(),
            'h-[calc(100%_+_64px)] w-[136.85%]': isLandscape() && !isCenter(),
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
            url={url(props.url)}
            onready={() => (state.ready = true)}
            observer={{ rootMargin: '50%', rootId: 'scroller' }}
            class={css('h-full w-full rounded', props.class?.image, {
              ...showClasses(),
            })}
            style={{
              'background-position': props.position ?? '50% 50%',
              'background-size': props.size ?? 'cover',
            }}
          />
        </div>
        <div
          class={css(
            'absolute bottom-0 left-0 right-0 top-0 animate-pulse rounded-2xl bg-black/20',
            {
              invisible: state.ready,
              'w-[119.0058479%]': isLandscape() && !isCenter(),
            }
          )}
        />
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
              ...showClasses(),
            }
          )}
        >
          <span class='box-content line-clamp-2 max-h-12 max-w-[120px] py-1'>
            {props.caption.text.replace(/\\n/g, '\n')}
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
