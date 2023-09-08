import { type Infer } from '@app/types'
import { createStore } from 'solid-js/store'
import { check } from '@app/helpers/utils'
import { userSchema } from '@account/store/schema'

export const [user, setUser] = createStore(
  check(userSchema, {
    account: null,
    profile: null,
  })
)

export const authUserAction = (
  payload?: Infer<typeof userSchema>['account']
) => {
  if (payload) {
    return setUser('account', check(userSchema.shape.account, payload))
  }
}

export const logoutUserAction = () => {
  setUser(() => ({ account: null, profile: null }))
}
