import { expect, test } from '@jest/globals'
import { getTabId } from '../src/parts/GetTabId/GetTabId.ts'

test('getTabId should return detail tab id', () => {
  const result = getTabId('response')

  expect(result).toBe('ChatDebugViewDetailsTab-response')
})
