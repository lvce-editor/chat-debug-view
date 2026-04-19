import { expect, test } from '@jest/globals'
import * as GetPayloadEvent from '../src/parts/GetPayloadEvent/GetPayloadEvent.ts'

test('getPayloadEvent should return only the arguments object for list_files tool execution events', () => {
  const event = {
    arguments: {
      uri: 'file:///workspace',
    },
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
    type: 'tool-execution',
  }

  const result = GetPayloadEvent.getPayloadEvent(event)

  expect(result).toEqual({
    uri: 'file:///workspace',
  })
})

test('getPayloadEvent should return requestEvent for merged ai request/response events', () => {
  const requestEvent = {
    body: {
      input: ['1+1'],
    },
    eventId: 1,
    requestId: 'request-1',
    type: 'ai-request',
  }
  const event = {
    ended: '2026-04-19T12:00:00.250Z',
    eventId: 1,
    requestEvent,
    responseEvent: {
      eventId: 2,
      requestId: 'request-1',
      type: 'ai-response-success',
      value: {
        id: 'resp_1',
      },
    },
    started: '2026-04-19T12:00:00.000Z',
    type: 'ai-request',
  }

  const result = GetPayloadEvent.getPayloadEvent(event)

  expect(result).toEqual({
    input: ['1+1'],
  })
})
