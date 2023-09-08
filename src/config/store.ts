import { type Infer } from '@app/types'
import { createStore } from 'solid-js/store'
import { type weddingStateType } from '@wedding/state/schema'
import { type commonStateType } from '@app/state/schema'

const [common, setCommon] = createStore<Infer<typeof commonStateType>>({
  loading: false,
})

const [wedding, setWedding] = createStore<Infer<typeof weddingStateType>>({
  couple: {
    current: null,
    list: [],
  },
  editor: {
    current: null,
    list: [],
  },
})

export const setter = {
  common: setCommon,
  wedding: setWedding,
}

export { common, wedding }
