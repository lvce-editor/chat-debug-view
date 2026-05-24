import { expect, test } from '@jest/globals'
import * as GetWriteFilePreviewText from '../src/parts/GetWriteFilePreviewText/GetWriteFilePreviewText.ts'

test('getWriteFilePreviewText should return content and uri for write_file events', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 'line 1\nline 2',
        uri: 'file:///workspace/test.txt',
      },
      eventId: 1,
      name: 'write_file',
      subType: 'tool-execution',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toEqual({
    content: 'line 1\nline 2',
    previewType: 'write-file',
    uri: 'file:///workspace/test.txt',
  })
})

test('getWriteFilePreviewText should return undefined for other tool names', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 'line 1\nline 2',
      },
      eventId: 1,
      name: 'read_file',
      subType: 'tool-execution',
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
      subType: 'tool-execution',
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
      subType: 'tool-execution',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBeUndefined()
})

test('getWriteFilePreviewText should return undefined when uri is not a string', () => {
  const result = GetWriteFilePreviewText.getWriteFilePreviewText(
    {
      arguments: {
        content: 'line 1\nline 2',
        uri: 42,
      },
      eventId: 1,
      name: 'write_file',
      subType: 'tool-execution',
      type: 'tool-execution',
    },
    'write_file',
  )

  expect(result).toBeUndefined()
})
