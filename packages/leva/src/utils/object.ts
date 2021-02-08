export function pick<K extends string, T extends { [k in K]: unknown }>(object: T, keys: K[]) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {} as { [k in K]: T[k] })
}

export function orderKeys<O extends object>(obj: O, keys: (keyof O)[]) {
  return keys.reduce((acc, k) => Object.assign(acc, { [k]: obj[k] }), {} as O)
}

export function mapArrayToKeys<K extends string>(
  value: number[] | { [key in K]: number },
  keys: K[]
): { [key in K]: number } {
  if (!Array.isArray(value)) return value // in if value is already an object
  return value.reduce((acc, v, i) => Object.assign(acc, { [keys[i]]: v }), {} as { [k in K]: number })
}
