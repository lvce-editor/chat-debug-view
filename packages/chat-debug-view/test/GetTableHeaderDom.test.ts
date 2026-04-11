import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableDom from '../src/parts/GetTableDom/GetTableDom.ts'
import * as GetTableHeaderDom from '../src/parts/GetTableHeaderDom/GetTableHeaderDom.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const handleTableHeaderClick = (DomEventListenerFunctions as Record<string, number>).HandleTableHeaderClick

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
      className: 'TableCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewHeaderCellDuration ChatDebugViewColumnFixed',
      name: TableColumn.Duration,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Time'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewHeaderCellStatus',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
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
      className: 'TableCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewHeaderCellStatus',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
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
      className: 'TableRow',
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
      childCount: 3,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Table,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTableColumnGroup',
      type: VirtualDomElements.ColGroup,
    },
    {
      childCount: 0,
      className: 'TableCol TableColZero',
      type: VirtualDomElements.Col,
    },
    {
      childCount: 0,
      className: 'TableCol TableColOne',
      type: VirtualDomElements.Col,
    },
    {
      childCount: 0,
      className: 'TableCol TableColTwo',
      type: VirtualDomElements.Col,
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
      className: 'TableCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewHeaderCellDuration ChatDebugViewColumnFixed',
      name: TableColumn.Duration,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Time'),
    {
      childCount: 1,
      className: 'TableCell ChatDebugViewHeaderCellStatus',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'TableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'TableRow',
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
      role: 'none',
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
      role: 'none',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getTableDom should count only direct children for the resizer wrapper', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
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

test('getTableDom should omit hidden columns from the colgroup', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableDom.getTableDom(rowNodes as readonly any[], 1, [TableColumn.Type, TableColumn.Status]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]

  expect(dom).toEqual(
    expect.arrayContaining([
      {
        childCount: 2,
        className: 'ChatDebugViewTableColumnGroup',
        type: VirtualDomElements.ColGroup,
      },
      {
        childCount: 0,
        className: 'TableCol TableColZero',
        type: VirtualDomElements.Col,
      },
      {
        childCount: 0,
        className: 'TableCol TableColOne',
        type: VirtualDomElements.Col,
      },
    ]),
  )
  expect(dom).not.toEqual(
    expect.arrayContaining([
      {
        className: 'TableCol TableColTwo',
        type: VirtualDomElements.Col,
      },
    ]),
  )
})
