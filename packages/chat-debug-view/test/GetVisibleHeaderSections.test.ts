import { expect, test } from '@jest/globals'
import { getVisibleHeaderSections } from '../src/parts/GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import * as HeaderSectionKey from '../src/parts/HeaderSectionKey/HeaderSectionKey.ts'

test('getVisibleHeaderSections should return visible sections in general response request order', () => {
  const selectedEvent = {
    endValue: {
      headers: {
        Server: 'test-server',
      },
      statusCode: 201,
    },
    eventId: 1,
    headers: {
      Authorization: 'Bearer [redacted]',
    },
    method: 'POST',
    type: 'ai-request',
    url: 'https://example.com/chat',
  } as const

  const result = getVisibleHeaderSections(selectedEvent)

  expect(result).toEqual([
    {
      heading: 'General',
      info: '',
      isExpanded: true,
      items: [
        {
          key: 'Request URL',
          value: 'https://example.com/chat',
        },
        {
          key: 'Request Method',
          value: 'POST',
        },
        {
          key: 'Status Code',
          value: '201 Created',
        },
      ],
      key: HeaderSectionKey.General,
    },
    {
      heading: 'Response Headers',
      info: 'Some headers may not be displayed due to Access-Control-Expose-Headers header.',
      isExpanded: true,
      items: [
        {
          key: 'Server',
          value: 'test-server',
        },
      ],
      key: HeaderSectionKey.ResponseHeaders,
    },
    {
      heading: 'Request Headers',
      info: '',
      isExpanded: true,
      items: [
        {
          key: 'Authorization',
          value: 'Bearer [redacted]',
        },
      ],
      key: HeaderSectionKey.RequestHeaders,
    },
  ])
})

test('getVisibleHeaderSections should derive expansion state from collapsed sections', () => {
  const selectedEvent = {
    endValue: {
      statusCode: 200,
    },
    eventId: 1,
    headers: {
      Meta: {
        nested: true,
      },
    },
    type: 'ai-request',
  } as const

  const result = getVisibleHeaderSections(selectedEvent, [HeaderSectionKey.RequestHeaders])

  expect(result).toEqual([
    {
      heading: 'General',
      info: '',
      isExpanded: true,
      items: [
        {
          key: 'Status Code',
          value: '200 OK',
        },
      ],
      key: HeaderSectionKey.General,
    },
    {
      heading: 'Request Headers',
      info: '',
      isExpanded: false,
      items: [
        {
          key: 'Meta',
          value: '{"nested":true}',
        },
      ],
      key: HeaderSectionKey.RequestHeaders,
    },
  ])
})

test('getVisibleHeaderSections should omit sections with no items', () => {
  const result = getVisibleHeaderSections(null)

  expect(result).toEqual([])
})

test('getVisibleHeaderSections should preserve unknown status codes without inventing a label', () => {
  const selectedEvent = {
    endValue: {
      statusCode: 599,
    },
    eventId: 1,
    type: 'ai-response',
  } as const

  const result = getVisibleHeaderSections(selectedEvent)

  expect(result).toEqual([
    {
      heading: 'General',
      info: '',
      isExpanded: true,
      items: [
        {
          key: 'Status Code',
          value: '599',
        },
      ],
      key: HeaderSectionKey.General,
    },
  ])
})
