import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { TextNodeVirtualizationOptions } from '../GetTextNode/GetTextNode.ts'
import { getPayloadContentNodes } from '../GetPayloadContentNodes/GetPayloadContentNodes.ts'
import { getPreviewContentNodes } from '../GetPreviewContentNodes/GetPreviewContentNodes.ts'
import { getResponseContentNodes } from '../GetResponseContentNodes/GetResponseContentNodes.ts'
import { getTokenUsageContentNodes } from '../GetTokenUsageContentNodes/GetTokenUsageContentNodes.ts'
import { getTimingContentNodes } from '../GetTimingContentNodes/GetTimingContentNodes.ts'
import * as InputName from '../InputName/InputName.ts'

export const getSelectedContentNodes = (
  safeSelectedDetailTab: string,
  previewEventNodes: readonly VirtualDomNode[],
  payloadEventNodes: readonly VirtualDomNode[],
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
  previewTextCursorRowIndex: number | null,
  previewTextCursorColumnIndex: number | null,
  previewVirtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  if (safeSelectedDetailTab === InputName.Tokens) {
    return getTokenUsageContentNodes(responseEventNodes, selectedEvent)
  }
  if (safeSelectedDetailTab === InputName.Timing) {
    return getTimingContentNodes(responseEventNodes, selectedEvent)
  }
  if (safeSelectedDetailTab === InputName.Preview) {
    return getPreviewContentNodes(previewEventNodes, selectedEvent, previewTextCursorRowIndex, previewTextCursorColumnIndex, previewVirtualization)
  }
  if (safeSelectedDetailTab === InputName.Payload) {
    return getPayloadContentNodes(payloadEventNodes, selectedEvent)
  }
  return getResponseContentNodes(responseEventNodes, selectedEvent)
}
