import { weddingParamType, weddingQueryType } from '@wedding/state/schema'
import { getInvitationQuery } from '@wedding/state/query'
import { dummyGuest } from '@wedding/dummy'
import {
  useCommonProps,
  useQueryParam,
  useWeddingPath,
} from '@app/helpers/hook'
import { clientError, queryError } from '@app/helpers/api'
import { setter } from '@app/config/store'

export const getInvitationAction = async () => {
  const page = useWeddingPath()
  const { history } = useCommonProps()
  const { query, param } = useQueryParam({
    query: weddingQueryType,
    param: weddingParamType,
  })

  try {
    const isCouple = page === 'couple'
    const value = param[isCouple ? 'name' : 'wid']

    if ((!query.to && isCouple) || !value) {
      throw clientError('E101')
    }

    const guest = decodeURI(query.to ?? dummyGuest)
    const response = await getInvitationQuery({ page, guest, value })

    setter.wedding(page, (prev) => ({
      current: response,
      list: response
        ? [...prev.list.filter(({ wid }) => wid !== response.wid), response]
        : [],
    }))
  } catch (e) {
    queryError(e, () => history.replace('/404'))
  }
}
