import { expect, test } from '@jest/globals'
import * as GetPreviewName from '../src/parts/GetPreviewName/GetPreviewName.ts'

test('getPreviewName should prefer event name', () => {
  const result = GetPreviewName.getPreviewName({
    eventId: 1,
    name: 'runTool',
    toolName: 'fallbackTool',
    type: 'request',
  })

  expect(result).toBe('runTool')
})

test('getPreviewName should fall back to toolName', () => {
  const result = GetPreviewName.getPreviewName({
    eventId: 1,
    toolName: 'runTool',
    type: 'request',
  })

  expect(result).toBe('runTool')
})

test('getPreviewName should return undefined when both names are missing', () => {
  const result = GetPreviewName.getPreviewName({
    eventId: 1,
    type: 'request',
  })

  expect(result).toBeUndefined()
})
