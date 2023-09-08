import { type FC } from '@app/types'
import { lazy } from 'solid-js'
import { weddingCopyType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'

const WeddingCopyDefault: FC<typeof weddingCopyType> = (args) => {
  const { props } = useProps(args, weddingCopyType)
  const Title = lazy(() => import(`./title/${props.section}.svg`))

  return (
    <div
      id={`section-${props.section}-title`}
      class={css('flex justify-center', props.class)}
    >
      <Title />
    </div>
  )
}

export default WeddingCopyDefault
