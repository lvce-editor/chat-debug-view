import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../src/parts/ChatViewEvent/ChatViewEvent.ts'
import * as GetRowCellNodesModule from '../src/parts/GetRowCellNodes/GetRowCellNodes.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

type TestEvent = Omit<ChatViewEvent, 'subType' | 'type'> & {
  readonly subType?: string
  readonly type: string
}

const withSubType = (event: Readonly<TestEvent>): ChatViewEvent => {
  if (typeof event.subType === 'string') {
    return event as ChatViewEvent
  }
  return {
    ...event,
    subType: event.type,
  } as ChatViewEvent
}

const getRowCellNodes = (
  event: Readonly<TestEvent>,
  isErrorStatus: boolean,
  visibleColumns: readonly string[],
): ReturnType<typeof GetRowCellNodesModule.getRowCellNodes> => {
  return GetRowCellNodesModule.getRowCellNodes(withSubType(event), isErrorStatus, visibleColumns)
}

const GetRowCellNodes = { getRowCellNodes }

test('getRowCellNodes should render visible columns in order using the event subtype or type label', () => {
  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    toolName: 'get_workspace_uri',
    subType: 'tool-execution',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, false, [TableColumn.Type, TableColumn.Method, TableColumn.Duration, TableColumn.Status])

  expect(result).toEqual([
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
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Td,
    },
    text('250 ms'),
  ])
})

test('getRowCellNodes should apply error status styling and ignore unknown columns', () => {
  const event = {
    error: 'Invalid argument: uri must be an absolute URI.',
    eventId: 1,
    name: 'list_files',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    subType: 'tool-execution',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, true, [TableColumn.Status, 'unknown-column'])

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewCellStatusError',
      type: VirtualDomElements.Td,
    },
    text('400'),
  ])
})

test('getRowCellNodes should fall back to the event type in the type column when subtype is missing', () => {
  const event = {
    eventId: 1,
    name: 'list_files',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    subType: 'tool-execution',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, false, [TableColumn.Type])

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution'),
  ])
})

test('getRowCellNodes should render the mapped http-like method for file operations', () => {
  const event = {
    eventId: 1,
    name: 'read_file',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    subType: 'tool-execution',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, false, [TableColumn.Method])

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('GET'),
  ])
})
