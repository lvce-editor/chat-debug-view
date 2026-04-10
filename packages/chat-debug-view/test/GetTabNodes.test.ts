import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ChatDebugStrings from '../src/parts/ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewDetailsTabs } from '../src/parts/ClassNames/ClassNames.ts'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTabNodes } from '../src/parts/GetTabNodes/GetTabNodes.ts'

const detailTabs = DetailTab.createDetailTabs('timing')

test('getTabNodes should render detail tabs and mark the selected tab', () => {
  const result = getTabNodes(detailTabs) as readonly {
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
      'aria-label': ChatDebugStrings.detailSections(),
      childCount: 4,
      className: ChatDebugViewDetailsTabs,
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
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
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-payload',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'payload',
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      'aria-selected': false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      id: 'ChatDebugViewDetailsTab-response',
      name: 'detailTab',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
      value: 'response',
    },
    text('Response'),
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
