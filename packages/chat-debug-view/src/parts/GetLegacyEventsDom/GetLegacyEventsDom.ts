import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'

export const getLegacyEventsDom = (errorMessage: string, emptyMessage: string, eventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventNodes.length === 0 ? 1 : eventNodes.length,
      className: 'ChatDebugViewEvents',
      role: 'application',
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...(eventNodes.length === 0
      ? [
          {
            childCount: 1,
            className: errorMessage ? 'ChatDebugViewError' : 'ChatDebugViewEmpty',
            type: VirtualDomElements.Div,
          },
          text(errorMessage || emptyMessage),
        ]
      : eventNodes),
  ]
}
