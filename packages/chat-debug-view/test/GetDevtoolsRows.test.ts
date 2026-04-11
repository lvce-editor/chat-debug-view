import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetDevtoolsRows from '../src/parts/GetDevtoolsRows/GetDevtoolsRows.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getDevtoolsRows should render tool execution labels with the tool name', () => {
  const events = [
    {
      eventId: 1,
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
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, get_workspace_uri'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell',
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
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, read_file'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
  ])
})

test('getDevtoolsRows should render tool execution labels with tool name from top-level name field', () => {
  const events = [
    {
      arguments: {
        baseUri: '/test/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      eventId: 1,
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
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, getWorkspaceUri'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
  ])
})

test('getDevtoolsRows should render 400 status when tool error is nested in result', () => {
  const events = [
    {
      arguments: {
        uri: '/test/playground',
      },
      eventId: 1,
      name: 'list_files',
      result: {
        error: 'Invalid argument: uri must be an absolute URI.',
      },
      sessionId: 'session-1',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('list_files'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
  ])
})

test('getDevtoolsRows should add odd and even row classes to table rows', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('request'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    {
      childCount: 3,
      className: 'TableRow TableRowEven',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('response'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
  ])
})

test('getDevtoolsRows should omit hidden columns', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(events, null, [TableColumn.Type, TableColumn.Status])

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'TableRow TableRowOdd',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('request'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
  ])
})
