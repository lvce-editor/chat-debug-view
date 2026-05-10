import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { DetailTab as DetailTabType } from '../DetailTab/DetailTab.ts'
import type { TextNodeVirtualizationOptions } from '../GetTextNode/GetTextNode.ts'
import { ChatDebugViewDetails } from '../ClassNames/ClassNames.ts'
import { createDetailTabs } from '../CreateDetailTabs/CreateDetailTabs.ts'
import { getDetailContentDom } from '../GetDetailContentDom/GetDetailContentDom.ts'
import { getNormalizedDetailTabs } from '../GetNormalizedDetailTabs/GetNormalizedDetailTabs.ts'
import { getDetailsTopVirtualDom } from '../GetDetailsTopVirtualDom/GetDetailsTopVirtualDom.ts'
import { getSelectedContentNodes } from '../GetSelectedContentNodes/GetSelectedContentNodes.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'

export const getDetailsDom = (
  previewEventNodes: readonly VirtualDomNode[],
  payloadEventNodes: readonly VirtualDomNode[] = previewEventNodes,
  responseEventNodes: readonly VirtualDomNode[] = payloadEventNodes,
  selectedEvent: ChatViewEvent | null = null,
  detailTabs: readonly DetailTabType[] = createDetailTabs(),
  previewTextCursorRowIndex: number | null = null,
  previewTextCursorColumnIndex: number | null = null,
  previewVirtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  if (previewEventNodes.length === 0 && payloadEventNodes.length === 0 && responseEventNodes.length === 0) {
    return []
  }
  const normalizedDetailTabs = getNormalizedDetailTabs(selectedEvent, detailTabs)
  const safeSelectedDetailTab = getSelectedDetailTab(normalizedDetailTabs)
  const selectedDetailTab = normalizedDetailTabs.find((detailTab) => detailTab.name === safeSelectedDetailTab) ?? normalizedDetailTabs[0]
  const contentNodes = getSelectedContentNodes(
    safeSelectedDetailTab,
    previewEventNodes,
    payloadEventNodes,
    responseEventNodes,
    selectedEvent,
    previewTextCursorRowIndex,
    previewTextCursorColumnIndex,
    previewVirtualization,
  )

  return [
    {
      childCount: 2,
      className: ChatDebugViewDetails,
      type: VirtualDomElements.Section,
    },
    ...getDetailsTopVirtualDom(normalizedDetailTabs),
    ...getDetailContentDom(selectedDetailTab, safeSelectedDetailTab, contentNodes),
  ]
}
