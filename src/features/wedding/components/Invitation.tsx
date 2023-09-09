import { type FC } from '@app/types'
import { Suspense, onMount } from 'solid-js'
import { weddingPropsType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import WeddingSection from '@wedding/components/Section'
import WeddingHero from '@wedding/components/Hero'

const WeddingInvitation: FC<typeof weddingPropsType> = (args) => {
  const { props } = useProps(args, weddingPropsType)

  onMount(() => {
    const body = document.body

    body.style.position = 'fixed'
    body.style.width = '100%'
    body.style.height = '100%'
    body.style.overflowX = 'hidden'
  })

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        id='scroller'
        class={css(
          'fixed left-0 top-0 h-full min-h-[525px] w-full overflow-y-auto overflow-x-hidden'
        )}
        style={{
          perspective: '1px',
          'perspective-origin': 'top left',
          '-webkit-overflow-scrolling': 'touch',
        }}
      >
        {/* Cover */}
        <WeddingHero page={props.page} />

        {/* Content */}
        <WeddingSection page={props.page} />
      </div>
    </Suspense>
  )
}

export default WeddingInvitation
