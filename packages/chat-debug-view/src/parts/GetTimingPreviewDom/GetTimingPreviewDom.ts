import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import {
  ChatDebugViewTimingPreview,
  ChatDebugViewTimingPreviewMarker,
  ChatDebugViewTimingPreviewMarkerEnd,
  ChatDebugViewTimingPreviewMarkerStart,
  ChatDebugViewTimingPreviewRail,
  ChatDebugViewTimingPreviewSegment,
  ChatDebugViewTimingPreviewTrack,
  ChatDebugViewTimingPreviewTrackOverlay,
} from '../ClassNames/ClassNames.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'

interface TimingPreviewSegment {
  readonly endPercent: number
  readonly label: string
  readonly startPercent: number
}

const getTimingPreviewSegments = (event: ChatViewEvent): readonly TimingPreviewSegment[] => {
  return [
    {
      endPercent: 100,
      label: getDurationText(event),
      startPercent: 0,
    },
  ]
}

const getTimingPreviewSegmentNodes = (segments: readonly TimingPreviewSegment[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: segments.length,
      className: ChatDebugViewTimingPreviewTrackOverlay,
      type: VirtualDomElements.Div,
    },
    ...segments.flatMap((segment) => {
      const widthPercent = Math.max(0, segment.endPercent - segment.startPercent)
      return [
        {
          childCount: 1,
          className: ChatDebugViewTimingPreviewSegment,
          style: `left:${segment.startPercent}%;width:${widthPercent}%;min-width:2px;`,
          type: VirtualDomElements.Div,
        },
        text(segment.label),
      ]
    }),
  ]
}

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
