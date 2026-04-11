import { expect, test } from '@jest/globals'
import * as GetEventTableTypeLabel from '../src/parts/GetEventTableTypeLabel/GetEventTableTypeLabel.ts'

test('getEventTableTypeLabel should render list_files from top-level name without the tool-execution prefix', () => {
  const event = {
    eventId: 1,
    name: 'list_files',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = GetEventTableTypeLabel.getEventTableTypeLabel(event)

  expect(result).toBe('list_files')
})

test('getEventTableTypeLabel should preserve existing tool label formatting for other tool execution names', () => {
  const event = {
    eventId: 1,
    name: 'getWorkspaceUri',
    sessionId: 'session-1',
    timestamp: '2026-04-01T20:56:07.857Z',
    type: 'tool-execution',
  }

  const result = GetEventTableTypeLabel.getEventTableTypeLabel(event)

  expect(result).toBe('tool-execution, getWorkspaceUri')
})
