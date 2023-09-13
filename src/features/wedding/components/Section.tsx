import { type FC } from '@app/types'
import { z } from 'zod'
import { For, createMemo } from 'solid-js'
import {
  weddingEntityType,
  weddingSectionDateType,
} from '@wedding/state/schema'
import { getWedding } from '@wedding/helpers'
import { entries } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import TemplateTitle from '@wedding/template/Title'
import TemplateText from '@wedding/template/Text'
import TemplateImage from '@wedding/template/Image'

const wedddingSectionEntityType = z.object({
  data: weddingEntityType
    .merge(weddingSectionDateType)
    .partial({ restrictedTo: true })
    .array(),
  color: z.string().nullable(),
})

const WeddingSection = () => {
  const sections = createMemo(() =>
    entries(getWedding('section')).map((title) => ({
      title,
      data: getWedding('section')[title],
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
    const firstImageGap = '[&:nth-child(n+1)]:pt-12'

    return (
      <For each={local.data}>
        {({ label, image, ...rest }) => (
          <div
            id={label}
            class={css('flex flex-col', {
              [additionalGap]: !!image && !label.match(/section-intro-[2|3]/),
              [firstImageGap]:
                (!!image && !label.match(/section-intro-[2|3]/)) &&
                (!image.caption || !image.caption.placement.includes('top')), // prettier-ignore
            })}
          >
            <TemplateImage label={label} image={image} />
            <TemplateText color={local.color} {...rest} />
          </div>
        )}
      </For>
    )
  }

  const Section = () => (
    <For each={sections()}>
      {({ title, data, color }, index) =>
        data.length > 0 && (
          <section id={`section-${title}`} class={css('w-full')}>
            <TemplateTitle
              title={title}
              class={css({
                'mt-[120px]': index() > 0,
                'mt-20': index() === 0,
              })}
            />
            <SectionEntities data={data} color={color} />
          </section>
        )
      }
    </For>
  )

  return (
    <div class='relative z-10 bg-white translate-z-0 backface-hidden dark:bg-black'>
      <div class='mx-auto max-w-[425px]'>
        <div class='flex flex-col px-6'>
          <Section />
        </div>
      </div>
    </div>
  )
}

export default WeddingSection
