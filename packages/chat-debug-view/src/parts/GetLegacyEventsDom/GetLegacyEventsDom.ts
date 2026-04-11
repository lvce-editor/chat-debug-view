import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewEmpty, ChatDebugViewError, ChatDebugViewEvents } from '../ClassNames/ClassNames.ts'

export const getLegacyEventsDom = (errorMessage: string, emptyMessage: string, eventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventNodes.length === 0 ? 1 : eventNodes.length,
      className: ChatDebugViewEvents,
      role: 'application',
      type: VirtualDomElements.Div,
    },
    ...(eventNodes.length === 0
      ? [
          {
            childCount: 1,
            className: errorMessage ? ChatDebugViewError : ChatDebugViewEmpty,
            type: VirtualDomElements.Div,
          },
          text(errorMessage || emptyMessage),
        ]
      : eventNodes),
  ]
}
