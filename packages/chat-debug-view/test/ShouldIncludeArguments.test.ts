import { expect, test } from '@jest/globals'
import * as ShouldIncludeArguments from '../src/parts/ShouldIncludeArguments/ShouldIncludeArguments.ts'

test('shouldIncludeArguments should return true when arguments exist and the tool is allowed', () => {
  const result = ShouldIncludeArguments.shouldIncludeArguments(
    {
      arguments: '{"path":"/tmp"}',
      eventId: 1,
      type: 'request',
    },
    'readFile',
  )

  expect(result).toBe(true)
})

test('shouldIncludeArguments should return false when arguments are missing', () => {
  const result = ShouldIncludeArguments.shouldIncludeArguments(
    {
      eventId: 1,
      type: 'request',
    },
    'readFile',
  )

  expect(result).toBe(false)
})

test('shouldIncludeArguments should return false for getWorkspaceUri', () => {
  const result = ShouldIncludeArguments.shouldIncludeArguments(
    {
      arguments: '{}',
      eventId: 1,
      type: 'request',
    },
    'getWorkspaceUri',
  )

  expect(result).toBe(false)
})
