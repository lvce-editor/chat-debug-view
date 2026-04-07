import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewDetails,
  ChatDebugViewDetailsBody,
  ChatDebugViewDetailsClose,
  ChatDebugViewDetailsPanel,
  ChatDebugViewDetailsTab,
  ChatDebugViewDetailsTabSelected,
  ChatDebugViewDetailsTabs,
  ChatDebugViewDetailsTop,
  joinClassNames,
} from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTimingDetailsDom } from '../GetTimingDetailsDom/GetTimingDetailsDom.ts'
import * as InputName from '../InputName/InputName.ts'

const getTabId = (detailTab: string): string => {
  return `ChatDebugViewDetailsTab-${detailTab}`
}

const getPanelId = (detailTab: string): string => {
  return `ChatDebugViewDetailsPanel-${detailTab}`
}

const getTabNodes = (selectedDetailTab: string): readonly VirtualDomNode[] => {
  return DetailTab.detailTabs.flatMap((detailTab) => {
    const isSelected = detailTab === selectedDetailTab
    return [
      {
        'aria-controls': getPanelId(detailTab),
        'aria-selected': isSelected,
        childCount: 1,
        className: joinClassNames(ChatDebugViewDetailsTab, isSelected && ChatDebugViewDetailsTabSelected),
        id: getTabId(detailTab),
        name: InputName.DetailTab,
        onChange: DomEventListenerFunctions.HandleDetailTab,
        onClick: DomEventListenerFunctions.HandleDetailTab,
        role: 'tab',
        tabIndex: isSelected ? 0 : -1,
        type: VirtualDomElements.Button,
        value: detailTab,
      },
      text(DetailTab.getDetailTabLabel(detailTab)),
    ]
  })
}

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
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ChatDebugViewDetailsTop,
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Close details',
      childCount: 0,
      className: ChatDebugViewDetailsClose,
      name: InputName.CloseDetails,
      onChange: DomEventListenerFunctions.HandleCloseDetails,
      onClick: DomEventListenerFunctions.HandleCloseDetails,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      'aria-label': 'Detail sections',
      childCount: DetailTab.detailTabs.length,
      className: ChatDebugViewDetailsTabs,
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    ...getTabNodes(selectedDetailTab),
    {
      childCount: 1,
      className: ChatDebugViewDetailsBody,
      role: 'document',
      type: VirtualDomElements.Div,
    },
    {
      'aria-labelledby': getTabId(selectedDetailTab),
      childCount: 1,
      className: ChatDebugViewDetailsPanel,
      id: getPanelId(selectedDetailTab),
      onContextMenu: DomEventListenerFunctions.HandleDetailsContextMenu,
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    ...contentNodes,
  ]
}
