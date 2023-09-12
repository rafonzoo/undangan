import { type FC, type Infer } from '@app/types'
import { z } from 'zod'
import { For, createMemo } from 'solid-js'
import { weddingEntityType, weddingType } from '@wedding/state/schema'
import { check, entries } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps, useWeddingPath } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import TemplateTitle from '@wedding/template/Title'
import TemplateText from '@wedding/template/Text'
import TemplateImage from '@wedding/template/Image'

const wedddingSectionEntityType = z.object({
  data: weddingEntityType.array(),
  color: z.string().nullable(),
})

const WeddingSection = () => {
  const weddingPath = useWeddingPath()

  const current = <T extends keyof Infer<typeof weddingType>>(key: T) => {
    return check(weddingType, wedding[weddingPath].current)[key]
  }

  const sections = createMemo(() =>
    entries(current('section')).map((title) => ({
      title,
      data: current('section')[title],
      color: (() => {
        // prettier-ignore
        switch (title) {
          case 'intro': return 'text-pink-500'
          case 'date': return 'text-orange-500'
          case 'story': return 'text-cyan-500'
        default: return null
      }
      })(),
    }))
  )

  const SectionEntities: FC<typeof wedddingSectionEntityType> = (args) => {
    const { props: local } = useProps(args, wedddingSectionEntityType)
    const additionalGap = '[&:nth-child(n+3)]:pt-12'

    return (
      <For each={local.data}>
        {({ label, image, text }) => (
          <div
            id={label}
            class={css('flex flex-col', {
              [additionalGap]: !!image && !label.match(/section-intro-[2|3]/),
            })}
          >
            <TemplateImage label={label} image={image} />
            <TemplateText
              template={current('template')}
              props={{ color: local.color, text }}
            />
          </div>
        )}
      </For>
    )
  }

  const Section = () => (
    <For each={sections()}>
      {({ title, data, color }, index) => (
        <section id={`section-${title}`} class={css('w-full')}>
          <TemplateTitle
            template={current('template')}
            props={{
              title: title,
              class: css({
                'mt-32': index() > 0,
                'mt-20': index() === 0,
              }),
            }}
          />
          <SectionEntities data={data} color={color} />
        </section>
      )}
    </For>
  )

  return (
    <div class='relative z-10 bg-white dark:bg-black'>
      <div class='mx-auto max-w-[425px]'>
        <div class='flex flex-col px-6'>
          <Section />
        </div>
      </div>
    </div>
  )
}

export default WeddingSection
