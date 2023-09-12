import { Show, createEffect, createMemo, onCleanup, untrack } from 'solid-js'
import { weddingParamType, weddingQueryType } from '@wedding/state/schema'
import { getInvitationAction } from '@wedding/state/action'
import { capitalizer } from '@app/helpers/utils'
import { useQueryParam, useResource, useWeddingPath } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import WeddingInvitation from '@wedding/components/Invitation'

const WeddingSwitcher = () => {
  const { param, query } = useQueryParam({
    param: weddingParamType,
    query: weddingQueryType,
  })

  const weddingPath = useWeddingPath()
  const current = createMemo(() => wedding[weddingPath].current)
  const column = createMemo(() => (weddingPath === 'couple' ? 'name' : 'wid'))
  const fetchWhen = createMemo(() => {
    const guestQuery = query.to ? decodeURI(query.to) : undefined
    const staledGuest = !!(current()?.guest !== guestQuery)

    return (
      current()?.[column()] !== param[column()] ||
      (weddingPath === 'couple' && staledGuest)
    )
  })

  const title = createMemo(() => document.title)

  const { resource } = useResource(
    () => weddingPath,
    getInvitationAction,
    fetchWhen
  )

  createEffect(() => {
    const couple = param.name
    const hasGuest = !!current()?.guest

    if (!hasGuest || !couple || weddingPath !== 'couple') {
      return
    }

    document.title = `The Wedding of ${untrack(() =>
      couple.split('-').map(capitalizer).join(' & ')
    )}`

    onCleanup(() => (document.title = title()))
  })

  return (
    <Show when={!resource.loading} fallback={<p>Loading...</p>}>
      <WeddingInvitation />
    </Show>
  )
}

export default WeddingSwitcher
