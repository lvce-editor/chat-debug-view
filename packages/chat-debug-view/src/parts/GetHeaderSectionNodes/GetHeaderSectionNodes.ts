import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { VisibleHeaderSection } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import { ChatDebugViewHeadersSection, ChatDebugViewHeadersSectionHeading } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeadersInfoSectionDom } from '../GetHeadersInfoSectionDom/GetHeadersInfoSectionDom.ts'
import { getHeadersTableNodes } from '../GetHeadersTableNodes/GetHeadersTableNodes.ts'
import * as InputName from '../InputName/InputName.ts'

const getExpandedSectionNodes = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  if (!section.isExpanded) {
    return []
  }
  return getHeadersTableNodes(section.items)
}

export const getHeaderSectionNodes = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  const hasInfoMessage = section.isExpanded && section.info !== ''
  const childCount = section.isExpanded ? 2 + Number(hasInfoMessage) : 1
  const infoNodes = getHeadersInfoSectionDom(section)
  const expandedSectionNodes = getExpandedSectionNodes(section)
  return [
    {
      childCount,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Section,
    },
    {
      ariaExpanded: section.isExpanded,
      childCount: 1,
      className: ChatDebugViewHeadersSectionHeading,
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: section.key,
    },
    text(section.heading),
    ...expandedSectionNodes,
    ...infoNodes,
  ]
}
