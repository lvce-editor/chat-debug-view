import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetDevtoolsRows from '../src/parts/GetDevtoolsRows/GetDevtoolsRows.ts'

test('getDevtoolsRows should render tool execution labels with the tool name', () => {
  const events = [
    {
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'get_workspace_uri',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewEventRow',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellType',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, get_workspace_uri'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellDuration',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('0ms'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellStatus',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('200'),
  ])
})

test('getDevtoolsRows should render tool execution labels with tool name from arguments', () => {
  const events = [
    {
      arguments: {
        name: 'read_file',
        uri: 'file:///tmp/file.txt',
      },
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewEventRow',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellType',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, read_file'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellDuration',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('0ms'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellStatus',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('200'),
  ])
})

test('getDevtoolsRows should render tool execution labels with tool name from top-level name field', () => {
  const events = [
    {
      arguments: {
        baseUri: '/home/simon/Documents/levivilet/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      name: 'getWorkspaceUri',
      sessionId: 'session-1',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewEventRow',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellType',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, getWorkspaceUri'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellDuration',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('0ms'),
    {
      childCount: 1,
      className: 'ChatDebugViewCell ChatDebugViewCellStatus',
      'data-index': '0',
      type: VirtualDomElements.Td,
    },
    text('400'),
  ])
})
