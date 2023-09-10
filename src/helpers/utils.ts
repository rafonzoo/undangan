import { type Infer, type Nullish, type Type } from '@app/types'

export const isIOS = () => !!navigator.userAgent.match(/iPhone|iPod|iPad/)

export const delay = (timer = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timer))
}

// prettier-ignore
export const check = <T extends Type>(zod: Nullish<T>, data: unknown): Infer<T> => {
  if (!zod) return data; try { return zod.parse(data) } catch (e) { throw e }
}

// Object
export const entries = <T extends object>(obj: T) => {
  const arr = []

  for (const key in obj) arr.push(key)
  return arr
}

export const queryString = <T extends Object>(path: string, obj: T) => {
  const array = []

  for (const key in obj) {
    if (typeof obj[key] === 'undefined' || typeof obj[key] === null) continue
    if (!!!obj[key]) continue // Removed if `0` or ``(empty string) or `false`

    array.push(`${key}=${encodeURIComponent(obj[key] as string)}`)
  }

  return array.length > 0 ? `${path}?${array.join('&')}` : path
}

// String
export const prettyString = (str: string) => {
  return str
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export const capitalizer = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export const compareLower = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase()
}
