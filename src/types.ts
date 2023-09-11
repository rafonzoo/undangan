import { type z } from 'zod'
import { type Component, type JSX } from 'solid-js'

type El = JSX.IntrinsicElements

export type Nullable<T> = T | null

export type Nullish<T> = Nullable<T | undefined>

export type Type<T = unknown, M = unknown> = z.ZodType<T, z.ZodTypeDef, M>

export type Infer<T extends Type> = z.infer<T>

export type Child<T = {}> = Component<{ children?: JSX.Element } & T>

export type Func<T = unknown> = (...arg: unknown[]) => T

export type FC<T extends Type, N = {}> = Component<Infer<T> & N>

export type SX<T extends keyof El> = El[T]
