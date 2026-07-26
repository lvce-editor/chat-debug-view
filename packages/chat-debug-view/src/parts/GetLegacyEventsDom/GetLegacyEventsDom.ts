import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewEmpty, ChatDebugViewError, ChatDebugViewEvents } from '../ClassNames/ClassNames.ts'

const getEventContentNodes = (errorMessage: string, emptyMessage: string, eventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  if (eventNodes.length > 0) {
    return eventNodes
  }
  return [
    {
      childCount: 1,
      className: errorMessage ? ChatDebugViewError : ChatDebugViewEmpty,
      type: VirtualDomElements.Div,
    },
    text(errorMessage || emptyMessage),
  ]
}

export const getLegacyEventsDom = (errorMessage: string, emptyMessage: string, eventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  const eventContentNodes = getEventContentNodes(errorMessage, emptyMessage, eventNodes)
  return [
    {
      childCount: eventNodes.length === 0 ? 1 : eventNodes.length,
      className: ChatDebugViewEvents,
      role: AriaRoles.Application,
      type: VirtualDomElements.Div,
    },
    ...eventContentNodes,
  ]
}
