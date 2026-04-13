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
      'aria-label': ChatDebugStrings.detailSections(),
      childCount: 4,
      className: ChatDebugViewDetailsTabs,
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
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
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      name: 'payload',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      ariaSelected: false,
      childCount: 1,
      className: 'ChatDebugViewDetailsTab',
      name: 'response',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Response'),
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
