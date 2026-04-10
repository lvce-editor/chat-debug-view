import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimingLabel, ChatDebugViewTimingRow, ChatDebugViewTimingValue } from '../ClassNames/ClassNames.ts'

export const getTimingRowDom = (label: string, value: string): readonly VirtualDomNode[] => {
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
