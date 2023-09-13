import { createEffect } from 'solid-js'
import { getWedding } from '@wedding/helpers'
import disqus from '@wedding/disqus'
import { useLocation } from '@solidjs/router'
import { css } from '@app/helpers/lib'
import { useIntersection } from '@app/helpers/hook'
import WeddingGift from '@wedding/components/Gift'

const WeddingComment = () => {
  const { isIntersecting, setElement } = useIntersection()
  const { pathname } = useLocation()

  createEffect(() => {
    if (!isIntersecting()) return

    let config = {
      id: 'local-dev',
      title: 'RFZ Wedding App',
      url: [location.protocol, location.hostname].join('//'),
    }

    if (location.hostname !== 'localhost') {
      config = {
        id: getWedding('wid'),
        title: document.title,
        url: location.origin + pathname,
      }
    }

    disqus(config)
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
