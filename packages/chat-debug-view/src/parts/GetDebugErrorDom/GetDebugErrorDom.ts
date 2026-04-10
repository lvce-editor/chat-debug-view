import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugView, ChatDebugViewError } from '../ClassNames/ClassNames.ts'

const debugErrorRootNode = {
  childCount: 1,
  className: ChatDebugView,
  type: VirtualDomElements.Div,
}

const debugErrorMessageNode = {
  childCount: 1,
  className: ChatDebugViewError,
  type: VirtualDomElements.Div,
}

export const getDebugErrorDom = (errorMessage: string): readonly VirtualDomNode[] => {
  return [debugErrorRootNode, debugErrorMessageNode, text(errorMessage)]
}
