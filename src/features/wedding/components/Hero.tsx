import { type FC, type Infer } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { lazy, onMount } from 'solid-js'
import { invitationType, weddingPropsType } from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import BackgroundImage from '@app/components/BackgroundImage'

const weddingHeroType = z.object({
  page: weddingPropsType.shape.page,
})

const WeddingHero: FC<typeof weddingHeroType> = (args) => {
  const { props } = useProps(args, weddingHeroType)
  const state = createMutable({ height: 0 })

  let heroContent: HTMLElement

  const current = <T extends keyof Infer<typeof invitationType>>(key: T) => {
    return check(invitationType, wedding[props.page].current)[key]
  }

  const onopen = () => {
    console.log('played')
  }

  const HeroCoupleName = lazy(
    () => import(`../template/v1/${current('template')}/icon/hero.svg`)
  )

  onMount(() => {
    const resizer = new ResizeObserver((ent) => {
      for (const entry of ent) {
        state.height = entry.borderBoxSize[0].blockSize
      }
    })

    resizer.observe(heroContent)
  })

  return (
    <>
      <div
        class='relative h-inherit min-h-[inherit] origin-top-left'
        style={{ transform: 'translateZ(-2px) scale(3)' }}
      >
        <BackgroundImage
          url={current('cover')?.url ?? ''}
          class={css('absolute h-full w-full bg-black/80')}
          style={{
            'background-size': current('cover')?.size ?? 'cover',
            'background-position': current('cover')?.position ?? 'center',
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
        class='relative z-10 flex origin-top-left flex-col justify-center safearea'
        style={{
          'margin-top': `-${state.height}px`,
          transform: `scale(2) translate3d(0, calc(50vh - ${state.height / 2}px), -1px)`, // prettier-ignore
        }}
      >
        <div class='mx-auto' style={{ width: 'min(70%, 256px)' }}>
          <HeroCoupleName />
        </div>
        <div class='mb-12 flex w-full flex-col text-center'>
          <p class='text-elevated mt-2 text-white'>
            Undangan kepada Yth.
            <br />
            {current('guest')}
          </p>
          <button
            onclick={onopen}
            class='mx-auto my-6 inline-flex rounded-full bg-white/70 px-4 py-2 font-semibold'
          >
            Play
          </button>
          <div class='mx-auto max-w-full'>
            <div
              class={css(
                'text-elevated animate-scrolldown relative text-transparent',
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
