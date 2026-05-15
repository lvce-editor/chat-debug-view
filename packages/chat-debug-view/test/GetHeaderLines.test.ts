import { expect, test } from '@jest/globals'
import { getHeaderLines } from '../src/parts/GetHeaderLines/GetHeaderLines.ts'

test('getHeaderLines should format primitive header values', () => {
  expect(
    getHeaderLines({
      Authorization: 'Bearer test-token',
      Enabled: true,
      Retries: 3,
    }),
  ).toEqual(['  headers: {', "    'Authorization': 'Bearer test-token',", "    'Enabled': 'true',", "    'Retries': '3',", '  },'])
})

test('getHeaderLines should ignore non-record and non-primitive header values', () => {
  expect(getHeaderLines(undefined)).toEqual([])
  expect(
    getHeaderLines({
      Nested: {
        ok: true,
      },
    }),
  ).toEqual([])
})
