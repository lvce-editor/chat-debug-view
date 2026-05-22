import { expect, test } from '@jest/globals'
import { formatPayloadValue } from '../src/parts/FormatPayloadValue/FormatPayloadValue.ts'

test('formatPayloadValue should stringify strings with quotes', () => {
  expect(formatPayloadValue('hello')).toBe('"hello"')
})

test('formatPayloadValue should stringify objects', () => {
  expect(formatPayloadValue({ ok: true })).toBe('{"ok":true}')
})