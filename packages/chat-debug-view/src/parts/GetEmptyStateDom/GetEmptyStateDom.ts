import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEmpty } from '../ClassNames/ClassNames.ts'

const emptyStateNode = {
  childCount: 1,
  className: ChatDebugViewEmpty,
  type: VirtualDomElements.Div,
}

export const getEmptyStateDom = (emptyMessage: string): readonly VirtualDomNode[] => {
  return [emptyStateNode, text(emptyMessage)]
}
