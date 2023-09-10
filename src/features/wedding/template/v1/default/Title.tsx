import { type FC } from '@app/types'
import { lazy } from 'solid-js'
import { weddingTitleEntityType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'

const WeddingTitleDefault: FC<typeof weddingTitleEntityType> = (args) => {
  const { props } = useProps(args, weddingTitleEntityType)
  const Title = lazy(() => import(`./title/${props.title}.svg`))
  const classes = {
    comment: 'w-[max(81.87134502%,_240px)]',
    date: 'w-[max(67.83625730%,_240px)]',
    intro: 'w-[max(77.19298245%,_240px)]',
    story: 'w-[max(81.87134502%,_240px)]',
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
