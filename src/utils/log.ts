export enum LevaErrors {
  UNSUPPORTED_INPUT,
  UNKNOWN_INPUT,
  DUPLICATE_KEYS,
  ALREADY_REGISTERED_TYPE,
  CLIPBOARD_ERROR,
}

const ErrorList = {
  [LevaErrors.UNSUPPORTED_INPUT]: (type: string, path: string) => [
    `you've passed a ${type} input at path "${path}" but we don't support it yet.`,
  ],
  [LevaErrors.UNKNOWN_INPUT]: (path: string, value: unknown) => [`input at path "${path}" is not recognized.`, value],
  [LevaErrors.DUPLICATE_KEYS]: (key: string, path: string) => [
    `Key ${key} already exists at path "${path}" in your hook. Even nested keys need to be unique.`,
  ],
  [LevaErrors.ALREADY_REGISTERED_TYPE]: (type: string) => [
    `Type ${type} has already been registered. You can't register a component with the same type.`,
  ],
  [LevaErrors.CLIPBOARD_ERROR]: (value: unknown) => [`Error copying the value`, value],
}

function _log<T extends LevaErrors>(fn: 'log' | 'warn', errorType: T, ...args: Parameters<typeof ErrorList[T]>) {
  //@ts-expect-error
  const [message, ...rest] = ErrorList[errorType](...args)
  console[fn]('LEVA: ' + message, ...rest)
}

// @ts-expect-error
export const warn = _log.bind(null, 'warn')
// @ts-expect-error
export const log = _log.bind(null, 'log')
