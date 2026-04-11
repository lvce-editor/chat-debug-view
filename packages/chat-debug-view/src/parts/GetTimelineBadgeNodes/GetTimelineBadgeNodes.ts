import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimelineBadge, ChatDebugViewTimelineBadges } from '../ClassNames/ClassNames.ts'
import { formatTimelineSeconds } from '../FormatTimelineSeconds/FormatTimelineSeconds.ts'
import type { TimelineInfo } from '../GetTimelineInfo/GetTimelineInfo.ts'
import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

const getTimelineBadgeValues = (durationSeconds: number): readonly number[] => {
  if (durationSeconds <= 0) {
    return [0]
  }
  const segmentCount = durationSeconds < 1 ? 2 : Math.min(5, Math.max(1, Math.ceil(durationSeconds)))
  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    if (index === segmentCount) {
      return durationSeconds
    }
    return roundSeconds((durationSeconds / segmentCount) * index)
  })
}

const getTimelineBadgeStyle = (index: number, lastIndex: number): string => {
  if (index === 0 || lastIndex === 0) {
    return 'left:0;transform:translateX(0);'
  }
  if (index === lastIndex) {
    return 'left:100%;transform:translateX(-100%);'
  }
  return `left:${roundSeconds((index / lastIndex) * 100)}%;transform:translateX(-50%);`
}

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
      text(formatTimelineSeconds(value)),
    ]),
  ]
}