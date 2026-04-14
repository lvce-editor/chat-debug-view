import { expect, test } from '@jest/globals'
import { getPreviewEvent } from '../src/parts/GetPreviewEvent/GetPreviewEvent.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'

test('getPreviewEvent should return only the message text for chat-message-updated events', () => {
  const event = {
    eventId: 156,
    inProgress: false,
    messageId: 'abc',
    sessionId: 'def',
    text: 'Done - preview text only',
    time: '11:17 AM',
    timestamp: '2026-04-07T09:17:45.786Z',
    toolCalls: [
      {
        arguments: '{}',
        id: 'call_123',
        name: 'getWorkspaceUri',
        result: '/test/folder',
        status: 'success',
      },
    ],
    type: 'chat-message-updated',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('Done - preview text only')
})

test('getPreviewEvent should return only the nested message text for chat-message-added events', () => {
  const event = {
    eventId: 3,
    message: {
      id: '89016d05-7342-4eb0-b200-8d631e1cea49',
      role: 'user',
      text: 'what tools do you have access to?',
      time: '02:05 PM',
    },
    sessionId: 'ff68dd2f-6053-453f-95a9-de785f33f67c',
    timestamp: '2026-04-09T12:05:40.910Z',
    type: 'chat-message-added',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('what tools do you have access to?')
})

test('getPreviewEvent should return write_file content for tool execution events', () => {
  const event = {
    arguments: {
      content: 'line 1\nline 2',
      uri: 'file:///workspace/test.txt',
    },
    eventId: 4,
    name: 'write_file',
    result: {
      ok: true,
    },
    sessionId: 'session-1',
    timestamp: '2026-04-10T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('line 1\nline 2')
})

test('getPreviewEvent should return read_file result text for tool execution events', () => {
  const event = {
    arguments: {
      uri: 'file:///workspace/test.txt',
    },
    eventId: 5,
    name: 'read_file',
    result: 'line 1\nline 2',
    sessionId: 'session-1',
    timestamp: '2026-04-10T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getPreviewEvent(event)

  expect(result).toBe('line 1\nline 2')
})

test('getPreviewEvent should return only result.entries for list_files tool execution events', () => {
  const entries = [
    {
      name: '.git',
      type: 'folder',
    },
    {
      name: 'README.md',
      type: 'file',
    },
  ]
  const event = {
    arguments: {
      uri: 'file:///workspace',
    },
    eventId: 6,
    name: 'list_files',
    result: {
      entries,
      ignored: false,
    },
    sessionId: 'session-1',
    timestamp: '2026-04-10T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getPreviewEvent(event)

  expect(result).toEqual(entries)
})

test('getPreviewEvent should return the full failed result for list_files tool execution events', () => {
  const event = {
    arguments: {
      uri: '/workspace',
    },
    eventId: 7,
    name: 'list_files',
    result: {
      error: {
        message: 'Invalid argument: uri must be an absolute URI.',
      },
      errorCode: 'E_INVALID_URI',
    },
    sessionId: 'session-1',
    timestamp: '2026-04-10T10:00:00.000Z',
    type: 'tool-execution',
  }

  const result = getPreviewEvent(event)

  expect(result).toEqual({
    error: {
      message: 'Invalid argument: uri must be an absolute URI.',
    },
    errorCode: 'E_INVALID_URI',
  })
})

test('getPreviewEvent should prefer prepared selected event preview metadata', () => {
  const event = setSelectedEventPreview(
    {
      eventId: 4,
      mimeType: 'image/png',
      name: 'diagram.png',
      type: 'chat-attachment-added',
    },
    {
      alt: 'diagram.png',
      previewType: 'image',
      src: 'data:image/png;base64,preview',
    },
  )

  const result = getPreviewEvent(event)

  expect(result).toEqual({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
  })
})
