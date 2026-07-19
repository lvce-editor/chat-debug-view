import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeadersSectionInfo } from '../ClassNames/ClassNames.ts'

const infoNodesWithTextNode: VirtualDomNode = {
  childCount: 1,
  className: ChatDebugViewHeadersSectionInfo,
  type: VirtualDomElements.Div,
}

export const getInfoNodesWithText = (info: string): readonly VirtualDomNode[] => {
  return [infoNodesWithTextNode, text(info)]
}
