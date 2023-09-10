import { type FC } from '@app/types'
import { Suspense } from 'solid-js'
import { weddingPropsType } from '@wedding/state/schema'
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
          'h-screen min-h-[525px] w-full overflow-y-auto overflow-x-hidden'
          // {
          //   'h-screen': !isIOS(), // <-- Android fix.
          //   'h-full': isIOS(),
          // }
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
