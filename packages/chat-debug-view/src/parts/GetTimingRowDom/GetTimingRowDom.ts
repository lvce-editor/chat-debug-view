import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimingLabel, ChatDebugViewTimingRow, ChatDebugViewTimingValue } from '../ClassNames/ClassNames.ts'

const timingRowNode = {
  childCount: 2,
  className: ChatDebugViewTimingRow,
  type: VirtualDomElements.Div,
}

const timingLabelNode = {
  childCount: 1,
  className: ChatDebugViewTimingLabel,
  type: VirtualDomElements.Span,
}

const timingValueNode = {
  childCount: 1,
  className: ChatDebugViewTimingValue,
  type: VirtualDomElements.Span,
}

export const getTimingRowDom = (label: string, value: string): readonly VirtualDomNode[] => {
  return [timingRowNode, timingLabelNode, text(label), timingValueNode, text(value)]
}
