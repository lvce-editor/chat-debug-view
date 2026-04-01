import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableDom from '../src/parts/GetTableDom/GetTableDom.ts'

test('getTableHeaderDom should render the table header nodes', () => {
  const dom = GetTableDom.getTableHeaderDom() as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 5,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      type: VirtualDomElements.Div,
    },
    text('Status'),
  ])
})

test('getTableBodydOm should render the table body nodes', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Div,
    },
  ]
  const dom = GetTableDom.getTableBodydOm(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onClick?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableBody',
      onClick: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getTableDom should render header and body nodes for the table', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: 4,
    },
  ]
  const dom = GetTableDom.getTableDom(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onClick?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 5,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      type: VirtualDomElements.Div,
    },
    text('Status'),
    {
      childCount: 1,
      className: 'ChatDebugViewTableBody',
      onClick: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChatDebugViewEventRow',
      type: VirtualDomElements.Div,
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
