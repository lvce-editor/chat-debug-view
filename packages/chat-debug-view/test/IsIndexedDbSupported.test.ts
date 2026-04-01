import { afterEach, expect, test } from '@jest/globals'
import * as IsIndexedDbSupported from '../src/parts/IsIndexedDbSupported/IsIndexedDbSupported.ts'
import { setIndexedDbSupportForTest } from '../src/parts/SetIndexedDbSupportForTest/SetIndexedDbSupportForTest.ts'

const indexedDbDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'indexedDB')

afterEach(() => {
  setIndexedDbSupportForTest(undefined)
  if (indexedDbDescriptor) {
    Object.defineProperty(globalThis, 'indexedDB', indexedDbDescriptor)
  } else {
    Reflect.deleteProperty(globalThis, 'indexedDB')
  }
})

test('isIndexedDbSupported should prefer the explicit argument', () => {
  setIndexedDbSupportForTest(false)
  Reflect.deleteProperty(globalThis, 'indexedDB')

  const result = IsIndexedDbSupported.isIndexedDbSupported(true)

  expect(result).toBe(true)
})

test('isIndexedDbSupported should use the test override when no explicit argument is provided', () => {
  setIndexedDbSupportForTest(false)
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
  })

  const result = IsIndexedDbSupported.isIndexedDbSupported()

  expect(result).toBe(false)
})

test('isIndexedDbSupported should fall back to the global indexedDB object', () => {
  setIndexedDbSupportForTest(undefined)
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: {},
  })

  const result = IsIndexedDbSupported.isIndexedDbSupported()

  expect(result).toBe(true)
})

test('isIndexedDbSupported should return false when there is no override and no global indexedDB', () => {
  setIndexedDbSupportForTest(undefined)
  Reflect.deleteProperty(globalThis, 'indexedDB')

  const result = IsIndexedDbSupported.isIndexedDbSupported()

  expect(result).toBe(false)
})
