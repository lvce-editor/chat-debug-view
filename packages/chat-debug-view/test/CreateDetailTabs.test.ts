import { expect, test } from '@jest/globals'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('createDetailTabs should add a headers tab for ai-request events with headers', () => {
  const event = {
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
      'Content-Type': 'application/json',
    },
    type: 'ai-request',
  }

  expect(createDetailTabs(InputName.Headers, event)).toEqual([
    {
      isSelected: false,
      label: 'Preview',
      name: 'preview',
    },
    {
      isSelected: false,
      label: 'Payload',
      name: 'payload',
    },
    {
      isSelected: false,
      label: 'Response',
      name: 'response',
    },
    {
      isSelected: true,
      label: 'Headers',
      name: 'headers',
    },
  ])
})

test('createDetailTabs should fall back to response when headers are unavailable', () => {
  const event = {
    eventId: 1,
    type: 'request',
  }

  expect(createDetailTabs(InputName.Headers, event)).toEqual([
    {
      isSelected: false,
      label: 'Preview',
      name: 'preview',
    },
    {
      isSelected: false,
      label: 'Payload',
      name: 'payload',
    },
    {
      isSelected: true,
      label: 'Response',
      name: 'response',
    },
  ])
})