import { expect, test } from '@jest/globals'
import { decodeBase64 } from '../src/parts/DecodeBase64/DecodeBase64.ts'

test('decodeBase64 should decode base64 encoded text into an array buffer', () => {
  const decoded = decodeBase64(btoa('cat'))

  expect([...new Uint8Array(decoded)]).toEqual([99, 97, 116])
})
