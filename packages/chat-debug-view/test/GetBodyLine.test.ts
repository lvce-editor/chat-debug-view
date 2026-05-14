import { expect, test } from '@jest/globals'
import { getBodyLine } from '../src/parts/GetBodyLine/GetBodyLine.ts'

test('getBodyLine should format string bodies inline', () => {
  expect(getBodyLine('hello')).toBe("  body: 'hello',")
})

test('getBodyLine should stringify object bodies', () => {
  expect(getBodyLine({ input: 'hello' })).toBe(`  body: JSON.stringify(\n    {\n      "input": "hello"\n    }\n  ),`)
})

test('getBodyLine should fall back to string coercion for unsupported values', () => {
  expect(getBodyLine(Symbol('test'))).toBe("  body: 'Symbol(test)',")
})
