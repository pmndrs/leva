export const clamp = (x: number, min: number, max: number) => (x > max ? max : x < min ? min : x)
export const pad = (x: number, pad: number) => String(x).padStart(pad, '0')
export const ceil = (v: number) => Math.sign(v) * Math.ceil(Math.abs(v))
export const parseNumber = (v: number | string) => {
  if (v === '' || typeof v === 'number') return v
  try {
    const _v = evaluate(v)
    if (!isNaN(_v)) return _v
  } catch {}
  return parseFloat(v)
}

const log10 = Math.log(10)

export function getStep(number: number) {
  let n = Math.abs(+String(number).replace('.', '')) //remove decimal and make positive
  if (n === 0) return 0.01
  while (n !== 0 && n % 10 === 0) n /= 10
  //kill the 0s at the end of n
  const significantDigits = Math.floor(Math.log(n) / log10) + 1
  const numberLog = Math.floor(Math.log10(Math.abs(number)))
  const step = Math.pow(10, numberLog - significantDigits)
  return Math.max(step, 0.001)
}

export const range = (v: number, min: number, max: number) => {
  if (max === min) return 0
  const _v = clamp(v, min, max)
  return (_v - min) / (max - min)
}
export const invertedRange = (p: number, min: number, max: number) => p * (max - min) + min

// from https://gist.github.com/gordonbrander/2230317
export const getUid = () => '_' + Math.random().toString(36).substr(2, 9)

//Updated regexes to handle negative numbers and decimals
const parens = /\(([^\(\)]+)\)/ // Handles nested parentheses
const exp = /(-?\d+(?:\.\d+)?)\s*\^\s*(-?\d+(?:\.\d+)?)/ // Exponentiation
const muldiv = /(-?\d+(?:\.\d+)?)\s*([*/])\s*(-?\d+(?:\.\d+)?)/ // Multiplication or Division
const addsub = /(-?\d+(?:\.\d+)?)\s*([+-])\s*(-?\d+(?:\.\d+)?)/ // Addition or Subtraction

/**
 * Copyright: copied from here: https://stackoverflow.com/a/63105543
 * by @aanrudolph2 https://github.com/aanrudolph2
 *
 * Evaluates a numerical expression as a string and returns a Number
 * Follows standard PEMDAS operation ordering
 * @param {String} expr Numerical expression input
 * @returns {Number} Result of expression
 */
export function evaluate(expr: string): number {
  expr = expr.replace(/\s+/g, '') // Remove all whitespace

  if (parens.test(expr)) {
    return evaluate(expr.replace(parens, (_, subExpr) => evaluate(subExpr).toString()))
  }
  if (exp.test(expr)) {
    return evaluate(expr.replace(exp, (_, a, b) => Math.pow(Number(a), Number(b)).toString()))
  }
  if (muldiv.test(expr)) {
    return evaluate(expr.replace(muldiv, (_, a, op, b) =>
      op === '*' ? (Number(a) * Number(b)).toString() : (Number(b) === 0 ? (() => { throw new Error('Division by zero') })() : (Number(a) / Number(b)).toString())
    ))
  }
  if (addsub.test(expr)) {
    return evaluate(expr.replace(addsub, (_, a, op, b) =>
      op === '+' ? (Number(a) + Number(b)).toString() : (Number(a) - Number(b)).toString()
    ))
  }
  return Number(expr)
}
// Example usage
//console.log(evaluate("2 + 4*(30/5) - 34 + 45/2"));