import { createEffect } from 'solid-js'
import { css } from '@app/helpers/lib'
import { useIntersection } from '@app/helpers/hook'
import { __DEV__ } from '@app/config/env'
import WeddingGift from '@wedding/components/Gift'

const WeddingComment = () => {
  const { isIntersecting, setElement } = useIntersection()

  createEffect(() => {
    if (__DEV__) {
      return // EXPERIMENTAL: Comments
    }

    if (!isIntersecting()) {
      return
    }

    const disqus = document.createElement('script')

    disqus.src = import.meta.env.VITE_DISQUS_URL + '/embed.js'
    disqus.setAttribute('data-timestamp', `${+new Date()}`)

    document.body.appendChild(disqus)
  })

  return (
    <div class={css('mx-auto mb-3 flex max-w-[425px] flex-col px-6')}>
      <WeddingGift />
      <div class='mt-3'>
        <div ref={setElement} id='disqus_thread' />
      </div>
    </div>
  )
}

export default WeddingComment
