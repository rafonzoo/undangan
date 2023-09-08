import { type FC, type Infer } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { lazy, onMount } from 'solid-js'
import { invitationType, weddingPropsType } from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
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
        class='h-inherit min-h-[inherit] origin-top-left'
        style={{ transform: 'translateZ(-2px) scale(3)' }}
      >
        <BackgroundImage
          class='absolute h-full w-full bg-cover bg-center'
          url='/images/example.jpg'
        />
      </div>

      <div
        ref={(ref) => (heroContent = ref)}
        class='flex origin-top-left flex-col justify-center safearea'
        style={{
          'margin-top': `-${state.height}px`,
          transform: `scale(2) translate3d(0, calc(50vh - ${state.height / 2}px), -1px)`, // prettier-ignore
        }}
      >
        <div class='mx-auto' style={{ width: 'min(75%, 256px)' }}>
          <HeroCoupleName />
        </div>
        <div class='h-[222px] w-full' />
      </div>
    </>
  )
}

export default WeddingHero
