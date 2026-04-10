import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableDom from '../src/parts/GetTableDom/GetTableDom.ts'
import * as GetTableHeaderDom from '../src/parts/GetTableHeaderDom/GetTableHeaderDom.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getTableHeaderDom should render the table header nodes', () => {
  const dom = GetTableHeaderDom.getTableHeaderDom() as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTableHeaderRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellDuration ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
  ])
})

test('getTableHeaderDom should omit hidden columns', () => {
  const dom = GetTableHeaderDom.getTableHeaderDom([TableColumn.Type, TableColumn.Status]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTableHeaderRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
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
      className: 'ChatDebugViewTableWrapper',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTableHeaderRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellDuration ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'ChatDebugViewTableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewResizers',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewResizer ChatDebugViewResizerOne',
      name: 'ResizerOne',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewResizerInner',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewResizer ChatDebugViewResizerTwo',
      name: 'ResizerTwo',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewResizerInner',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getTableDom should count only direct children for the resizer wrapper', () => {
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
  }[]
  const resizers = dom.find((node) => node.className === 'ChatDebugViewResizers')

  expect(resizers?.childCount).toBe(2)
})
