import * as math from 'mathjs'

export function getSymbols(expr: math.MathNode) {
  return expr
    .filter((node) => {
      if (node.isSymbolNode) {
        try {
          node.evaluate()
        } catch {
          return node.name !== 'x'
        }
      }
      return false
    })
    .map(({ name }) => name!)
}

export function parseExpression(expression: string, get: (path: string) => any) {
  const parsed = math.parse(expression)
  const symbols = getSymbols(parsed)
  const scope = symbols.reduce((acc, path) => {
    const symbol = get(path)
    if (!symbol) throw Error(`Invalid symbol at path \`${path}\``)
    return Object.assign(acc, { [path]: symbol })
  }, {} as { [key in keyof typeof symbols]: any })

  let _formattedString = parsed.toString()

  for (let key in scope) {
    const re = new RegExp(`\\b${key}\\b`, 'g')
    _formattedString = _formattedString.replace(re, scope[key])
  }

  const value = Object.assign(math.parse(_formattedString).compile(), {
    __symbols: symbols,
    __parsed: parsed,
  })

  return value
}
