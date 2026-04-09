import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewFilterInputDevtools, ChatDebugViewTopDevtools } from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDebugViewTopDom from '../src/parts/GetDebugViewTopDom/GetDebugViewTopDom.ts'

test('getDebugViewTopDom should render search section with context menu listener', () => {
  const dom = GetDebugViewTopDom.getDebugViewTopDom('', false, []) as readonly {
    readonly autocomplete?: string
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onClick?: number
    readonly onContextMenu?: number
    readonly onInput?: number
    readonly placeholder?: string
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewTop',
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Search,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: 'InputBox ChatDebugViewFilterInput',
      inputType: 'search',
      name: 'filter',
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: 'Filter events',
      type: VirtualDomElements.Input,
      value: '',
    },
    {
      'aria-label': 'Refresh events',
      childCount: 1,
      className: 'ChatDebugViewRefreshButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    text('Refresh'),
  ])
})

test('getDebugViewTopDom should render devtools search section with context menu listener', () => {
  const quickFilterNodes = [
    {
      childCount: 0,
      className: 'QuickFilter',
      type: VirtualDomElements.Div,
    },
  ]
  const dom = GetDebugViewTopDom.getDebugViewTopDom('tool', true, quickFilterNodes as readonly any[]) as readonly {
    readonly ['aria-label']?: string
    readonly autocomplete?: string
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onClick?: number
    readonly onContextMenu?: number
    readonly onInput?: number
    readonly placeholder?: string
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 3,
      className: `ChatDebugViewTop ${ChatDebugViewTopDevtools}`,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Search,
    },
    {
      autocomplete: 'off',
      childCount: 0,
      className: `InputBox ChatDebugViewFilterInput ${ChatDebugViewFilterInputDevtools}`,
      inputType: 'search',
      name: 'filter',
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder: 'Filter events',
      type: VirtualDomElements.Input,
      value: 'tool',
    },
    {
      childCount: 0,
      className: 'QuickFilter',
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Refresh events',
      childCount: 1,
      className: 'ChatDebugViewRefreshButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    text('Refresh'),
  ])
})
