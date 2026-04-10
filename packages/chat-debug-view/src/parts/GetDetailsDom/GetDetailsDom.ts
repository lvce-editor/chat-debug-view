import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import {
  ChatDebugViewDetails,
  ChatDebugViewDetailsBottom,
  ChatDebugViewDetailsClose,
  ChatDebugViewDetailsTabs,
  ChatDebugViewDetailsTop,
} from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'
import { getTabId } from '../GetTabId/GetTabId.ts'
import { getTabNodes } from '../GetTabNodes/GetTabNodes.ts'
import { getTimingDetailsDom } from '../GetTimingDetailsDom/GetTimingDetailsDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getDetailsDom = (
  previewEventNodes: readonly VirtualDomNode[],
  responseEventNodes: readonly VirtualDomNode[] = previewEventNodes,
  selectedEvent: ChatViewEvent | null = null,
  selectedDetailTab = DetailTab.Response,
): readonly VirtualDomNode[] => {
  if (previewEventNodes.length === 0 && responseEventNodes.length === 0) {
    return []
  }
  const contentNodes =
    selectedDetailTab === DetailTab.Timing && selectedEvent
      ? getTimingDetailsDom(selectedEvent)
      : selectedDetailTab === DetailTab.Preview
        ? previewEventNodes
        : responseEventNodes
  return [
    {
      childCount: 2,
      className: ChatDebugViewDetails,
      type: VirtualDomElements.Section,
    },
    {
      childCount: 2,
      className: ChatDebugViewDetailsTop,
      onContextMenu: DomEventListenerFunctions.HandleDetailsTopContextMenu,
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': ChatDebugStrings.closeDetails(),
      childCount: 0,
      className: ChatDebugViewDetailsClose,
      name: InputName.CloseDetails,
      onChange: DomEventListenerFunctions.HandleCloseDetails,
      onClick: DomEventListenerFunctions.HandleCloseDetails,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      'aria-label': ChatDebugStrings.detailSections(),
      childCount: DetailTab.detailTabs.length,
      className: ChatDebugViewDetailsTabs,
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    ...getTabNodes(selectedDetailTab),
    {
      'aria-labelledby': getTabId(selectedDetailTab),
      childCount: 1,
      className: ChatDebugViewDetailsBottom,
      id: getPanelId(selectedDetailTab),
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    ...contentNodes,
  ]
}
