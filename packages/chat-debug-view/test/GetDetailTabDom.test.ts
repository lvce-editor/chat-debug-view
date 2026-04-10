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
    readonly ['aria-selected']?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly id?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly role?: string
    readonly tabIndex?: number
    readonly type?: number
    readonly value?: string
  }[]

  expect(result).toEqual([
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-preview',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-preview',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'preview',
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
    readonly ['aria-selected']?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly id?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly role?: string
    readonly tabIndex?: number
    readonly type?: number
    readonly value?: string
  }[]

  expect(result).toEqual([
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-timing',
      'aria-selected': true,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected',
      id: 'ChatDebugViewDetailsTab-timing',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
      value: 'timing',
    },
    text('Timing'),
  ])
})
