export function debounce<T extends Function>(callback: T, wait: number, immediate = false) {
  let timeout: number = 0

  return function() {
    const callNow = immediate && !timeout
    // @ts-expect-error
    const next = () => callback.apply(this, arguments as any)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) next()
  }
}
