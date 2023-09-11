import { type FC } from '@app/types'
import { z } from 'zod'
import { createEffect } from 'solid-js'
import { weddingPropsType } from '@wedding/state/schema'
import { css } from '@app/helpers/lib'
import { useIntersection } from '@app/helpers/hook'

const weddingCommentType = z.object({
  page: weddingPropsType.shape.page,
})

const WeddingComment: FC<typeof weddingCommentType> = () => {
  const { isIntersecting, setElement } = useIntersection()

  createEffect(() => {
    if (!isIntersecting()) {
      return
    }

    const disqus = document.createElement('script')

    disqus.src = import.meta.env.VITE_DISQUS_URL + '/embed.js'
    disqus.setAttribute('data-timestamp', `${+new Date()}`)

    document.body.appendChild(disqus)
  })

  return (
    <div class={css('mx-auto mb-3 mt-3 max-w-[425px] px-6')}>
      <div ref={setElement} id='disqus_thread' />
    </div>
  )
}

export default WeddingComment
