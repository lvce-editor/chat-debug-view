import { expect, test } from '@jest/globals'
import { getEventTableMethodLabel } from '../src/parts/GetEventTableMethodLabel/GetEventTableMethodLabel.ts'

test('getEventTableMethodLabel should return GET for read operations', () => {
  expect(
    getEventTableMethodLabel({
      eventId: 1,
      name: 'read_file',
      subType: 'tool-execution',
      type: 'tool-execution',
    }),
  ).toBe('GET')

  expect(
    getEventTableMethodLabel({
      arguments: {
        name: 'list_dir',
      },
      eventId: 1,
      subType: 'tool-execution',
      type: 'tool-execution',
    }),
  ).toBe('GET')

  expect(
    getEventTableMethodLabel({
      eventId: 1,
      subType: 'tool-execution',
      toolName: 'list_files',
      type: 'tool-execution',
    }),
  ).toBe('GET')
})

test('getEventTableMethodLabel should return POST for write operations', () => {
  expect(
    getEventTableMethodLabel({
      eventId: 1,
      name: 'write_file',
      subType: 'tool-execution',
      type: 'tool-execution',
    }),
  ).toBe('POST')
})

test('getEventTableMethodLabel should return DELETE for delete operations', () => {
  expect(
    getEventTableMethodLabel({
      eventId: 1,
      name: 'delete_file',
      subType: 'tool-execution',
      type: 'tool-execution',
    }),
  ).toBe('DELETE')
})

test('getEventTableMethodLabel should return an empty string for non-file operations', () => {
  expect(
    getEventTableMethodLabel({
      eventId: 1,
      subType: 'tool-execution',
      toolName: 'get_workspace_uri',
      type: 'tool-execution',
    }),
  ).toBe('')

  expect(
    getEventTableMethodLabel({
      eventId: 1,
      subType: 'request',
      type: 'request',
    }),
  ).toBe('')
})
