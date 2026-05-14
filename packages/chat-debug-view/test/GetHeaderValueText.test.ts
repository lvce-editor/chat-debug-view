import { expect, test } from '@jest/globals'
import { getHeaderValueText } from '../src/parts/GetHeaderValueText/GetHeaderValueText.ts'

test('getHeaderValueText should keep string values', () => {
  expect(getHeaderValueText('abc')).toBe('abc')
})

test('getHeaderValueText should stringify primitive values', () => {
  expect(getHeaderValueText(1)).toBe('1')
  expect(getHeaderValueText(true)).toBe('true')
  expect(getHeaderValueText(2n)).toBe('2')
  expect(getHeaderValueText(null)).toBe('null')
  expect(getHeaderValueText(undefined)).toBe('')
})

test('getHeaderValueText should format symbol and function values', () => {
  expect(getHeaderValueText(Symbol('x'))).toBe('Symbol(x)')
  expect(getHeaderValueText(Symbol())).toBe('Symbol()')
  expect(getHeaderValueText(() => 1)).toBe('[function]')
})

test('getHeaderValueText should stringify object values', () => {
  expect(getHeaderValueText({ nested: true })).toBe('{"nested":true}')
})
