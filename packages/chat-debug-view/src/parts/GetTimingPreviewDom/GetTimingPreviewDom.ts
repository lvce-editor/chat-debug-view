import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
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

const timingPreviewNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewTimingPreview,
  type: VirtualDomElements.Div,
}

const timingPreviewTrackNode: VirtualDomNode = {
  childCount: 4,
  className: ChatDebugViewTimingPreviewTrack,
  type: VirtualDomElements.Div,
}

const timingPreviewRailNode: VirtualDomNode = {
  childCount: 0,
  className: ChatDebugViewTimingPreviewRail,
  type: VirtualDomElements.Div,
}

const timingPreviewMarkerStartNode: VirtualDomNode = {
  childCount: 0,
  className: mergeClassNames(ChatDebugViewTimingPreviewMarker, ChatDebugViewTimingPreviewMarkerStart),
  style: 'left:12px;',
  type: VirtualDomElements.Div,
}

const timingPreviewMarkerEndNode: VirtualDomNode = {
  childCount: 0,
  className: mergeClassNames(ChatDebugViewTimingPreviewMarker, ChatDebugViewTimingPreviewMarkerEnd),
  style: 'right:12px;',
  type: VirtualDomElements.Div,
}

export const getTimingPreviewDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const segments = getTimingPreviewSegments(event)
  return [
    timingPreviewNode,
    timingPreviewTrackNode,
    timingPreviewRailNode,
    ...getTimingPreviewSegmentNodes(segments),
    timingPreviewMarkerStartNode,
    timingPreviewMarkerEndNode,
  ]
}
