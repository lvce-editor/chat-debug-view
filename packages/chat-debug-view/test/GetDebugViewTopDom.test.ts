// cspell:ignore multiselectable
import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewFilterInputDevtools, ChatDebugViewTopDevtools } from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetDebugViewTopDom from '../src/parts/GetDebugViewTopDom/GetDebugViewTopDom.ts'

test('getDebugViewTopDom should render search section', () => {
  const dom = GetDebugViewTopDom.getDebugViewTopDom('', false, []) as readonly {
    readonly autocomplete?: string
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onClick?: number
    readonly onInput?: number
    readonly placeholder?: string
    readonly role?: string
    readonly type?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewTop',
      type: VirtualDomElements.Search,
    },
    {
      childCount: 1,
      className: 'SearchField',
      role: 'none',
      type: VirtualDomElements.Div,
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
      className: 'IconButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRefresh',
      type: VirtualDomElements.Div,
    },
  ])
})

test('getDebugViewTopDom should render devtools search section', () => {
  const categoryFilters = EventCategoryFilter.selectCategoryFilters(EventCategoryFilter.createCategoryFilters(), [EventCategoryFilter.Tools])
  const dom = GetDebugViewTopDom.getDebugViewTopDom('tool', true, categoryFilters) as readonly {
    readonly ['aria-label']?: string
    readonly ['aria-multiselectable']?: boolean
    readonly ariaSelected?: boolean
    readonly autocomplete?: string
    readonly childCount?: number
    readonly className?: string
    readonly inputType?: string
    readonly name?: string
    readonly onClick?: number
    readonly onInput?: number
    readonly placeholder?: string
    readonly role?: string
    readonly type?: number
    readonly value?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 3,
      className: `ChatDebugViewTop ${ChatDebugViewTopDevtools}`,
      type: VirtualDomElements.Search,
    },
    {
      childCount: 1,
      className: 'SearchField',
      role: 'none',
      type: VirtualDomElements.Div,
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
      'aria-multiselectable': true,
      childCount: 3,
      className: 'ChatDebugViewQuickFilters',
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'listbox',
      type: VirtualDomElements.Div,
    },
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.All,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text('All'),
    {
      ariaSelected: true,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill ChatDebugViewQuickFilterPillSelected',
      name: EventCategoryFilter.Tools,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text('Tools'),
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: EventCategoryFilter.Network,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text('Network'),
    {
      'aria-label': 'Refresh events',
      childCount: 1,
      className: 'IconButton',
      name: 'refresh',
      onClick: DomEventListenerFunctions.HandleClickRefresh,
      type: VirtualDomElements.Button,
      value: 'refresh',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRefresh',
      type: VirtualDomElements.Div,
    },
  ])
})
