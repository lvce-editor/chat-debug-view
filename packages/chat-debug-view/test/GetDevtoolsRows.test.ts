import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { DevtoolsRow } from '../src/parts/DevtoolsRow/DevtoolsRow.ts'
import * as GetDevtoolsRows from '../src/parts/GetDevtoolsRows/GetDevtoolsRows.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const createRow = (event: Readonly<Record<string, unknown>>, index = 0, overrides: Readonly<Partial<DevtoolsRow>> = {}): DevtoolsRow => {
  return {
    event: event as DevtoolsRow['event'],
    index,
    isErrorStatus: false,
    isEven: index % 2 === 1,
    isSelected: false,
    ...overrides,
  }
}

const sizeCellNodes = [
  {
    childCount: 1,
    className: 'TableCell ChatDebugViewCellSize',
    type: VirtualDomElements.Td,
  },
  text('0 B'),
] as const

test('getDevtoolsRows should render tool execution labels from the event subtype or type', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      subType: 'tool-execution',
      timestamp: '2026-03-08T00:00:00.000Z',
      toolName: 'get_workspace_uri',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0])])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})

test('getDevtoolsRows should fall back to the event type when subtype is missing', () => {
  const events = [
    {
      arguments: {
        name: 'read_file',
        uri: 'file:///tmp/file.txt',
      },
      eventId: 1,
      sessionId: 'session-1',
      subType: 'tool-execution',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0])])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('GET'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})

test('getDevtoolsRows should keep tool execution labels stable when a top-level name field is present', () => {
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
      subType: 'tool-execution',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0], 0, { isErrorStatus: true })])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text(''),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})

test('getDevtoolsRows should render 400 status when tool error is nested in result without changing the type label', () => {
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
      subType: 'tool-execution',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0], 0, { isErrorStatus: true })])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('GET'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})

test('getDevtoolsRows should add odd and even row classes to table rows', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      subType: 'request',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      sessionId: 'session-1',
      subType: 'response',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0]), createRow(events[1], 1)])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
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
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 5,
      className: 'TableRow TableRowEven',
      'data-index': '1',
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
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})

test('getDevtoolsRows should render merged ai request duration from timestamps', () => {
  const events = [
    {
      ended: '2026-04-19T12:00:00.250Z',
      eventId: 1,
      requestEvent: {
        eventId: 1,
        requestId: 'request-1',
        subType: 'ai-request',
        timestamp: '2026-04-19T12:00:00.000Z',
        type: 'ai-request',
      },
      requestId: 'request-1',
      responseEvent: {
        eventId: 2,
        requestId: 'request-1',
        subType: 'ai-response-success',
        timestamp: '2026-04-19T12:00:00.250Z',
        type: 'ai-response-success',
      },
      sessionId: 'session-1',
      started: '2026-04-19T12:00:00.000Z',
      subType: 'ai-request',
      timestamp: '2026-04-19T12:00:00.250Z',
      type: 'ai-request',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0])])

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('ai-request'),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('250 ms'),
  ])
})

test('getDevtoolsRows should omit hidden columns', () => {
  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId: 'session-1',
      started: '2026-03-08T00:00:01.000Z',
      subType: 'request',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows([createRow(events[0])], [TableColumn.Type, TableColumn.Status])

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'TableRow TableRowOdd',
      'data-index': '0',
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

test('getDevtoolsRows should preserve row parity and selection for a virtualized slice', () => {
  const events = [
    {
      eventId: 3,
      sessionId: 'session-1',
      subType: 'request',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'request',
    },
    {
      eventId: 4,
      sessionId: 'session-1',
      subType: 'response',
      timestamp: '2026-03-08T00:00:03.000Z',
      type: 'response',
    },
  ]

  const result = GetDevtoolsRows.getDevtoolsRows(
    [createRow(events[0], 2), createRow(events[1], 3, { isEven: true, isSelected: true })],
    TableColumn.defaultVisibleTableColumns,
  )

  expect(result).toEqual([
    {
      childCount: 5,
      className: 'TableRow TableRowOdd',
      'data-index': '2',
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
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
    {
      childCount: 5,
      className: 'TableRow TableRowEven TableRowSelected',
      'data-index': '3',
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
    text(''),
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('200'),
    ...sizeCellNodes,
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('0 ms'),
  ])
})
