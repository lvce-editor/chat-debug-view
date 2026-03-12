import { expect, test } from '@jest/globals'
import { getInvalidUriMessage } from '../src/parts/GetInvalidUriMessage/GetInvalidUriMessage.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'

test('getInvalidUriMessage returns missing-uri message', () => {
  const result = getInvalidUriMessage('', ParseChatDebugUriErrorCode.MissingUri)
  expect(result).toBe('Unable to load debug session: missing URI. Expected format: chat-debug://<sessionId>.')
})

test('getInvalidUriMessage returns invalid-uri message', () => {
  const result = getInvalidUriMessage('invalid://uri', ParseChatDebugUriErrorCode.InvalidUriFormat)
  expect(result).toBe('Unable to load debug session: invalid URI "invalid://uri". Expected format: chat-debug://<sessionId>.')
})
