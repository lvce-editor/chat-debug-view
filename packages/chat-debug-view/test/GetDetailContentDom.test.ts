import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDetailContentDom } from '../src/parts/GetDetailContentDom/GetDetailContentDom.ts'

test('getDetailContentDom should wrap the selected tab content in a tabpanel', () => {
  const detailTabs = createDetailTabs('response')
  const result = getDetailContentDom(detailTabs[2], 'response', [
    {
      childCount: 1,
      className: 'ParentNode',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChildNode',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      className: 'SiblingNode',
      type: VirtualDomElements.Div,
    },
  ])

  expect(result).toEqual([
    {
      'aria-label': 'Response',
      childCount: 2,
      className: 'ChatDebugViewDetailsBottom',
      id: 'ChatDebugViewDetailsPanel-response',
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ParentNode',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'ChildNode',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      className: 'SiblingNode',
      type: VirtualDomElements.Div,
    },
  ])
})
