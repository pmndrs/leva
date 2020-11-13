export enum TwixErrors {
  UNSUPPORTED_INPUT,
  UNKNOWN_INPUT,
  DUPLICATE_KEYS,
}

const ErrorList = {
  [TwixErrors.UNSUPPORTED_INPUT]: (type: string, path: string) => [
    `you've passed a ${type} input at path "${path}" but we don't support it yet`,
  ],
  [TwixErrors.UNKNOWN_INPUT]: (path: string, value: unknown) => [`input at path "${path}" is not recognized`, value],
  [TwixErrors.DUPLICATE_KEYS]: (key: string, path: string) => [
    `Key ${key} already exists at path "${path}" in your hook. Even nested keys need to be unique'`,
  ],
}

function _log<T extends TwixErrors>(fn: 'log' | 'warn', errorType: T, ...args: Parameters<typeof ErrorList[T]>) {
  //@ts-expect-error
  const [message, ...rest] = ErrorList[errorType](...args)
  console[fn]('TWIX: ' + message, ...rest)
}

// @ts-ignore
export const warn = _log.bind(null, 'warn')
// @ts-ignore
export const log = _log.bind(null, 'log')
