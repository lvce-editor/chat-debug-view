import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableBodyDom from '../src/parts/GetTableBodyDom/GetTableBodyDom.ts'

test('getTableBodyDom should render the table body nodes', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ]
  const dom = GetTableBodyDom.getTableBodyDom(rowNodes as readonly any[], 1) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly onPointerDown?: number
    readonly onContextMenu?: number
  }[]

  expect(dom).toEqual([
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
  ])
})

test('getTableBodyDom should render an empty table body when there are no rows', () => {
  const dom = GetTableBodyDom.getTableBodyDom([], 0) as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'TableBody',
      onContextMenu: DomEventListenerFunctions.HandleTableBodyContextMenu,
      onPointerDown: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.TBody,
    },
  ])
})
