import { expect, test } from '@jest/globals'
import { stringifyHeaderValue } from '../src/parts/StringifyHeaderValue/StringifyHeaderValue.ts'

test('stringifyHeaderValue should stringify objects', () => {
  expect(stringifyHeaderValue({ nested: true })).toBe('{"nested":true}')
})

test('stringifyHeaderValue should serialize bigint as string', () => {
  expect(stringifyHeaderValue({ count: 1n })).toBe('{"count":"1"}')
})

test('stringifyHeaderValue should return fallback for unserializable values', () => {
  const circular: Record<string, unknown> = {}
  circular.self = circular
  expect(stringifyHeaderValue(circular)).toBe('[unserializable]')
})
