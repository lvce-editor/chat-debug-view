import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableDom from '../src/parts/GetTableDom/GetTableDom.ts'

test('getTableHeaderDom should render the table header nodes', () => {
  const dom = GetTableDom.getTableHeaderDom() as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
  ])
})

test('getTableBodyDom should render the table body nodes', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableDom.getTableBodyDom(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onPointerDown?: number
    readonly onContextMenu?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableBody',
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Tr,
    },
  ])
})

test('getTableDom should render header and body nodes for the table', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableDom.getTableDom(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onPointerDown?: number
    readonly onContextMenu?: number
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'ChatDebugViewTableBody',
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Tr,
    },
  ])
})

test('getTableDom should render an empty table body when there are no rows', () => {
  const dom = GetTableDom.getTableDom([], 0) as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]
  const body = dom.find((node) => node.className === 'ChatDebugViewTableBody')

  expect(body).toEqual(
    expect.objectContaining({
      childCount: 1,
      className: 'ChatDebugViewTableBody',
    }),
  )
})
