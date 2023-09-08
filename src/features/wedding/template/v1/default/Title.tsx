import { type FC } from '@app/types'
import { lazy } from 'solid-js'
import { weddingTitleEntityType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'

const WeddingTitleDefault: FC<typeof weddingTitleEntityType> = (args) => {
  const { props } = useProps(args, weddingTitleEntityType)
  const Title = lazy(() => import(`./title/${props.title}.svg`))
  const classes = {
    comment: 'w-[81.87134502%]',
    date: 'w-[67.83625730%]',
    intro: 'w-[77.19298245%]',
    story: 'w-[81.87134502%]',
  }

  return (
    <div
      id={`section-${props.title}-title`}
      class={css('mx-auto block', props.class, classes[props.title])}
    >
      <Title />
    </div>
  )
}

export default WeddingTitleDefault
