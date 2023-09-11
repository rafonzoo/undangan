import { type FC, type Infer } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { lazy, onCleanup, onMount } from 'solid-js'
import {
  invitationType,
  weddingParamType,
  weddingPropsType,
} from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps, useQueryParam } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import { supabase } from '@app/config/db'
import SVGIcon from '@app/components/SVGIcon'
import BackgroundImage from '@app/components/BGImage'

const weddingHeroType = z.object({
  page: weddingPropsType.shape.page,
})

const WeddingHero: FC<typeof weddingHeroType> = (args) => {
  const { props } = useProps(args, weddingHeroType)
  const { param } = useQueryParam({ param: weddingParamType })
  const state = createMutable({ isLoading: true, isPlaying: false })
  const height = createMutable({ wrapper: 0, content: 0 })

  let heroWrapper: HTMLElement
  let heroContent: HTMLElement
  let heroAudio: HTMLAudioElement

  const HeroCoupleName = lazy(
    () => import(`../template/v1/${current('template')}/icon/hero.svg`)
  )

  const HeroIconPlay = lazy(
    () => import(`../template/v1/${current('template')}/icon/play.svg`)
  )

  const HeroIconPause = lazy(
    () => import(`../template/v1/${current('template')}/icon/pause.svg`)
  )

  const current = <T extends keyof Infer<typeof invitationType>>(key: T) => {
    return check(invitationType, wedding[props.page].current)[key]
  }

  const rootClass = (remove = false) => {
    ;['html', 'body', 'main', '#root'].forEach((root) => {
      const element = document.querySelector<HTMLElement>(root)
      const methods = remove ? 'remove' : 'add'

      element?.classList[methods]('h-full')
    })
  }

  const getImageUrl = () => {
    const url = current('hero')?.url

    if (!param.name || !url) {
      return ''
    }

    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(param.name + url)

    return data.publicUrl
  }

  const getMusicUrl = () => {
    const url = current('song')

    if (!param.name || !url) {
      return ''
    }

    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(param.name + url)

    return data.publicUrl
  }

  onMount(() => {
    const observer = new ResizeObserver((ent) => {
      for (const entry of ent) {
        if (entry.target === heroContent) {
          height.content = entry.borderBoxSize[0].blockSize
        } else {
          height.wrapper = entry.borderBoxSize[0].blockSize
        }
      }
    })

    observer.observe(heroWrapper)
    observer.observe(heroContent)
  })

  onMount(() => rootClass())
  onCleanup(() => rootClass(true))

  return (
    <>
      <div
        ref={(ref) => (heroWrapper = ref)}
        class='relative h-inherit min-h-[inherit] origin-top-left'
        style={{ transform: 'translateZ(-2px) scale(3)' }}
      >
        <BackgroundImage
          url={getImageUrl() ?? '/images/example.jpg'}
          onready={() => (state.isLoading = false)}
          class={css('absolute h-full w-full bg-black', {
            'animate-pulse': state.isLoading,
          })}
          style={{
            'background-size': current('hero')?.size ?? 'cover',
            'background-position': current('hero')?.position ?? 'center',
          }}
        />
        <div
          class={css(
            'absolute bottom-0 left-0 h-[75%] w-full',
            'bg-gradient-to-b from-transparent to-black/90'
          )}
        />
      </div>
      <div
        ref={(ref) => (heroContent = ref)}
        class='relative z-10 flex origin-top-left flex-col justify-center px-6'
        style={{
          'margin-top': `-${height.content}px`,
          transform: `translate3d(0, ${height.wrapper - height.content}px, -1px) scale(2)`, // prettier-ignore
        }}
      >
        <div class='mx-auto' style={{ width: '240px' }}>
          <HeroCoupleName />
        </div>
        <div class='mb-10 flex w-full flex-col text-center'>
          <p class='mt-2 text-elevated text-white'>
            Invites you to our wedding,
            <br />
            {current('guest')}
          </p>
          <button
            onclick={() => {
              heroAudio[!state.isPlaying ? 'play' : 'pause']()
              state.isPlaying = !state.isPlaying ? true : false
            }}
            class={css(
              'mx-auto my-6 inline-flex items-center justify-center',
              'h-10 rounded-full bg-white/70 font-semibold text-black',
              {
                'w-10': state.isPlaying,
                'w-[85px]': !state.isPlaying,
              }
            )}
          >
            <audio
              src={getMusicUrl()}
              ref={(ref) => (heroAudio = ref)}
              onended={() => (state.isPlaying = false)}
            />
            <span
              class={css('animate-playback', {
                hidden: !state.isPlaying,
                block: state.isPlaying,
              })}
            >
              <SVGIcon size={24} children={<HeroIconPause />} />
            </span>
            <span
              class={css('m-auto flex translate-x-0.5 items-center', {
                hidden: state.isPlaying,
              })}
            >
              <span>Play</span>
              <SVGIcon size={18} class='ml-1'>
                <HeroIconPlay />
              </SVGIcon>
            </span>
          </button>
          <div class='mx-auto max-w-full'>
            <div
              class={css(
                'relative animate-scrolldown text-elevated text-transparent',
                'left-1/2 mx-auto w-[408px] -translate-x-1/2 bg-clip-text',
                'pointer-events-none'
              )}
              style={{
                'background-image': `-webkit-gradient(${[
                  'linear',
                  '0% 0%, 100% 0%',
                  'from(rgb(53, 53, 53))',
                  'color-stop(0.3, rgb(53, 53, 53))',
                  'color-stop(0.5, white)',
                  'color-stop(0.7, rgb(53, 53, 53))',
                  'to(rgb(53, 53, 53))',
                ].join(', ')})`,
              }}
            >
              Scroll down to open
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeddingHero
