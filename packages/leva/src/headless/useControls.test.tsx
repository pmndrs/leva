/**
 * Unit tests for headless useControls utilities
 */

import { describe, it, expect } from 'vitest'
import { reconstructArgsWithHeadless, createHeadlessSettings, isHookSettings } from './useControls.utils'
import type { HookSettings } from '../useControls'

describe('useControls.utils', () => {
  describe('isHookSettings', () => {
    it('should identify HookSettings objects', () => {
      const hookSettings: HookSettings = { store: {} as any }
      expect(isHookSettings(hookSettings)).toBe(true)
    })

    it('should reject arrays', () => {
      expect(isHookSettings([1, 2, 3])).toBe(false)
    })

    it('should reject null', () => {
      expect(isHookSettings(null)).toBe(false)
    })

    it('should accept objects with headless property', () => {
      expect(isHookSettings({ headless: true })).toBe(true)
    })

    it('should reject primitives', () => {
      expect(isHookSettings('string')).toBe(false)
      expect(isHookSettings(123)).toBe(false)
      expect(isHookSettings(true)).toBe(false)
    })
  })

  describe('createHeadlessSettings', () => {
    it('should create headless settings from undefined', () => {
      const result = createHeadlessSettings()
      expect(result).toEqual({ headless: true })
    })

    it('should merge existing settings with headless: true', () => {
      const existing: HookSettings = { store: {} as any }
      const result = createHeadlessSettings(existing)
      expect(result).toEqual({ store: existing.store, headless: true })
    })

    it('should override existing headless setting', () => {
      const existing: HookSettings = { headless: false }
      const result = createHeadlessSettings(existing)
      expect(result).toEqual({ headless: true })
    })
  })

  describe('reconstructArgsWithHeadless', () => {
    it('should handle schema-only case without settings', () => {
      const schema = { x: 1, y: 2 }
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        hookSettings: undefined,
      })

      expect(result).toEqual([schema, { headless: true }, undefined])
    })

    it('should handle schema-only case with HookSettings', () => {
      const schema = { x: 1, y: 2 }
      const hookSettings: HookSettings = { store: {} as any }
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        settingsOrDepsOrSchema: hookSettings,
        hookSettings,
      })

      expect(result[0]).toBe(schema)
      expect(result[1]).toEqual({ store: hookSettings.store, headless: true })
      expect(result[2]).toBeUndefined()
    })

    it('should handle schema-only case with headless-only HookSettings', () => {
      const schema = { x: 1, y: 2 }
      const hookSettings: HookSettings = { headless: true }
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        settingsOrDepsOrSchema: hookSettings,
        hookSettings,
      })

      expect(result[0]).toBe(schema)
      expect(result[1]).toEqual({ headless: true })
      expect(result[2]).toBeUndefined()
    })

    it('should handle schema-only case with deps array', () => {
      const schema = { x: 1, y: 2 }
      const deps = [1, 2, 3]
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        settingsOrDepsOrSchema: deps,
        hookSettings: undefined,
      })

      expect(result).toEqual([schema, { headless: true }, deps])
    })

    it('should handle folder case without settings', () => {
      const folderName = 'myFolder'
      const schema = { x: 1, y: 2 }
      const result = reconstructArgsWithHeadless({
        folderName,
        schemaOrFolderName: folderName,
        settingsOrDepsOrSchema: schema,
        hookSettings: undefined,
      })

      expect(result[0]).toBe(folderName)
      expect(result[1]).toBe(schema)
      expect(result[2]).toBeUndefined()
      expect(result[3]).toEqual({ headless: true })
      expect(result[4]).toBeUndefined()
    })

    it('should handle folder case with HookSettings', () => {
      const folderName = 'myFolder'
      const schema = { x: 1, y: 2 }
      const hookSettings: HookSettings = { store: {} as any }
      const result = reconstructArgsWithHeadless({
        folderName,
        schemaOrFolderName: folderName,
        settingsOrDepsOrSchema: schema,
        depsOrSettings: hookSettings,
        hookSettings,
      })

      expect(result[0]).toBe(folderName)
      expect(result[1]).toBe(schema)
      expect(result[2]).toBeUndefined()
      expect(result[3]).toEqual({ store: hookSettings.store, headless: true })
      expect(result[4]).toBeUndefined()
    })

    it('should handle folder case with deps array', () => {
      const folderName = 'myFolder'
      const schema = { x: 1, y: 2 }
      const deps = [1, 2, 3]
      const result = reconstructArgsWithHeadless({
        folderName,
        schemaOrFolderName: folderName,
        settingsOrDepsOrSchema: schema,
        depsOrSettings: deps,
        hookSettings: undefined,
      })

      expect(result[0]).toBe(folderName)
      expect(result[1]).toBe(schema)
      expect(result[2]).toBeUndefined()
      expect(result[3]).toEqual({ headless: true })
      expect(result[4]).toBe(deps)
    })

    it('should handle folder case with folderSettings', () => {
      const folderName = 'myFolder'
      const schema = { x: 1, y: 2 }
      const folderSettings = { collapsed: true }
      const result = reconstructArgsWithHeadless({
        folderName,
        schemaOrFolderName: folderName,
        settingsOrDepsOrSchema: schema,
        depsOrSettingsOrFolderSettings: folderSettings,
        hookSettings: undefined,
      })

      expect(result[0]).toBe(folderName)
      expect(result[1]).toBe(schema)
      expect(result[2]).toEqual(folderSettings)
      expect(result[3]).toEqual({ headless: true })
      expect(result[4]).toBeUndefined()
    })

    it('should always inject headless: true', () => {
      const schema = { x: 1 }
      const hookSettings: HookSettings = { headless: false }
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        settingsOrDepsOrSchema: hookSettings,
        hookSettings,
      })

      expect(result[1]).toEqual({ headless: true })
    })

    it('should handle function schema', () => {
      const schema = () => ({ x: 1 })
      const result = reconstructArgsWithHeadless({
        folderName: undefined,
        schemaOrFolderName: schema,
        hookSettings: undefined,
      })

      expect(result[0]).toBe(schema)
      expect(result[1]).toEqual({ headless: true })
      expect(result[2]).toBeUndefined()
    })
  })
})
