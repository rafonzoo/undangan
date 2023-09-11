import { type FC } from '@app/types'
import { Show, createMemo } from 'solid-js'
import {
  weddingParamType,
  weddingPropsType,
  weddingQueryType,
} from '@wedding/state/schema'
import { getInvitationAction } from '@wedding/state/action'
import { useProps, useQueryParam, useResource } from '@app/helpers/hook'
import { wedding } from '@app/config/store'
import WeddingInvitation from '@wedding/components/Invitation'

const WeddingSwitcher: FC<typeof weddingPropsType> = (args) => {
  const { props } = useProps(args, weddingPropsType)
  const { param, query } = useQueryParam({
    param: weddingParamType,
    query: weddingQueryType,
  })

  const current = createMemo(() => wedding[props.page].current)
  const column = createMemo(() => (props.page === 'couple' ? 'name' : 'wid'))
  const fetchWhen = createMemo(() => {
    const guestQuery = query.to ? decodeURI(query.to) : undefined
    const staledGuest = !!(current()?.guest !== guestQuery)

    return (
      current()?.[column()] !== param[column()] ||
      (props.page === 'couple' && staledGuest)
    )
  })

  const { resource } = useResource(
    () => props.page,
    getInvitationAction,
    fetchWhen
  )

  return (
    <Show when={!resource.loading} fallback={<p>Loading...</p>}>
      <WeddingInvitation page={props.page} />
    </Show>
  )
}

export default WeddingSwitcher
