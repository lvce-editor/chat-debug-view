import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewTimingPreview,
  ChatDebugViewTimingPreviewMarker,
  ChatDebugViewTimingPreviewMarkerEnd,
  ChatDebugViewTimingPreviewMarkerStart,
  ChatDebugViewTimingPreviewRail,
  ChatDebugViewTimingPreviewTrack,
} from '../ClassNames/ClassNames.ts'
import { getTimingPreviewSegmentNodes } from '../GetTimingPreviewSegmentNodes/GetTimingPreviewSegmentNodes.ts'
import { getTimingPreviewSegments } from '../GetTimingPreviewSegments/GetTimingPreviewSegments.ts'

export const getTimingPreviewDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const segments = getTimingPreviewSegments(event)
  return [
    {
      childCount: 1,
      className: ChatDebugViewTimingPreview,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 4,
      className: ChatDebugViewTimingPreviewTrack,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ChatDebugViewTimingPreviewRail,
      type: VirtualDomElements.Div,
    },
    ...getTimingPreviewSegmentNodes(segments),
    {
      childCount: 0,
      className: `${ChatDebugViewTimingPreviewMarker} ${ChatDebugViewTimingPreviewMarkerStart}`,
      style: 'left:12px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ChatDebugViewTimingPreviewMarker} ${ChatDebugViewTimingPreviewMarkerEnd}`,
      style: 'right:12px;',
      type: VirtualDomElements.Div,
    },
  ]
}
