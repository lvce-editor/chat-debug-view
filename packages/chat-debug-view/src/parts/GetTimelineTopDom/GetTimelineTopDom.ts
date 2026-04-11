import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { ChatDebugViewTimelineSummary, ChatDebugViewTimelineTop } from '../ClassNames/ClassNames.ts'
import { getTimelineSummary } from '../GetTimelineSummary/GetTimelineSummary.ts'

export const getTimelineTopDom = (timelineInfo: TimelineInfo): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewTimelineTop,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimelineSummary,
      type: VirtualDomElements.H2,
    },
    text(getTimelineSummary(timelineInfo)),
  ]
}
