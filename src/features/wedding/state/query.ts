import { getInvitationQueryType, weddingType } from '@wedding/state/schema'
import { dummyWeddings } from '@wedding/dummy'
import { check, delay } from '@app/helpers/utils'
import { clientError, signal } from '@app/helpers/api'
import { __DEV__, supabase } from '@app/config/env'

export const getInvitationQuery = (request: unknown) => {
  const { page, guest, value } = check(getInvitationQueryType, request)

  return signal(async (signal) => {
    if (__DEV__) {
      await delay()

      if (signal.aborted) {
        throw clientError('E001')
      }

      if (page === 'editor') {
        const response = dummyWeddings.find(({ wid }) => wid === value)

        if (!response) {
          throw clientError('E201')
        }

        return weddingType.parse({ ...response, guest })
      }

      const response = dummyWeddings.find(({ name }) => name === value)

      if (!response || response.guest !== guest) {
        throw clientError('E201')
      }

      return weddingType.parse({ ...response, guest })
    }

    if (page === 'editor') {
      const { data, error } = await supabase
        .from('wedding')
        .select('name,wid,uid,status,template,hero,section,song,gift')
        .abortSignal(signal)
        .eq('wid', value)
        .single()

      if (error) throw error
      return weddingType.parse({ ...data, guest })
    }

    const { data, error } = await supabase
      .from('wedding')
      .select('name,wid,uid,status,template,hero,section,song,gift')
      .containedBy('guest', [guest])
      .abortSignal(signal)
      .eq('name', value)
      .single()

    if (error) throw error
    return weddingType.parse({ ...data, guest })
  })
}
