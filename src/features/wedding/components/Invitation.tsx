import { type FC, type Infer } from '@app/types'
import { createMutable } from 'solid-js/store'
import { For, Suspense, createMemo, lazy, onMount } from 'solid-js'
import CoupleName from '@wedding/template/v1/default/title/cover.svg'
import {
  invitationType,
  weddingCopyType,
  weddingImageType,
  weddingPropsType,
  weddingSectionImageType,
  weddingSectionTextType,
} from '@wedding/state/schema'
import { check, entries, isIOS } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useIntersection, useProps } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import BackgroundImage from '@app/components/BackgroundImage'

const WeddingInvitation: FC<typeof weddingPropsType> = (args) => {
  const { props } = useProps(args, weddingPropsType)

  const section = createMutable({
    matcher: /section-intro-[2|3]/,
    special: 'section-intro-2' as const,
  })

  const state = createMutable({
    coverHeight: 0,
  })

  const current = <T extends keyof Infer<typeof invitationType>>(key: T) => {
    return check(invitationType, wedding[props.page].current)[key]
  }

  const images = createMemo(
    () =>
    current('section').intro
      .filter(({ label }) => label.match(section.matcher))
      .map((section) => section.image)
      .filter(Boolean) // prettier-ignore
  )

  const stateEntities = createMemo(() =>
    entries(current('section')).map((copy) => ({
      copy,
      data: current('section')[copy],
      color: (() => {
        // prettier-ignore
        switch (copy) {
          case 'intro': return 'text-pink-500'
          case 'date': return 'text-green-500'
          case 'story': return 'text-indigo-500'
        default: return null
      }
      })(),
    }))
  )

  const WeddingCopy: FC<typeof weddingCopyType> = (args) => {
    const { props } = useProps(args, weddingCopyType)
    const CopyElement = lazy(
      () => import(`../template/v1/${current('template')}/Title.tsx`)
    )

    return <CopyElement {...props} />
  }

  const WeddingImage: FC<typeof weddingImageType> = (args) => {
    const { props } = useProps(args, weddingImageType)
    const ImageElement = lazy(
      () => import(`../template/v1/${current('template')}/Image.tsx`)
    )

    return <ImageElement {...props} />
  }

  const WeddingImageCouple = () => (
    <div class='-ml-[17%] mt-12 flex w-[132.75%] min-w-[362px] space-x-10 py-10'>
      <For each={images()}>
        {(props, index) => (
          <WeddingImage
            {...props}
            orientation='portrait'
            class={{
              figure: css('w-full', {
                '-translate-y-10': index() === 0,
                'translate-y-10': index() > 0,
              }),
            }}
          />
        )}
      </For>
    </div>
  )

  const SectionImage: FC<typeof weddingSectionImageType> = (args) => {
    const { props: local } = useProps(args, weddingSectionImageType)
    const isThirdIntro = local.label === 'section-intro-3'

    if (!local.image || isThirdIntro) {
      return null
    }

    if (local.label === section.special) {
      return <WeddingImageCouple />
    }

    return (
      <WeddingImage
        {...local.image}
        class={{
          figure: css({
            'mt-4': local.label.includes('comment'),
            'px-4': local.image.orientation === 'portrait',
          }),
        }}
      />
    )
  }

  const SectionText: FC<typeof weddingSectionTextType> = (args) => {
    const { props: local } = useProps(args, weddingSectionTextType)
    const { isIntersecting, setElement } = useIntersection({ threshold: 0.25 })

    if (!local.text) {
      return null
    }

    const icon = local.text.icon
    const IconComponent = lazy(
      () => import(`../template/v1/${current('template')}/icon/${icon}.svg`)
    )

    return (
      <div
        ref={setElement}
        class={css('mt-8', {
          'transition duration-700': true,
          'translate-y-20 opacity-0': !isIntersecting(),
          'opacity-100 translate-3d-0': isIntersecting(),
        })}
      >
        <div class='mb-4'>
          <span class={css('block h-9 w-9', local.color)}>
            <IconComponent />
          </span>
        </div>
        <p class='text-lead font-semibold -tracking-lead'>{local.text.body}</p>
      </div>
    )
  }

  let cover: HTMLElement

  onMount(() => {
    const resizer = new ResizeObserver((ent) => {
      for (const entry of ent) {
        state.coverHeight = entry.borderBoxSize[0].blockSize
      }
    })

    resizer.observe(cover)
  })

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        id='scroller'
        class={css('min-h-[525px] overflow-y-auto overflow-x-hidden', {
          'fixed left-0 top-0 h-full w-full': isIOS(),
          'h-screen': !isIOS(), // Fix jumping content in android.
        })}
        style={{
          perspective: '1px',
          'perspective-origin': 'top left',
          '-webkit-overflow-scrolling': 'touch',
        }}
      >
        {/* Cover */}
        <div
          class='h-[inherit] min-h-[inherit] origin-top-left'
          style={{ transform: 'translateZ(-2px) scale(3)' }}
        >
          <BackgroundImage
            class='absolute h-full w-full bg-cover bg-center'
            url='/images/example.jpg'
          />
        </div>

        <div
          ref={(ref) => (cover = ref)}
          class='flex origin-top-left flex-col justify-center safearea'
          style={{
            'margin-top': `-${state.coverHeight}px`,
            transform: `scale(2)translate3d(0,calc(50vh - ${state.coverHeight / 2}px),-1px)`, // prettier-ignore
          }}
        >
          <div class='mx-auto w-[233px]'>
            <CoupleName />
          </div>
          <div class='h-[222px] w-full' />
        </div>

        {/* Content */}
        <div class='relative z-10 bg-white dark:bg-black'>
          <div class='mx-auto max-w-[425px]'>
            <div class='flex flex-col safearea'>
              <For each={stateEntities()}>
                {({ copy, data, color }, index) => (
                  <section id={`section-${copy}`} class={css('w-full')}>
                    <WeddingCopy
                      section={copy}
                      class={css({
                        'mt-32': index() > 0,
                        'mt-20': index() === 0,
                      })}
                    />
                    <For each={data}>
                      {({ label, image, text }) => (
                        <div
                          id={label}
                          class={css('flex flex-col', {
                            '[&:nth-child(n+3)]:pt-12':
                              !!image && !label.match(section.matcher),
                          })}
                        >
                          <SectionImage label={label} image={image} />
                          <SectionText color={color} text={text} />
                        </div>
                      )}
                    </For>
                  </section>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default WeddingInvitation
