import { expect, test } from '@jest/globals'
import { getFetchCode } from '../src/parts/GetFetchCode/GetFetchCode.ts'

test('getFetchCode should omit options for a plain GET request', () => {
  expect(
    getFetchCode({
      eventId: 1,
      method: 'GET',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
      url: 'https://example.com/chat',
    }),
  ).toBe("fetch('https://example.com/chat')")
})

test('getFetchCode should include method headers and body when present', () => {
  expect(
    getFetchCode({
      body: {
        input: 'hello',
      },
      eventId: 1,
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
      url: 'https://example.com/chat',
    }),
  ).toBe(
    `fetch('https://example.com/chat', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer test-token',\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify(\n    {\n      "input": "hello"\n    }\n  ),\n})`,
  )
})

test('getFetchCode should return undefined when the event has no url', () => {
  expect(
    getFetchCode({
      eventId: 2,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    }),
  ).toBeUndefined()
})
