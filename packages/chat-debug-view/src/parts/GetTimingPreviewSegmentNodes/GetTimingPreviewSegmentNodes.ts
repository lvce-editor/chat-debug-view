import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimingPreviewSegment } from '../GetTimingPreviewSegments/GetTimingPreviewSegments.ts'
import { ChatDebugViewTimingPreviewSegment, ChatDebugViewTimingPreviewTrackOverlay } from '../ClassNames/ClassNames.ts'

export const getTimingPreviewSegmentNodes = (segments: readonly TimingPreviewSegment[]): readonly VirtualDomNode[] => {
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
