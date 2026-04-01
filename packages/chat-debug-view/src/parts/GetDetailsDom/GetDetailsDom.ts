import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
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
        className: isSelected ? 'ChatDebugViewDetailsTab ChatDebugViewDetailsTabSelected' : 'ChatDebugViewDetailsTab',
        id: getTabId(detailTab),
        name: InputName.DetailTab,
        onChange: DomEventListenerFunctions.HandleSimpleInput,
        onClick: DomEventListenerFunctions.HandleSimpleInput,
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
  selectedEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null = null,
  selectedDetailTab = DetailTab.Response,
): readonly VirtualDomNode[] => {
  if (selectedEventNodes.length === 0) {
    return []
  }
  const contentNodes = selectedDetailTab === DetailTab.Timing && selectedEvent ? getTimingDetailsDom(selectedEvent) : selectedEventNodes
  return [
    {
      childCount: 3,
      className: 'ChatDebugViewDetails',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewDetailsTop',
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Close details',
      childCount: 0,
      className: 'ChatDebugViewDetailsClose',
      name: InputName.CloseDetails,
      onChange: DomEventListenerFunctions.HandleSimpleInput,
      onClick: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      childCount: 1,
      className: 'ChatDebugViewDetailsTitle',
      type: VirtualDomElements.Div,
    },
    text('Details'),
    {
      'aria-label': 'Detail sections',
      childCount: DetailTab.detailTabs.length,
      className: 'ChatDebugViewDetailsTabs',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    ...getTabNodes(selectedDetailTab),
    {
      childCount: 1,
      className: 'ChatDebugViewDetailsBody',
      type: VirtualDomElements.Div,
    },
    {
      'aria-labelledby': getTabId(selectedDetailTab),
      childCount: 1,
      className: 'ChatDebugViewDetailsPanel',
      id: getPanelId(selectedDetailTab),
      role: 'tabpanel',
      type: VirtualDomElements.Div,
    },
    ...contentNodes,
  ]
}
