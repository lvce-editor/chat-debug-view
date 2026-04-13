import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import { ChatDebugViewDetails, ChatDebugViewDetailsBottom, ChatDebugViewDetailsTop } from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getDetailsCloseButtonDom } from '../GetDetailsCloseButtonDom/GetDetailsCloseButtonDom.ts'
import { getEventNode } from '../GetEventNode/GetEventNode.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getPreviewEvent } from '../GetPreviewEvent/GetPreviewEvent.ts'
import { getPreviewEventNodes } from '../GetPreviewEventNodes/GetPreviewEventNodes.ts'
import { getTabNodes } from '../GetTabNodes/GetTabNodes.ts'
import { getTimingDetailsDom } from '../GetTimingDetailsDom/GetTimingDetailsDom.ts'
import * as InputName from '../InputName/InputName.ts'

const getNextSiblingIndex = (nodes: readonly VirtualDomNode[], index: number): number => {
  let nextSiblingIndex = index + 1
  const childCount = nodes[index]?.childCount || 0
  for (let i = 0; i < childCount; i++) {
    nextSiblingIndex = getNextSiblingIndex(nodes, nextSiblingIndex)
  }
  return nextSiblingIndex
}

const getDirectChildCount = (nodes: readonly VirtualDomNode[]): number => {
  let count = 0
  let index = 0
  while (index < nodes.length) {
    count++
    index = getNextSiblingIndex(nodes, index)
  }
  return count
}

const getNormalizedDetailTabs = (selectedEvent: ChatViewEvent | null, detailTabs: readonly DetailTabType[]): readonly DetailTabType[] => {
  if (selectedEvent === null) {
    return detailTabs
  }
  return DetailTab.createDetailTabs(DetailTab.getSelectedDetailTab(detailTabs), selectedEvent)
}

export const getDetailsDom = (
  previewEventNodes: readonly VirtualDomNode[],
  payloadEventNodes: readonly VirtualDomNode[] = previewEventNodes,
  responseEventNodes: readonly VirtualDomNode[] = payloadEventNodes,
  selectedEvent: ChatViewEvent | null = null,
  detailTabs: readonly DetailTabType[] = DetailTab.createDetailTabs(),
  previewTextCursorRowIndex: number | null = null,
  previewTextCursorColumnIndex: number | null = null,
): readonly VirtualDomNode[] => {
  if (previewEventNodes.length === 0 && payloadEventNodes.length === 0 && responseEventNodes.length === 0) {
    return []
  }
  const normalizedDetailTabs = getNormalizedDetailTabs(selectedEvent, detailTabs)
  const safeSelectedDetailTab = DetailTab.getSelectedDetailTab(normalizedDetailTabs)
  const selectedDetailTab = normalizedDetailTabs.find((detailTab) => detailTab.name === safeSelectedDetailTab) ?? normalizedDetailTabs[0]

  const getDetailContentDom = (): readonly VirtualDomNode[] => {
    const getDetailContentDomTiming = (): readonly VirtualDomNode[] => {
      if (selectedEvent === null) {
        return responseEventNodes
      }
      return getTimingDetailsDom(selectedEvent)
    }

    const getDetailContentDomPreview = (): readonly VirtualDomNode[] => {
      if (previewEventNodes.length > 0) {
        return previewEventNodes
      }
      if (selectedEvent === null) {
        return []
      }
      return getPreviewEventNodes(
        getPreviewEvent(selectedEvent),
        selectedEvent,
        previewTextCursorRowIndex === null || previewTextCursorColumnIndex === null
          ? null
          : {
              columnIndex: previewTextCursorColumnIndex,
              rowIndex: previewTextCursorRowIndex,
            },
      )
    }

    const getDetailContentDomPayload = (): readonly VirtualDomNode[] => {
      if (payloadEventNodes.length > 0) {
        return payloadEventNodes
      }
      if (selectedEvent === null) {
        return []
      }
      return getEventNode(getPayloadEvent(selectedEvent))
    }

    const getDetailContentDomResponse = (): readonly VirtualDomNode[] => {
      if (responseEventNodes.length > 0) {
        return responseEventNodes
      }
      if (selectedEvent === null) {
        return []
      }
      return getEventNode(selectedEvent)
    }

    const contentNodes =
      safeSelectedDetailTab === InputName.Timing
        ? getDetailContentDomTiming()
        : safeSelectedDetailTab === InputName.Preview
          ? getDetailContentDomPreview()
          : safeSelectedDetailTab === InputName.Payload
            ? getDetailContentDomPayload()
            : getDetailContentDomResponse()

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
    ...getDetailsCloseButtonDom(),
    ...getTabNodes(normalizedDetailTabs),
    ...getDetailContentDom(),
  ]
}
