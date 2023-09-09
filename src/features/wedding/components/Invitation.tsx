import { type FC } from '@app/types'
import { Suspense } from 'solid-js'
import { weddingPropsType } from '@wedding/state/schema'
import { isIOS } from '@app/helpers/utils'
import { css } from '@app/helpers/lib'
import { useProps } from '@app/helpers/hook'
import WeddingSection from '@wedding/components/Section'
import WeddingHero from '@wedding/components/Hero'

const WeddingInvitation: FC<typeof weddingPropsType> = (args) => {
  const { props } = useProps(args, weddingPropsType)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        id='scroller'
        class={css(
          'fixed left-0 top-0 min-h-[525px] w-full overflow-y-auto overflow-x-hidden',
          {
            'h-screen': !isIOS(),
            'h-full': isIOS(),
          }
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
