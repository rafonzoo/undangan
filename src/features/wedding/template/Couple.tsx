import { type FC } from '@app/types'
import { z } from 'zod'
import { For, createMemo } from 'solid-js'
import { invitationEntityType, invitationType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import WeddingImage from '@wedding/components/Image'

const templateCoupleType = z.object({
  template: invitationType.shape.template,
  entities: invitationEntityType.array(),
})

const TemplateCouple: FC<typeof templateCoupleType> = (args) => {
  const { props } = useProps(args, templateCoupleType)

  const images = createMemo(
    () =>
    props.entities
      .filter(({ label }) => label.match(/section-intro-[2|3]/))
      .map((section) => section.image)
      .filter(Boolean) // prettier-ignore
  )

  return (
    <div class='-ml-[17%] mt-12 flex w-[132.75%] min-w-[362px] space-x-10 py-10'>
      <For each={images()}>
        {(imgprops, index) => (
          <WeddingImage
            template={props.template}
            props={{
              ...imgprops,
              orientation: 'portrait',
              class: {
                figure: css('w-full', {
                  '-translate-y-10': index() === 0,
                  'translate-y-10': index() > 0,
                }),
              },
            }}
          />
        )}
      </For>
    </div>
  )
}

export default TemplateCouple
