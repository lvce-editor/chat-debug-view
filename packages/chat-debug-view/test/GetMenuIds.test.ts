import { expect, test } from '@jest/globals'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds should return all supported menu identifiers', () => {
  const result = getMenuIds()

  expect(result).toEqual([555, 556, 557])
})
