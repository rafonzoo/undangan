import { For, createMemo } from 'solid-js'
import { getWedding } from '@wedding/helpers'
import { css } from '@app/helpers/lib'
import WeddingImage from '@wedding/components/Image'

const TemplateCouple = () => {
  const images = createMemo(
    () =>
    getWedding('section').intro
      .filter(({ label }) => label.match(/section-intro-[2|3]/))
      .map((section) => section.image)
      .filter(Boolean) // prettier-ignore
  )

  return (
    <div class='-ml-[17%] mt-12 flex w-[132.75%] min-w-[362px] space-x-10 py-10'>
      <For each={images()}>
        {(imgprops, index) => (
          <WeddingImage
            {...imgprops}
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
}

export default TemplateCouple
