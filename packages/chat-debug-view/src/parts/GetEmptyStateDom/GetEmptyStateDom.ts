import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEmpty } from '../ClassNames/ClassNames.ts'

export const getEmptyStateDom = (emptyMessage: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewEmpty,
      type: VirtualDomElements.Div,
    },
    text(emptyMessage),
  ]
}
