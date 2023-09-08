import { getInvitationQueryType, invitationType } from '@wedding/state/schema'
import { dummyWeddings } from '@wedding/dummy'
import { check, delay } from '@app/helpers/utils'
import { clientError, signal } from '@app/helpers/api'

export const getInvitationQuery = (request: unknown) => {
  const { page, guest, value } = check(getInvitationQueryType, request)

  return signal(async (signal) => {
    await delay()

    // if (page === 'editor') {
    //   const { data, error } = await supabase
    //     .from('wedding')
    //     .select('name,wid,uid,status')
    //     .abortSignal(signal)
    //     .eq('wid', value)
    //     .single()

    //   if (error) throw error
    //   return WeddingInvitation.parse({ ...data, guest })
    // }

    // const { data, error } = await supabase
    //   .from('wedding')
    //   .select('name,wid,uid,status')
    //   .containedBy('guest', [guest])
    //   .abortSignal(signal)
    //   .eq('name', value)
    //   .single()

    // if (error) throw error
    // return WeddingInvitation.parse({ ...data, guest })

    if (signal.aborted) {
      throw clientError('E001')
    }

    if (page === 'editor') {
      const response = dummyWeddings.find(({ wid }) => wid === value)

      if (!response) {
        throw clientError('E201')
      }

      return invitationType.parse({ ...response, guest })
    }

    const response = dummyWeddings.find(({ name }) => name === value)

    if (!response || response.guest !== guest) {
      throw clientError('E201')
    }

    return invitationType.parse({ ...response, guest })
  })
}
