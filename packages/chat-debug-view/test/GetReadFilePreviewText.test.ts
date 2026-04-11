import { expect, test } from '@jest/globals'
import * as GetReadFilePreviewText from '../src/parts/GetReadFilePreviewText/GetReadFilePreviewText.ts'

test('getReadFilePreviewText should return result for read_file events', () => {
  const result = GetReadFilePreviewText.getReadFilePreviewText(
    {
      arguments: {
        uri: 'file:///workspace/test.txt',
      },
      eventId: 1,
      name: 'read_file',
      result: 'line 1\nline 2',
      type: 'tool-execution',
    },
    'read_file',
  )

  expect(result).toBe('line 1\nline 2')
})

test('getReadFilePreviewText should return undefined for other tool names', () => {
  const result = GetReadFilePreviewText.getReadFilePreviewText(
    {
      eventId: 1,
      name: 'write_file',
      result: 'line 1\nline 2',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBeUndefined()
})

test('getReadFilePreviewText should return undefined when result is not a string', () => {
  const result = GetReadFilePreviewText.getReadFilePreviewText(
    {
      eventId: 1,
      name: 'read_file',
      result: {
        content: 'line 1\nline 2',
      },
      type: 'tool-execution',
    },
    'read_file',
  )

  expect(result).toBeUndefined()
})
