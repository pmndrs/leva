import { getDataFromSchema } from './data'
import { SpecialInputs, MappedPaths, FolderSettings } from '../types'

describe('getDataFromSchema', () => {
  it('should parse a simple number input', () => {
    const schema = { count: 5 }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('count')
    expect(result.count).toMatchObject({
      type: 'NUMBER',
      value: 5,
      fromPanel: true,
    })
    expect(mappedPaths).toHaveProperty('count')
    expect(mappedPaths.count.path).toBe('count')
  })

  it('should parse a string input', () => {
    const schema = { name: 'John' }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('name')
    expect(result.name).toMatchObject({
      type: 'STRING',
      value: 'John',
      fromPanel: true,
    })
  })

  it('should parse a boolean input', () => {
    const schema = { enabled: true }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('enabled')
    expect(result.enabled).toMatchObject({
      type: 'BOOLEAN',
      value: true,
      fromPanel: true,
    })
  })

  it('should parse inputs with options', () => {
    const schema = {
      count: { value: 10, min: 0, max: 100, step: 5 },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('count')
    expect(result.count).toMatchObject({
      type: 'NUMBER',
      value: 10,
      min: 0,
      max: 100,
      step: 5,
      fromPanel: true,
    })
  })

  it('should handle onChange handlers', () => {
    const onChange = jest.fn()
    const schema = {
      value: { value: 5, onChange },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('value')
    expect(mappedPaths.value.onChange).toBe(onChange)
    expect(mappedPaths.value.transient).toBe(true)
  })

  it('should handle onEditStart and onEditEnd handlers', () => {
    const onEditStart = jest.fn()
    const onEditEnd = jest.fn()
    const schema = {
      value: { value: 5, onEditStart, onEditEnd },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    getDataFromSchema(schema, '', mappedPaths, folders)

    expect(mappedPaths.value.onEditStart).toBe(onEditStart)
    expect(mappedPaths.value.onEditEnd).toBe(onEditEnd)
  })

  it('should recursively parse folders', () => {
    const schema = {
      settings: {
        type: SpecialInputs.FOLDER,
        schema: {
          volume: 50,
          brightness: 80,
        },
        settings: { collapsed: false },
      },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('settings.volume')
    expect(result).toHaveProperty('settings.brightness')
    expect(result['settings.volume'].value).toBe(50)
    expect(result['settings.brightness'].value).toBe(80)
    expect(folders).toHaveProperty('settings')
    expect(folders.settings).toEqual({ collapsed: false })
  })

  it('should handle nested folders', () => {
    const schema = {
      parent: {
        type: SpecialInputs.FOLDER,
        schema: {
          child: {
            type: SpecialInputs.FOLDER,
            schema: {
              value: 10,
            },
            settings: {},
          },
        },
        settings: { collapsed: true },
      },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).toHaveProperty('parent.child.value')
    expect(folders).toHaveProperty('parent')
    expect(folders).toHaveProperty('parent.child')
    expect(folders.parent.collapsed).toBe(true)
  })

  it('should use root path when provided', () => {
    const schema = { value: 5 }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, 'root', mappedPaths, folders)

    expect(result).toHaveProperty('root.value')
    expect(mappedPaths.value.path).toBe('root.value')
  })

  it('should skip empty keys and warn', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const schema = { '': 5, valid: 10 }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(result).not.toHaveProperty('')
    expect(result).toHaveProperty('valid')
    expect(warnSpy).toHaveBeenCalled()

    warnSpy.mockRestore()
  })

  it('should warn on duplicate keys', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
    const mappedPaths: MappedPaths = {
      value: { path: 'existing.value', onChange: undefined, transient: false },
    }
    const folders: Record<string, FolderSettings> = {}

    const schema = { value: 10 }

    getDataFromSchema(schema, '', mappedPaths, folders)

    expect(warnSpy).toHaveBeenCalled()

    warnSpy.mockRestore()
  })

  it('should handle multiple inputs', () => {
    const schema = {
      name: 'Test',
      count: 5,
      enabled: true,
      color: { value: '#ff0000' },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    const result = getDataFromSchema(schema, '', mappedPaths, folders)

    expect(Object.keys(result)).toHaveLength(4)
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('count')
    expect(result).toHaveProperty('enabled')
    expect(result).toHaveProperty('color')
  })

  it('should preserve existing folder settings', () => {
    const existingSettings = { collapsed: true, color: '#ff0000' }
    const folders: Record<string, FolderSettings> = {
      settings: existingSettings,
    }
    const schema = {
      settings: {
        type: SpecialInputs.FOLDER,
        schema: { value: 10 },
        settings: { collapsed: false },
      },
    }
    const mappedPaths: MappedPaths = {}

    getDataFromSchema(schema, '', mappedPaths, folders)

    // Should not overwrite existing folder settings
    expect(folders.settings).toBe(existingSettings)
  })

  it('should set transient flag correctly', () => {
    const schema = {
      withOnChange: { value: 5, onChange: jest.fn() },
      withTransientTrue: { value: 10, onChange: jest.fn(), transient: true },
      withTransientFalse: { value: 15, onChange: jest.fn(), transient: false },
      withoutOnChange: { value: 20 },
    }
    const mappedPaths: MappedPaths = {}
    const folders: Record<string, FolderSettings> = {}

    getDataFromSchema(schema, '', mappedPaths, folders)

    expect(mappedPaths.withOnChange.transient).toBe(true)
    expect(mappedPaths.withTransientTrue.transient).toBe(true)
    expect(mappedPaths.withTransientFalse.transient).toBe(false)
    expect(mappedPaths.withoutOnChange.transient).toBeFalsy()
  })
})
