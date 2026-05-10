import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import { ChatDebugViewDetailsTop } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDetailsCloseButtonDom } from '../GetDetailsCloseButtonDom/GetDetailsCloseButtonDom.ts'
import { getTabNodes } from '../GetTabNodes/GetTabNodes.ts'

export const getDetailsTopVirtualDom = (detailTabs: readonly DetailTab[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewDetailsTop,
      onContextMenu: DomEventListenerFunctions.HandleDetailsTopContextMenu,
      type: VirtualDomElements.Div,
    },
    ...getDetailsCloseButtonDom(),
    ...getTabNodes(detailTabs),
  ]
}
