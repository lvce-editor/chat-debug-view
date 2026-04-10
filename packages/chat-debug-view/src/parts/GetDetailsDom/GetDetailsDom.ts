import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
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

const getContentNode = (
  previewEventNodes: readonly VirtualDomNode[],
  payloadEventNodes: readonly VirtualDomNode[],
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
  detailTabs: readonly DetailTabType[],
): {
  readonly contentNodes: readonly VirtualDomNode[]
  readonly safeSelectedDetailTab: string
} => {
  const safeSelectedDetailTab = DetailTab.getSelectedDetailTab(detailTabs)
  const contentNodes =
    safeSelectedDetailTab === InputName.Timing && selectedEvent
      ? getTimingDetailsDom(selectedEvent)
      : safeSelectedDetailTab === InputName.Preview
        ? previewEventNodes
        : safeSelectedDetailTab === InputName.Payload
          ? payloadEventNodes
          : responseEventNodes
  return {
    contentNodes,
    safeSelectedDetailTab,
  }
}

export const getDetailsDom = (
  previewEventNodes: readonly VirtualDomNode[],
  payloadEventNodes: readonly VirtualDomNode[] = previewEventNodes,
  responseEventNodes: readonly VirtualDomNode[] = payloadEventNodes,
  selectedEvent: ChatViewEvent | null = null,
  detailTabs: readonly DetailTabType[] = DetailTab.createDetailTabs(),
): readonly VirtualDomNode[] => {
  if (previewEventNodes.length === 0 && payloadEventNodes.length === 0 && responseEventNodes.length === 0) {
    return []
  }
  const { contentNodes, safeSelectedDetailTab } = getContentNode(previewEventNodes, payloadEventNodes, responseEventNodes, selectedEvent, detailTabs)
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
      childCount: detailTabs.length,
      className: ChatDebugViewDetailsTabs,
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    ...getTabNodes(detailTabs),
    {
      'aria-labelledby': getTabId(safeSelectedDetailTab),
      childCount: 1,
      className: ChatDebugViewDetailsBottom,
      id: getPanelId(safeSelectedDetailTab),
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    ...contentNodes,
  ]
}
