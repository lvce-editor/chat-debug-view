import { expect, test } from '@jest/globals'
import * as ParseChatDebugUri from '../src/parts/ParseChatDebugUri/ParseChatDebugUri.ts'

test('parseChatDebugUri should return success for valid uri', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session-1')
  expect(result).toEqual({
    sessionId: 'session-1',
    type: 'success',
  })
})

test('parseChatDebugUri should decode encoded session id', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session%20id')
  expect(result).toEqual({
    sessionId: 'session id',
    type: 'success',
  })
})

test('parseChatDebugUri should return missing-uri error for empty uri', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('')
  expect(result).toEqual({
    code: ParseChatDebugUri.ParseChatDebugUriErrorCode.MissingUri,
    message: 'Missing URI',
    type: 'error',
  })
})

test('parseChatDebugUri should return invalid-uri-format error', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('https://example.com')
  expect(result).toEqual({
    code: ParseChatDebugUri.ParseChatDebugUriErrorCode.InvalidUriFormat,
    message: 'Invalid URI format',
    type: 'error',
  })
})

test('parseChatDebugUri should return invalid-uri-encoding error', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://%E0%A4%A')
  expect(result).toEqual({
    code: ParseChatDebugUri.ParseChatDebugUriErrorCode.InvalidUriEncoding,
    message: 'Invalid URI encoding',
    type: 'error',
  })
})

test('parseChatDebugUri should return invalid-session-id error for encoded slash', () => {
  const result = ParseChatDebugUri.parseChatDebugUri('chat-debug://session%2Fid')
  expect(result).toEqual({
    code: ParseChatDebugUri.ParseChatDebugUriErrorCode.InvalidSessionId,
    message: 'Invalid session id',
    type: 'error',
  })
})
