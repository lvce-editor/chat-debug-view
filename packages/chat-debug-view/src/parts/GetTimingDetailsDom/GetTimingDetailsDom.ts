import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { getDurationText } from '../GetDurationText/GetDurationText.ts'
import { getEndText } from '../GetEndText/GetEndText.ts'
import { getStartText } from '../GetStartText/GetStartText.ts'
import { ChatDebugViewTiming } from '../ClassNames/ClassNames.ts'
import { getTimingRowDom } from '../GetTimingRowDom/GetTimingRowDom.ts'

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
