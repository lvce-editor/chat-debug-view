import { expect, test } from '@jest/globals'
import * as ParseChatDebugUri from '../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts'
import { ParseChatDebugUriErrorCode } from '../src/parts/ParseChatDebugUriErrorCode/ParseChatDebugUriErrorCode.ts'
import { ParseChatDebugUriResultType } from '../src/parts/ParseChatDebugUriResult/ParseChatDebugUriResult.ts'

test('parseChatDebugUri should return success for valid uri', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session-1')
  expect(result).toEqual({
    sessionId: 'session-1',
    type: ParseChatDebugUriResultType.Success,
  })
})

test('parseChatDebugUri should decode encoded session id', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session%20id')
  expect(result).toEqual({
    sessionId: 'session id',
    type: ParseChatDebugUriResultType.Success,
  })
})

test('parseChatDebugUri should return missing-uri error for empty uri', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('')
  expect(result).toEqual({
    code: ParseChatDebugUriErrorCode.MissingUri,
    message: 'Missing URI',
    type: ParseChatDebugUriResultType.Error,
  })
})

test('parseChatDebugUri should return invalid-uri-format error', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('https://example.com')
  expect(result).toEqual({
    code: ParseChatDebugUriErrorCode.InvalidUriFormat,
    message: 'Invalid URI format',
    type: ParseChatDebugUriResultType.Error,
  })
})

test('parseChatDebugUri should return invalid-uri-encoding error', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://%E0%A4%A')
  expect(result).toEqual({
    code: ParseChatDebugUriErrorCode.InvalidUriEncoding,
    message: 'Invalid URI encoding',
    type: ParseChatDebugUriResultType.Error,
  })
})

test('parseChatDebugUri should return invalid-session-id error for encoded slash', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session%2Fid')
  expect(result).toEqual({
    code: ParseChatDebugUriErrorCode.InvalidSessionId,
    message: 'Invalid session id',
    type: ParseChatDebugUriResultType.Error,
  })
})
