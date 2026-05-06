import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDirectChildCount } from '../GetDirectChildCount/GetDirectChildCount.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'
import { ChatDebugViewDetailsBottom } from '../ClassNames/ClassNames.ts'

export const getDetailContentDom = (
  selectedDetailTab: DetailTabType,
  safeSelectedDetailTab: DetailTabType['name'],
  contentNodes: readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [
    {
      'aria-label': selectedDetailTab.label,
      childCount: getDirectChildCount(contentNodes),
      className: ChatDebugViewDetailsBottom,
      id: getPanelId(safeSelectedDetailTab),
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    ...contentNodes,
  ]
}
