import { type Infer } from '@app/types'
import { weddingType } from '@wedding/state/schema'
import { useLocation } from '@solidjs/router'
import { check } from '@app/helpers/utils'
import { wedding } from '@app/config/store'

export const isFamilyGuest = () => {
  return !!getWedding('guest').match(/\(family|keluarga\)/i)
}

export const getWeddingPath = () => {
  const { pathname } = useLocation()
  const [, page] = pathname.split('/').filter(Boolean)

  if (!page.match(/editor|couple/g)) {
    throw new Error(
      'Calling `getWeddingPath` outside wedding page is forbidden.'
    )
  }

  return page as 'editor' | 'couple'
}

export const getWedding = <T extends keyof Infer<typeof weddingType>>(
  key: T
) => {
  return check(weddingType, wedding[getWeddingPath()].current)[key]
}
