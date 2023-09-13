import { type FC } from '@app/types'
import { z } from 'zod'
import { createMutable } from 'solid-js/store'
import { batch, lazy, onCleanup } from 'solid-js'
import { getWedding } from '@wedding/helpers'
import { useProps } from '@app/helpers/hook'

interface CopyState {
  copy: number[]
  tick: NodeJS.Timeout | null
}

const weddingGiftBankType = z.object({
  code: z.string(),
})

const WeddingGift = () => {
  const state = createMutable<CopyState>({ copy: [], tick: null })

  const isSelected = (index: number) => {
    return state.copy.some((idx) => idx === index)
  }

  const Bank: FC<typeof weddingGiftBankType> = (args) => {
    const { props: bprops } = useProps(args, weddingGiftBankType)
    const BankLogo = lazy(
      () => import(`../../../assets/bank/${bprops.code}.svg`)
    )

    return <BankLogo />
  }

  const onclick = (accNumber: string, index: number) => {
    if (isSelected(index)) {
      return
    }

    navigator.clipboard.writeText(atob(accNumber))

    batch(() => {
      state.copy.push(index)
      state.tick = setTimeout(() => {
        state.copy = state.copy.filter((idx) => idx !== index)
      }, 3000)
    })
  }

  onCleanup(() => {
    if (state.tick) {
      clearTimeout(state.tick)

      state.tick = null
    }
  })

  return (
    <ul class='mt-5 space-y-3'>
      {getWedding('gift').map((gift, index) => (
        <li class='flex rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900'>
          <div class='mr-3 h-11 w-11 min-w-[44px] overflow-hidden rounded-lg max-xxs:h-9 max-xxs:w-9 max-xxs:min-w-[36px]'>
            <Bank code={gift.code} />
          </div>
          <div class='pr-3'>
            <div class='line-clamp-1 font-semibold max-xxs:text-sm'>
              {gift.accountName}
            </div>
            <div class='line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400 max-xxs:text-small'>
              {[
                gift.alias,
                [
                  atob(gift.accountNumber).replace(/\d/g, '•').substring(8),
                  atob(gift.accountNumber).substring(12),
                ].join(''),
              ].join(' ')}
            </div>
          </div>
          <button
            class='relative z-10 my-auto ml-auto h-8 rounded-full bg-zinc-200 px-3 text-sm font-semibold uppercase text-blue-600 dark:bg-zinc-800 dark:text-blue-400 max-xxs:text-small'
            onclick={() => onclick(gift.accountNumber, index)}
          >
            {isSelected(index) ? 'disalin' : 'salin'}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default WeddingGift
