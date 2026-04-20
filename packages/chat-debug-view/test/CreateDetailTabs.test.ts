import { expect, test } from '@jest/globals'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('createDetailTabs should include the headers tab for ai request response events with header details', () => {
  const event = {
    ended: '2026-04-20T10:00:00.250Z',
    eventId: 1,
    requestEvent: {
      eventId: 1,
      method: 'POST',
      type: 'ai-request',
      url: 'https://example.com/v1/chat/completions',
    },
    responseEvent: {
      eventId: 2,
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
      type: 'ai-response',
    },
    started: '2026-04-20T10:00:00.000Z',
    type: 'ai-request',
  }

  const result = createDetailTabs(InputName.Headers, event)

  expect(result).toEqual([
    {
      isSelected: false,
      label: 'Preview',
      name: InputName.Preview,
    },
    {
      isSelected: false,
      label: 'Payload',
      name: InputName.Payload,
    },
    {
      isSelected: false,
      label: 'Response',
      name: InputName.Response,
    },
    {
      isSelected: true,
      label: 'Headers',
      name: InputName.Headers,
    },
    {
      isSelected: false,
      label: 'Timing',
      name: InputName.Timing,
    },
  ])
})

test('createDetailTabs should fall back to the response tab when headers are unavailable', () => {
  const event = {
    eventId: 1,
    type: 'ai-request',
  }

  const result = createDetailTabs(InputName.Headers, event)

  expect(result).toEqual([
    {
      isSelected: false,
      label: 'Preview',
      name: InputName.Preview,
    },
    {
      isSelected: false,
      label: 'Payload',
      name: InputName.Payload,
    },
    {
      isSelected: true,
      label: 'Response',
      name: InputName.Response,
    },
  ])
})
