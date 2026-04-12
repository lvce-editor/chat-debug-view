import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableDom from '../src/parts/GetTableDom/GetTableDom.ts'
import * as GetTableHeaderDom from '../src/parts/GetTableHeaderDom/GetTableHeaderDom.ts'
import * as GetTableWrapperDom from '../src/parts/GetTableWrapperDom/GetTableWrapperDom.ts'
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
      className: 'TableHead',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Duration,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Time'),
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
      className: 'TableHead',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
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
    readonly onContextMenu?: number
    readonly onFocus?: number
    readonly onPointerDown?: number
    readonly role?: string
    readonly scope?: string
    readonly text?: string
    readonly tabIndex?: number
    readonly type?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 3,
      className: 'Table',
      onFocus: DomEventListenerFunctions.HandleTableFocus,
      tabIndex: 0,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 3,
      className: 'ColGroup',
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
      className: 'TableHead',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Duration,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Time'),
    {
      childCount: 1,
      className: 'TableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClickAt,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ])
})

test('getTableWrapperDom should render the wrapper node', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableWrapperDom.getTableWrapperDom(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onFocus?: number
    readonly type?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'TableWrapper',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'Table',
      onFocus: DomEventListenerFunctions.HandleTableFocus,
      tabIndex: 0,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 3,
      className: 'ColGroup',
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
      className: 'TableHead',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Duration,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Time'),
    {
      childCount: 1,
      className: 'TableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClickAt,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 3,
      className: 'Resizers',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Resizer ResizerOne',
      name: 'ResizerOne',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'ResizerInner',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Resizer ResizerTwo',
      name: 'ResizerTwo',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'ResizerInner',
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
  const resizers = dom.find((node) => node.className === 'Resizers')

  expect(resizers).toBeUndefined()
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
        className: 'ColGroup',
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

test('getTableWrapperDom should add a focus outline when focused', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableWrapperDom.getTableWrapperDom(rowNodes as readonly any[], 1, undefined, undefined, '', 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]
  const wrapper = dom.find((node) => node.className === 'TableWrapper FocusOutline')
  const table = dom.find((node) => node.className === 'Table')

  expect(wrapper).toEqual(
    expect.objectContaining({
      childCount: 2,
      className: 'TableWrapper FocusOutline',
      type: VirtualDomElements.Div,
    }),
  )
  expect(table).toEqual(
    expect.objectContaining({
      childCount: 3,
      className: 'Table',
      onFocus: DomEventListenerFunctions.HandleTableFocus,
      tabIndex: 0,
      type: VirtualDomElements.Table,
    }),
  )
})
