import { expect, test } from '@jest/globals'
import { getLanguageFromFileExtension } from '../src/parts/GetLanguageFromFileExtension/GetLanguageFromFileExtension.ts'

test('getLanguageFromFileExtension should detect javascript', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.js')

  expect(result).toBe('javascript')
})

test('getLanguageFromFileExtension should detect typescript', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.ts')

  expect(result).toBe('typescript')
})

test('getLanguageFromFileExtension should detect css', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.css')

  expect(result).toBe('css')
})

test('getLanguageFromFileExtension should detect html', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.html')

  expect(result).toBe('html')
})

test('getLanguageFromFileExtension should detect json', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.json')

  expect(result).toBe('json')
})

test('getLanguageFromFileExtension should detect python', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.py')

  expect(result).toBe('python')
})

test('getLanguageFromFileExtension should return undefined for unsupported extensions', () => {
  const result = getLanguageFromFileExtension('file:///workspace/example.md')

  expect(result).toBeUndefined()
})

test('getLanguageFromFileExtension should return undefined for invalid uris', () => {
  const result = getLanguageFromFileExtension('not-a-uri')

  expect(result).toBeUndefined()
})
