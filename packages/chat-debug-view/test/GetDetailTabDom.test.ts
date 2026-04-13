import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab } from '../src/parts/DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDetailTabDom } from '../src/parts/GetDetailTabDom/GetDetailTabDom.ts'

test('getDetailTabDom should render an unselected detail tab', () => {
  const detailTab: DetailTab = {
    isSelected: false,
    label: 'Preview',
    name: 'preview',
  }

  const result = getDetailTabDom(detailTab) as readonly {
    readonly ['aria-controls']?: string
    readonly ariaSelected?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly role?: string
    readonly tabIndex?: number
    readonly type?: number
  }[]

  expect(result).toEqual([
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-preview',
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      name: 'preview',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Preview'),
  ])
})

test('getDetailTabDom should render a selected detail tab', () => {
  const detailTab: DetailTab = {
    isSelected: true,
    label: 'Timing',
    name: 'timing',
  }

  const result = getDetailTabDom(detailTab) as readonly {
    readonly ['aria-controls']?: string
    readonly ariaSelected?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly role?: string
    readonly tabIndex?: number
    readonly type?: number
  }[]

  expect(result).toEqual([
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-timing',
      ariaSelected: true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      name: 'timing',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
    },
    text('Timing'),
  ])
})
