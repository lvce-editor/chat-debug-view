import { expect, test } from '@jest/globals'
import { getResponsePayloadSize } from '../src/parts/GetResponsePayloadSize/GetResponsePayloadSize.ts'

test('getResponsePayloadSize should return zero when response payload is missing', () => {
  expect(
    getResponsePayloadSize({
      eventId: 1,
      type: 'request',
    }),
  ).toBe(0)
})

test('getResponsePayloadSize should measure string payload bytes without json quotes', () => {
  expect(
    getResponsePayloadSize({
      eventId: 1,
      type: 'ai-response',
      value: 'abcdefghij',
    }),
  ).toBe(10)
})

test('getResponsePayloadSize should measure object payload bytes from value', () => {
  expect(
    getResponsePayloadSize({
      eventId: 1,
      type: 'ai-response',
      value: {
        ok: true,
        text: 'hi',
      },
    }),
  ).toBe(new TextEncoder().encode(JSON.stringify({ ok: true, text: 'hi' })).length)
})

test('getResponsePayloadSize should read endValue payloads', () => {
  expect(
    getResponsePayloadSize({
      endValue: {
        value: 'abcdefghij',
      },
      eventId: 1,
      type: 'ai-request',
    }),
  ).toBe(10)
})

test('getResponsePayloadSize should read response payloads', () => {
  expect(
    getResponsePayloadSize({
      eventId: 1,
      response: {
        id: 'resp_1',
      },
      type: 'response',
    }),
  ).toBe(new TextEncoder().encode(JSON.stringify({ id: 'resp_1' })).length)
})
