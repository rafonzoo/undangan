import { type Infer, type Nullish, type Type } from '@app/types'
import {
  type ResourceFetcher,
  type ResourceSource,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from 'solid-js'
import {
  type NavigateOptions,
  useNavigate,
  useParams,
  useSearchParams,
} from '@solidjs/router'
import { useIntersectionType } from '@app/state/schema'
import { check } from '@app/helpers/utils'

type HistoryOption = Omit<NavigateOptions, 'replace'>

export const useIntersection = (opt?: Infer<typeof useIntersectionType>) => {
  const [element, setElement] = createSignal<HTMLElement | null>(null)
  const [isIntersecting, setIntersect] = createSignal(false)

  onMount(() => {
    const target = element()
    const option = check(useIntersectionType.optional(), opt)

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
  return { props: check(zod, props) }
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
