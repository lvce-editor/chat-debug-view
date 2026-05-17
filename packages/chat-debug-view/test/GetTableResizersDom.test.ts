import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTableResizersDom from '../src/parts/GetTableResizersDom/GetTableResizersDom.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getTableResizersDom should render one resizer per visible column boundary', () => {
  const dom = GetTableResizersDom.getTableResizersDom(TableColumn.defaultVisibleTableColumns) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onPointerDown?: number
    readonly type?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 4,
      className: 'Resizers',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Resizer ResizerOne',
      name: 'ResizerOne',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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
      tabIndex: -1,
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
      className: 'Resizer ResizerThree',
      name: 'ResizerThree',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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
      className: 'Resizer ResizerFour',
      name: 'ResizerFour',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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

test('getTableResizersDom should match the visible column count', () => {
  const dom = GetTableResizersDom.getTableResizersDom([TableColumn.Type, TableColumn.Status]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
  }[]

  expect(dom).toEqual(
    expect.arrayContaining([
      {
        childCount: 1,
        className: 'Resizers',
        role: 'none',
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: 'Resizer ResizerOne',
        name: 'ResizerOne',
        onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
        role: 'none',
        tabIndex: -1,
        type: VirtualDomElements.Button,
      },
    ]),
  )
  expect(dom).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        className: 'Resizer ResizerTwo',
      }),
    ]),
  )
})

test('getTableResizersDom should omit resizers when fewer than two columns are visible', () => {
  const dom = GetTableResizersDom.getTableResizersDom([TableColumn.Status])

  expect(dom).toEqual([])
})

test('getTableResizersDom should default to visible table columns when undefined is passed', () => {
  const dom = GetTableResizersDom.getTableResizersDom(undefined as unknown as readonly string[]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onPointerDown?: number
    readonly type?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 4,
      className: 'Resizers',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Resizer ResizerOne',
      name: 'ResizerOne',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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
      tabIndex: -1,
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
      className: 'Resizer ResizerThree',
      name: 'ResizerThree',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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
      className: 'Resizer ResizerFour',
      name: 'ResizerFour',
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: 'none',
      tabIndex: -1,
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
