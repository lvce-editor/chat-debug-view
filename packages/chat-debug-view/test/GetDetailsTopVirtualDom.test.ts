import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDetailsTopVirtualDom from '../src/parts/GetDetailsTopVirtualDom/GetDetailsTopVirtualDom.ts'

test('getDetailsTopVirtualDom should render details top, close control, and tabs', () => {
  const detailTabs = createDetailTabs()

  const dom = GetDetailsTopVirtualDom.getDetailsTopVirtualDom(detailTabs) as readonly {
    readonly ['aria-label']?: string
    readonly ['aria-controls']?: string
    readonly ariaSelected?: boolean
    readonly childCount?: number
    readonly className?: string
    readonly name?: string
    readonly onChange?: number
    readonly onClick?: number
    readonly onFocus?: number
    readonly onContextMenu?: number
    readonly role?: string
    readonly tabIndex?: number
  }[]

  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewDetailsTop',
      onContextMenu: DomEventListenerFunctions.HandleDetailsTopContextMenu,
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Close details',
      childCount: 1,
      className: 'ChatDebugViewDetailsClose',
      name: 'closeDetails',
      onChange: DomEventListenerFunctions.HandleCloseDetails,
      onClick: DomEventListenerFunctions.HandleCloseDetails,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Detail sections',
      childCount: 4,
      className: 'ChatDebugViewDetailsTabs',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-preview',
      ariaSelected: false,
      childCount: 1,
      className: 'PanelTab',
      name: 'preview',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      onFocus: DomEventListenerFunctions.HandleDetailTabsFocus,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Preview'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-payload',
      ariaSelected: false,
      childCount: 1,
      className: 'PanelTab',
      name: 'payload',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      onFocus: DomEventListenerFunctions.HandleDetailTabsFocus,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Payload'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-response',
      ariaSelected: true,
      childCount: 1,
      className: 'PanelTab PanelTabSelected',
      name: 'response',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      onFocus: DomEventListenerFunctions.HandleDetailTabsFocus,
      role: 'tab',
      tabIndex: 0,
      type: VirtualDomElements.Button,
    },
    text('Response'),
    {
      'aria-controls': 'ChatDebugViewDetailsPanel-timing',
      ariaSelected: false,
      childCount: 1,
      className: 'PanelTab',
      name: 'timing',
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      onFocus: DomEventListenerFunctions.HandleDetailTabsFocus,
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Timing'),
  ])
})
