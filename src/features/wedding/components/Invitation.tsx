import { Suspense, onCleanup, onMount } from 'solid-js'
import { css } from '@app/helpers/lib'
import WeddingSection from '@wedding/components/Section'
import WeddingHero from '@wedding/components/Hero'
import WeddingComment from '@wedding/components/Comment'

const WeddingInvitation = () => {
  const fullHeightTags = ['html', 'body', 'main', '#root']

  const rootClass = (remove = false) => {
    fullHeightTags.forEach((tag) => {
      const element = document.querySelector<HTMLElement>(tag)
      const methods = remove ? 'remove' : 'add'

      element?.classList[methods]('h-full')
    })
  }

  onMount(() => rootClass())
  onCleanup(() => rootClass(true))

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        id='scroller'
        class={css(
          'h-full min-h-[525px] w-full overflow-y-auto overflow-x-hidden'
        )}
        style={{
          perspective: '1px',
          'perspective-origin': 'top left',
          '-webkit-overflow-scrolling': 'touch',
        }}
      >
        {/* Cover */}
        <WeddingHero />

        {/* Content */}
        <WeddingSection />

        {<WeddingComment />}
      </div>
    </Suspense>
  )
}

export default WeddingInvitation
