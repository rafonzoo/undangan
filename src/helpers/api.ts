import { onCleanup } from 'solid-js'

const ERROR = {
  E001: 'AbortError: The user aborted the request.',
  E101: 'ReferenceError: Missing parameter(s) request.',
  E201: 'ResponseError: Requested data is not found.',
} as const

export const clientError = <T extends keyof typeof ERROR>(key: T) => {
  return { code: key, message: ERROR[key] }
}

export const queryError = (e: unknown, callbackFn?: () => void) => {
  const error = e as { code?: string; message?: string }
  const aborted = error.message?.includes('AbortError')

  console.log(
    [
      `(${error.code})`,
      aborted
        ? clientError('E001').message + ' Skipping request..'
        : error.message,
    ].join(' ')
  )

  return aborted ? void 0 : callbackFn?.()
}

export const signal = <T>(fn: (signal: AbortSignal) => Promise<T>) => {
  const controller = new AbortController()

  onCleanup(() => controller.abort('canceled'))
  return fn(controller.signal)
}
