import { getInvitationQueryType, invitationType } from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { signal } from '@app/helpers/api'
import { supabase } from '@app/config/db'

export const getInvitationQuery = (request: unknown) => {
  const { page, guest, value } = check(getInvitationQueryType, request)

  return signal(async (signal) => {
    if (page === 'editor') {
      const { data, error } = await supabase
        .from('wedding')
        .select('name,wid,uid,status,template,hero,section,song')
        .abortSignal(signal)
        .eq('wid', value)
        .single()

      if (error) throw error
      return invitationType.parse({ ...data, guest })
    }

    const { data, error } = await supabase
      .from('wedding')
      .select('name,wid,uid,status,template,hero,section,song')
      .containedBy('guest', [guest])
      .abortSignal(signal)
      .eq('name', value)
      .single()

    if (error) throw error
    return invitationType.parse({ ...data, guest })

    // if (signal.aborted) {
    //   throw clientError('E001')
    // }

    // if (page === 'editor') {
    //   const response = dummyWeddings.find(({ wid }) => wid === value)

    //   if (!response) {
    //     throw clientError('E201')
    //   }

    //   return invitationType.parse({ ...response, guest })
    // }

    // const response = dummyWeddings.find(({ name }) => name === value)

    // if (!response || response.guest !== guest) {
    //   throw clientError('E201')
    // }

    // return invitationType.parse({ ...response, guest })
  })
}
