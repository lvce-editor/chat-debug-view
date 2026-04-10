import { expect, test } from '@jest/globals'
import { getPanelId } from '../src/parts/GetPanelId/GetPanelId.ts'

test('getPanelId should return detail panel id', () => {
  const result = getPanelId('preview')

  expect(result).toBe('ChatDebugViewDetailsPanel-preview')
})
