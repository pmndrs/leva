export function pick<K extends string, T extends { [k in K]: unknown }>(object: T, keys: K[]) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {} as { [k in K]: T[k] })
}

export function orderKeys<O extends object>(obj: O, keys: (keyof O)[]) {
  return keys.reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {} as O)
}
