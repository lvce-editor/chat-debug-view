import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetRowCellNodes from '../src/parts/GetRowCellNodes/GetRowCellNodes.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getRowCellNodes should render visible columns in order', () => {
  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    sessionId: 'session-1',
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    toolName: 'get_workspace_uri',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, false, [TableColumn.Type, TableColumn.Duration, TableColumn.Status])

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('tool-execution, get_workspace_uri'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewColumnFixed',
      type: VirtualDomElements.Td,
    },
    text('200'),
    {
      childCount: 1,
      className: 'TableCell',
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

test('getRowCellNodes should render list_files without the tool-execution prefix in the type column', () => {
  const event = {
    eventId: 1,
    name: 'list_files',
    sessionId: 'session-1',
    timestamp: '2026-04-02T07:26:35.172Z',
    type: 'tool-execution',
  }

  const result = GetRowCellNodes.getRowCellNodes(event, false, [TableColumn.Type])

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('list_files'),
  ])
})
