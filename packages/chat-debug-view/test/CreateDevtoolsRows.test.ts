import { expect, test } from '@jest/globals'
import * as CreateDevtoolsRows from '../src/parts/CreateDevtoolsRows/CreateDevtoolsRows.ts'

test('createDevtoolsRows should derive row state for a virtualized slice', () => {
  const events = [
    {
      eventId: 3,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:02.000Z',
      subType: 'request',
      type: 'request',
    },
    {
      eventId: 4,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:03.000Z',
      subType: 'response',
      type: 'response',
    },
  ]

  const result = CreateDevtoolsRows.createDevtoolsRows(events, 3, 2)

  expect(result).toEqual([
    {
      event: events[0],
      index: 2,
      isErrorStatus: false,
      isEven: false,
      isSelected: false,
    },
    {
      event: events[1],
      index: 3,
      isErrorStatus: false,
      isEven: true,
      isSelected: true,
    },
  ])
})

test('createDevtoolsRows should mark error rows from event status', () => {
  const events = [
    {
      arguments: {
        uri: '/test/playground',
      },
      eventId: 1,
      name: 'list_files',
      result: {
        error: 'Invalid argument: uri must be an absolute URI.',
      },
      sessionId: 'session-1',
      timestamp: '2026-04-02T07:26:35.172Z',
      subType: 'tool-execution',
      type: 'tool-execution',
    },
  ]

  const result = CreateDevtoolsRows.createDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      event: events[0],
      index: 0,
      isErrorStatus: true,
      isEven: false,
      isSelected: false,
    },
  ])
})
