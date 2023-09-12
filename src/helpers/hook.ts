import { type Infer, type Nullable, type Nullish, type Type } from '@app/types'
import {
  type ResourceFetcher,
  type ResourceSource,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from 'solid-js'
import { weddingParamType } from '@wedding/state/schema'
import {
  type NavigateOptions,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from '@solidjs/router'
import { intersectionOptionType } from '@app/state/schema'
import { check } from '@app/helpers/utils'
import { __DEV__, supabase } from '@app/config/env'

type HistoryOption = Omit<NavigateOptions, 'replace'>

export const useCommonProps = () => {
  const navigate = useNavigate()

  const history = {
    push: (to: string, opt?: HistoryOption) => navigate(to, opt),
    replace: (to: string, opt?: HistoryOption) => {
      return navigate(to, { ...opt, replace: true })
    },
  }

  return { history }
}

export const useResource = <S, R = unknown>(
  source: ResourceSource<S>,
  fetcher: ResourceFetcher<S, void, R>,
  fetchIf = () => true
) => {
  const [resource, method] = createResource(
    source,
    fetchIf?.() ? fetcher : () => {}
  )

  return { resource, ...method }
}

export const useProps = <T extends Type>(props: Infer<T>, zod: Nullish<T>) => {
  createEffect(() => check(zod, props))
  return { props }
}

export const useQueryParam = <T extends Type, N extends Type>(opt: {
  query?: N
  param?: T
}) => {
  const paramValue = useParams()
  const [queryValue, setQuery] = useSearchParams()
  type SetQuery = (prm: Infer<N>, opt: Parameters<typeof setQuery>[1]) => void

  createEffect(() => {
    check(opt.param, paramValue)
    check(opt.query, queryValue)
  })

  return {
    param: check(opt.param, paramValue),
    query: check(opt.query, queryValue),
    setQuery: setQuery as SetQuery,
  }
}

export const useIntersection = (opt?: Infer<typeof intersectionOptionType>) => {
  const [element, setElement] = createSignal<HTMLElement | null>(null)
  const [isIntersecting, setIntersect] = createSignal(false)

  onMount(() => {
    const target = element()
    const option = check(intersectionOptionType.optional(), opt)

    const root = !!option?.rootId
      ? target?.closest(`#${option.rootId}`)
      : document

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersect(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { root, ...option }
    )

    if (target) observer.observe(target)
  })

  return { isIntersecting, setElement }
}

export const useRemoteUrl = (column = 'uploads') => {
  const { param } = useQueryParam({ param: weddingParamType })

  if (!param.name) {
    return () => ''
  }

  return (url?: Nullable<string>) => {
    if (!url) return ''
    if (__DEV__) return url

    const { data } = supabase.storage
      .from(column)
      .getPublicUrl(param.name + url)

    return data.publicUrl
  }
}

export const useWeddingPath = () => {
  const { pathname } = useLocation()
  const [, page] = pathname.split('/').filter(Boolean)

  if (!page.match(/editor|couple/g)) {
    throw new Error(
      'Calling `useWeddingPath` outside wedding page is forbidden.'
    )
  }

  return page as 'editor' | 'couple'
}
