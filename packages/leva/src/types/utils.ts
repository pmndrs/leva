// Utils from https://github.com/pmndrs/use-tweaks/blob/92561618abbf43c581fc5950fd35c0f8b21047cd/src/types.ts#L70

/**
 * It does nothing but beautify union type
 *
 * ```
 * type A = { a: 'a' } & { b: 'b' } // { a: 'a' } & { b: 'b' }
 * type B = Id<{ a: 'a' } & { b: 'b' }> // { a: 'a', b: 'b' }
 * ```
 */
export type BeautifyUnionType<T> = T extends Function ? T : T extends infer TT ? { [k in keyof TT]: TT[k] } : never

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Gets keys from Record
 */
export type GetKeys<V> = V extends Record<infer K, number> ? K : never
