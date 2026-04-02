import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugView, ChatDebugViewError } from '../ClassNames/ClassNames.ts'

export const getDebugErrorDom = (errorMessage: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugView,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewError,
      type: VirtualDomElements.Div,
    },
    text(errorMessage),
  ]
}
