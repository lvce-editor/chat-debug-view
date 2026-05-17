import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { ChatDebugViewTimelineBadge, ChatDebugViewTimelineBadges } from '../ClassNames/ClassNames.ts'
import { formatTimelineMilliseconds } from '../FormatTimelineMilliseconds/FormatTimelineMilliseconds.ts'
import { getTimelineBadgeStyle } from '../GetTimelineBadgeStyle/GetTimelineBadgeStyle.ts'
import { getTimelineBadgeValues } from '../GetTimelineBadgeValues/GetTimelineBadgeValues.ts'

export const getTimelineBadgeNodes = (timelineInfo: TimelineInfo): readonly VirtualDomNode[] => {
  const badgeValues = getTimelineBadgeValues(timelineInfo.durationSeconds)
  const lastIndex = badgeValues.length - 1
  return [
    {
      childCount: badgeValues.length,
      className: ChatDebugViewTimelineBadges,
      type: VirtualDomElements.Div,
    },
    ...badgeValues.flatMap((value, index) => [
      {
        childCount: 1,
        className: ChatDebugViewTimelineBadge,
        style: getTimelineBadgeStyle(index, lastIndex),
        type: VirtualDomElements.Span,
      },
      text(formatTimelineMilliseconds(value)),
    ]),
  ]
}
