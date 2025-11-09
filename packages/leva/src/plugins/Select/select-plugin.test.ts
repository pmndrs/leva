import { describe, it, expect, vi } from 'vitest'
import { normalize, schema, sanitize, format } from './select-plugin'

describe('Select Plugin - normalize function', () => {
  describe('Array of primitives', () => {
    it('should normalize array of strings', () => {
      const input = { options: ['x', 'y', 'z'] }
      const result = normalize(input)

      expect(result.value).toBe('x')
      expect(result.settings.keys).toEqual(['x', 'y', 'z'])
      expect(result.settings.values).toEqual(['x', 'y', 'z'])
    })

    it('should normalize array of numbers', () => {
      const input = { options: [1, 2, 3] }
      const result = normalize(input)

      expect(result.value).toBe(1)
      expect(result.settings.keys).toEqual(['1', '2', '3'])
      expect(result.settings.values).toEqual([1, 2, 3])
    })

    it('should normalize array of booleans', () => {
      const input = { options: [true, false] }
      const result = normalize(input)

      expect(result.value).toBe(true)
      expect(result.settings.keys).toEqual(['true', 'false'])
      expect(result.settings.values).toEqual([true, false])
    })

    it('should normalize array of mixed primitive types', () => {
      const input = { options: ['x', 1, true] }
      const result = normalize(input)

      expect(result.value).toBe('x')
      expect(result.settings.keys).toEqual(['x', '1', 'true'])
      expect(result.settings.values).toEqual(['x', 1, true])
    })

    it('should use provided value if it exists in options', () => {
      const input = { value: 'y', options: ['x', 'y', 'z'] }
      const result = normalize(input)

      expect(result.value).toBe('y')
      expect(result.settings.keys).toEqual(['x', 'y', 'z'])
      expect(result.settings.values).toEqual(['x', 'y', 'z'])
    })
  })

  describe('Object with key-value pairs (key as label)', () => {
    it('should normalize object with string values', () => {
      const input = { options: { foo: 'bar', baz: 'qux' } }
      const result = normalize(input)

      expect(result.value).toBe('bar')
      expect(result.settings.keys).toEqual(['foo', 'baz'])
      expect(result.settings.values).toEqual(['bar', 'qux'])
    })

    it('should normalize object with number values', () => {
      const input = { options: { small: 10, medium: 20, large: 30 } }
      const result = normalize(input)

      expect(result.value).toBe(10)
      expect(result.settings.keys).toEqual(['small', 'medium', 'large'])
      expect(result.settings.values).toEqual([10, 20, 30])
    })

    it('should normalize object with boolean values', () => {
      const input = { options: { yes: true, no: false } }
      const result = normalize(input)

      expect(result.value).toBe(true)
      expect(result.settings.keys).toEqual(['yes', 'no'])
      expect(result.settings.values).toEqual([true, false])
    })

    it('should normalize object with mixed value types', () => {
      const input = { options: { x: 1, foo: 'bar', z: true } }
      const result = normalize(input)

      expect(result.value).toBe(1)
      expect(result.settings.keys).toEqual(['x', 'foo', 'z'])
      expect(result.settings.values).toEqual([1, 'bar', true])
    })

    it('should use provided value if it exists in options', () => {
      const input = { value: 'qux', options: { foo: 'bar', baz: 'qux' } }
      const result = normalize(input)

      expect(result.value).toBe('qux')
      expect(result.settings.keys).toEqual(['foo', 'baz'])
      expect(result.settings.values).toEqual(['bar', 'qux'])
    })
  })

  describe('Array of {value, label} objects', () => {
    it('should normalize array of value/label objects with all labels', () => {
      const input = {
        options: [
          { value: '#f00', label: 'Red' },
          { value: '#0f0', label: 'Green' },
          { value: '#00f', label: 'Blue' },
        ],
      }
      const result = normalize(input)

      expect(result.value).toBe('#f00')
      expect(result.settings.keys).toEqual(['Red', 'Green', 'Blue'])
      expect(result.settings.values).toEqual(['#f00', '#0f0', '#00f'])
    })

    it('should normalize array of value/label objects with some labels missing', () => {
      const input = {
        options: [{ value: '#f00', label: 'Red' }, { value: '#0f0' }, { value: '#00f', label: 'Blue' }],
      }
      const result = normalize(input)

      expect(result.value).toBe('#f00')
      expect(result.settings.keys).toEqual(['Red', '#0f0', 'Blue'])
      expect(result.settings.values).toEqual(['#f00', '#0f0', '#00f'])
    })

    it('should normalize array of value/label objects with no labels', () => {
      const input = {
        options: [{ value: 'x' }, { value: 'y' }, { value: 'z' }],
      }
      const result = normalize(input)

      expect(result.value).toBe('x')
      expect(result.settings.keys).toEqual(['x', 'y', 'z'])
      expect(result.settings.values).toEqual(['x', 'y', 'z'])
    })

    it('should normalize with number values', () => {
      const input = {
        options: [
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
        ],
      }
      const result = normalize(input)

      expect(result.value).toBe(1)
      expect(result.settings.keys).toEqual(['One', 'Two'])
      expect(result.settings.values).toEqual([1, 2])
    })

    it('should normalize with boolean values', () => {
      const input = {
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      }
      const result = normalize(input)

      expect(result.value).toBe(true)
      expect(result.settings.keys).toEqual(['Yes', 'No'])
      expect(result.settings.values).toEqual([true, false])
    })

    it('should use provided value if it exists in options', () => {
      const input = {
        value: '#0f0',
        options: [
          { value: '#f00', label: 'Red' },
          { value: '#0f0', label: 'Green' },
          { value: '#00f', label: 'Blue' },
        ],
      }
      const result = normalize(input)

      expect(result.value).toBe('#0f0')
      expect(result.settings.keys).toEqual(['Red', 'Green', 'Blue'])
      expect(result.settings.values).toEqual(['#f00', '#0f0', '#00f'])
    })
  })

  describe('Edge cases and backward compatibility', () => {
    it('should default to first value when no value is provided', () => {
      const input = { options: ['a', 'b', 'c'] }
      const result = normalize(input)

      expect(result.value).toBe('a')
    })

    it('should warn and return undefined when value does not exist in options', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const input = { value: true, options: [false] }
      const result = normalize(input)

      expect(result.value).toBe(undefined)
      expect(result.settings.keys).toEqual(['false'])
      expect(result.settings.values).toEqual([false])
      expect(consoleWarnSpy).toHaveBeenCalledWith("[Leva] Selected value doesn't exist in Select options ", input)

      consoleWarnSpy.mockRestore()
    })

    it('should handle empty array options', () => {
      const input = { options: [] }
      const result = normalize(input)

      expect(result.value).toBe(undefined)
      expect(result.settings.keys).toEqual([])
      expect(result.settings.values).toEqual([])
    })

    it('should handle empty object options', () => {
      const input = { options: {} }
      const result = normalize(input)

      expect(result.value).toBe(undefined)
      expect(result.settings.keys).toEqual([])
      expect(result.settings.values).toEqual([])
    })

    it('should handle single option array', () => {
      const input = { options: ['only-one'] }
      const result = normalize(input)

      expect(result.value).toBe('only-one')
      expect(result.settings.keys).toEqual(['only-one'])
      expect(result.settings.values).toEqual(['only-one'])
    })

    it('should handle value of 0 correctly', () => {
      const input = { value: 0, options: [0, 1, 2] }
      const result = normalize(input)

      expect(result.value).toBe(0)
      expect(result.settings.keys).toEqual(['0', '1', '2'])
      expect(result.settings.values).toEqual([0, 1, 2])
    })

    it('should handle empty string value correctly', () => {
      const input = { value: '', options: ['', 'a', 'b'] }
      const result = normalize(input)

      expect(result.value).toBe('')
      expect(result.settings.keys).toEqual(['', 'a', 'b'])
      expect(result.settings.values).toEqual(['', 'a', 'b'])
    })

    it('should handle invalid mixed-type arrays (fallback scenario)', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // This tests the fallback case where options contain invalid types like nested arrays
      const input = { options: ['x', 'y', ['x', 'y']] as any }
      const result = normalize(input)

      // Falls through to empty fallback
      expect(result.value).toBe(undefined)
      expect(result.settings.keys).toEqual([])
      expect(result.settings.values).toEqual([])
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Leva] Invalid Select options format'),
        input.options
      )

      consoleWarnSpy.mockRestore()
    })

    it('should handle completely invalid options (not array or object)', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const input = { options: null as any }
      const result = normalize(input)

      expect(result.value).toBe(undefined)
      expect(result.settings.keys).toEqual([])
      expect(result.settings.values).toEqual([])
      expect(consoleWarnSpy).toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })
  })
})

describe('Select Plugin - schema validation', () => {
  it('should accept array of primitives', () => {
    const result = schema(null, { options: ['x', 'y', 'z'] })
    expect(result).toBe(true)
  })

  it('should accept object with primitive values', () => {
    const result = schema(null, { options: { foo: 'bar', baz: 1 } })
    expect(result).toBe(true)
  })

  it('should accept array of value/label objects', () => {
    const result = schema(null, { options: [{ value: 'x', label: 'X' }, { value: 'y' }] })
    expect(result).toBe(true)
  })

  it('should reject invalid input (missing options)', () => {
    const result = schema(null, {})
    expect(result).toBe(false)
  })

  it('should reject null', () => {
    const result = schema(null, null)
    expect(result).toBe(false)
  })

  it('should reject array with non-primitive values', () => {
    // Schema now properly validates that options are in one of the three valid formats
    // This prevents invalid SELECT inputs from being recognized as SELECT at all
    const result = schema(null, { options: [{ nested: 'object' }, 'string'] })
    expect(result).toBe(false)
  })

  it('should reject boolean primitives', () => {
    const result = schema(null, true)
    expect(result).toBe(false)
  })

  it('should reject number primitives', () => {
    const result = schema(null, 10)
    expect(result).toBe(false)
  })

  it('should reject settings without options key', () => {
    const result = schema(null, { value: 'x' })
    expect(result).toBe(false)
  })
})

describe('Select Plugin - sanitize function', () => {
  it('should pass when value exists in values', () => {
    const result = sanitize('x', { keys: ['x', 'y'], values: ['x', 'y'] })
    expect(result).toBe('x')
  })

  it('should throw error when value does not exist in values', () => {
    expect(() => {
      sanitize('z', { keys: ['x', 'y'], values: ['x', 'y'] })
    }).toThrow("Selected value doesn't match Select options")
  })
})

describe('Select Plugin - format function', () => {
  it('should return the index of the value', () => {
    const result = format('y', { keys: ['x', 'y', 'z'], values: ['x', 'y', 'z'] })
    expect(result).toBe(1)
  })

  it('should return 0 for first value', () => {
    const result = format('x', { keys: ['x', 'y', 'z'], values: ['x', 'y', 'z'] })
    expect(result).toBe(0)
  })

  it('should return -1 when value not found', () => {
    const result = format('notfound', { keys: ['x', 'y', 'z'], values: ['x', 'y', 'z'] })
    expect(result).toBe(-1)
  })
})
