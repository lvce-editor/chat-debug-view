import { expect, test } from '@jest/globals'
import { getListFilesPreviewEvent } from '../src/parts/GetListFilesPreviewEvent/GetListFilesPreviewEvent.ts'

test('getListFilesPreviewEvent should return entries for successful list_files events', () => {
  const event = {
    eventId: 1,
    name: 'list_files',
    result: {
      entries: [
        {
          name: 'README.md',
          type: 'file',
        },
      ],
      ignored: false,
    },
    sessionId: 'session-1',
    timestamp: '2026-04-13T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getListFilesPreviewEvent(event, 'list_files')

  expect(result).toEqual([
    {
      name: 'README.md',
      type: 'file',
    },
  ])
})

test('getListFilesPreviewEvent should return the error object for errored list_files events', () => {
  const error = {
    message: 'Invalid argument: uri must be an absolute URI.',
  }
  const event = {
    eventId: 1,
    name: 'list_files',
    result: {
      error,
    },
    sessionId: 'session-1',
    timestamp: '2026-04-13T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getListFilesPreviewEvent(event, 'list_files')

  expect(result).toEqual(error)
})
