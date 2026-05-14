import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import { getHeaderSectionNodes } from '../GetHeaderSectionNodes/GetHeaderSectionNodes.ts'
import { getVisibleHeaderSections } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'

export const getHeadersContentNodes = (
  responseEventNodes: readonly VirtualDomNode[],
  selectedEvent: ChatViewEvent | null,
  collapsedHeaderSections: readonly HeaderSectionKey[] = [],
): readonly VirtualDomNode[] => {
  const sections = getVisibleHeaderSections(selectedEvent, collapsedHeaderSections)
  if (sections.length === 0) {
    return responseEventNodes
  }
  const nodes: VirtualDomNode[] = []
  for (const section of sections) {
    nodes.push(...getHeaderSectionNodes(section))
  }
  return nodes
}
