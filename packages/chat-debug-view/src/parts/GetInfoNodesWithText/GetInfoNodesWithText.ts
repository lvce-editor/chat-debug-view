import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeadersSectionInfo } from '../ClassNames/ClassNames.ts'

export const getInfoNodesWithText = (info: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewHeadersSectionInfo,
      type: VirtualDomElements.Div,
    },
    text(info),
  ]
}
