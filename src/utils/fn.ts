export const debounce = <T extends Function>(callback: T, wait: number, immediate = false) => {
  let timeout: number = 0

  return function() {
    const args = arguments as any
    const callNow = immediate && !timeout
    // @ts-expect-error
    const next = () => callback.apply(this, args)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) next()
  }
}
