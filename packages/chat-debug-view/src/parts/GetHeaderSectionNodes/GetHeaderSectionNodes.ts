import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { VisibleHeaderSection } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import { ChatDebugViewHeadersSectionInfo, ChatDebugViewHeadersSection, ChatDebugViewHeadersSectionHeading } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeadersTableNodes } from '../GetHeadersTableNodes/GetHeadersTableNodes.ts'
import * as HeaderSectionKey from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as InputName from '../InputName/InputName.ts'

const accessControlExposeHeadersText = 'Access-Control-Expose-Headers'
const accessControlExposeHeadersUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers'

const getInfoNodes = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  if (section.key !== HeaderSectionKey.ResponseHeaders) {
    return [text(section.info)]
  }
  const linkIndex = section.info.indexOf(accessControlExposeHeadersText)
  if (linkIndex === -1) {
    return [text(section.info)]
  }
  const infoNodes: VirtualDomNode[] = []
  const prefix = section.info.slice(0, linkIndex)
  const suffix = section.info.slice(linkIndex + accessControlExposeHeadersText.length)
  if (prefix) {
    infoNodes.push(text(prefix))
  }
  infoNodes.push({
    childCount: 1,
    href: accessControlExposeHeadersUrl,
    rel: 'noopener noreferrer',
    target: '_blank',
    type: VirtualDomElements.A,
  })
  infoNodes.push(text(accessControlExposeHeadersText))
  if (suffix) {
    infoNodes.push(text(suffix))
  }
  return infoNodes
}

export const getHeaderSectionNodes = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  const hasInfoMessage = section.isExpanded && section.info !== ''
  const childCount = section.isExpanded ? 2 + Number(hasInfoMessage) : 1
  const infoNodes = hasInfoMessage ? getInfoNodes(section) : []
  return [
    {
      childCount,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Div,
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
    ...(section.isExpanded ? getHeadersTableNodes(section.items) : []),
    ...(hasInfoMessage
      ? [
          {
            childCount: infoNodes.length,
            className: ChatDebugViewHeadersSectionInfo,
            type: VirtualDomElements.Div,
          },
          ...infoNodes,
        ]
      : []),
  ]
}
