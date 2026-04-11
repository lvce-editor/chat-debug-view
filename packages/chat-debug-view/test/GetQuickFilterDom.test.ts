import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import type { CategoryFilter } from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import * as GetQuickFilterDom from '../src/parts/GetQuickFilterDom/GetQuickFilterDom.ts'

test('getQuickFilterDom should render an unselected quick filter pill', () => {
  const categoryFilter: CategoryFilter = {
    isSelected: false,
    label: 'Network',
    name: 'network',
  }
  const dom = GetQuickFilterDom.getQuickFilterDom(categoryFilter) as readonly {
    readonly ariaSelected?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onClick?: number
    readonly role?: string
  }[]

  expect(dom).toEqual([
    {
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill',
      name: 'network',
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text('Network'),
  ])
})

test('getQuickFilterDom should render selected quick filter pill state', () => {
  const categoryFilter: CategoryFilter = {
    isSelected: true,
    label: 'Tool Calls',
    name: 'tools',
  }
  const dom = GetQuickFilterDom.getQuickFilterDom(categoryFilter) as readonly {
    readonly ariaSelected?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onClick?: number
    readonly role?: string
  }[]

  expect(dom).toEqual([
    {
      ariaSelected: true,
      childCount: 1,
      className: 'ChatDebugViewQuickFilterPill ChatDebugViewQuickFilterPillSelected',
      name: 'tools',
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'option',
      type: VirtualDomElements.Button,
    },
    text('Tool Calls'),
  ])
})
