import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewTiming, ChatDebugViewTimingLabel, ChatDebugViewTimingRow, ChatDebugViewTimingValue } from '../ClassNames/ClassNames.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEndText } from '../GetEndText/GetEndText.ts'
import { getStartText } from '../GetStartText/GetStartText.ts'

const getTimingRowDom = (label: string, value: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ChatDebugViewTimingRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewTimingLabel,
      type: VirtualDomElements.Span,
    },
    text(label),
    {
      childCount: 1,
      className: ChatDebugViewTimingValue,
      type: VirtualDomElements.Span,
    },
    text(value),
  ]
}

export const getTimingDetailsDom = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 3,
      className: ChatDebugViewTiming,
      type: VirtualDomElements.Div,
    },
    ...getTimingRowDom(ChatDebugStrings.started(), getStartText(event)),
    ...getTimingRowDom(ChatDebugStrings.ended(), getEndText(event)),
    ...getTimingRowDom(ChatDebugStrings.duration(), getDurationText(event)),
  ]
}
