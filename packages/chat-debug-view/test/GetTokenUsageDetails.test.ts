import { expect, test } from '@jest/globals'
import { getTokenUsageDetails } from '../src/parts/GetTokenUsageDetails/GetTokenUsageDetails.ts'

test('getTokenUsageDetails should extract token counts from ai-response event values', () => {
  const event = {
    eventId: 1,
    type: 'ai-response',
    value: {
      usage: {
        input_tokens: 224,
        input_tokens_details: {
          cached_tokens: 32,
        },
        output_tokens: 5,
      },
    },
  }

  const result = getTokenUsageDetails(event)

  expect(result).toEqual({
    cachedTokens: 32,
    inputTokens: 224,
    outputTokens: 5,
  })
})

test('getTokenUsageDetails should extract token counts from merged response events', () => {
  const event = {
    eventId: 1,
    responseEvent: {
      eventId: 2,
      type: 'ai-response',
      value: {
        usage: {
          inputTokens: 12,
          outputTokens: 7,
        },
      },
    },
    type: 'request',
  }

  const result = getTokenUsageDetails(event)

  expect(result).toEqual({
    cachedTokens: undefined,
    inputTokens: 12,
    outputTokens: 7,
  })
})

test('getTokenUsageDetails should return undefined when token usage is unavailable', () => {
  const event = {
    eventId: 1,
    type: 'chat-message-added',
  }

  const result = getTokenUsageDetails(event)

  expect(result).toBeUndefined()
})