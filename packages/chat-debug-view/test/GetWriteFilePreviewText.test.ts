import { expect, test } from '@jest/globals'
import * as GetWriteFilePreviewText from '../src/parts/GetWriteFilePreviewText/GetWriteFilePreviewText.ts'

test('getWriteFilePreviewText should return content for write_file events', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 'line 1\nline 2',
        uri: 'file:///workspace/test.txt',
      },
      eventId: 1,
      name: 'write_file',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBe('line 1\nline 2')
})

test('getWriteFilePreviewText should return undefined for other tool names', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 'line 1\nline 2',
      },
      eventId: 1,
      name: 'read_file',
      type: 'tool-execution',
    },
    'read_file',
  )

  expect(result).toBeUndefined()
})

test('getWriteFilePreviewText should return undefined when arguments are missing', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      eventId: 1,
      name: 'write_file',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBeUndefined()
})

test('getWriteFilePreviewText should return undefined when content is not a string', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 42,
      },
      eventId: 1,
      name: 'write_file',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBeUndefined()
})
