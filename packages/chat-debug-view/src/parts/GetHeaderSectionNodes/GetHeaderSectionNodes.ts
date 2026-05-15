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

const getInfoNodesWithText = (info: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewHeadersSectionInfo,
      type: VirtualDomElements.Div,
    },
    text(info),
  ]
}

const getInfoNodesWithLink = (info: string): readonly VirtualDomNode[] => {
  const linkIndex = info.indexOf(accessControlExposeHeadersText)
  const prefix = info.slice(0, linkIndex)
  const suffix = info.slice(linkIndex + accessControlExposeHeadersText.length)

  return [
    {
      childCount: 3,
      className: ChatDebugViewHeadersSectionInfo,
      type: VirtualDomElements.Div,
    },
    text(prefix),
    {
      childCount: 1,
      href: accessControlExposeHeadersUrl,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text(accessControlExposeHeadersText),
    text(suffix),
  ]
}

const getHeadersInfoSectionDom = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  if (!section.isExpanded || section.info === '') {
    return []
  }
  if (section.key !== HeaderSectionKey.ResponseHeaders) {
    return getInfoNodesWithText(section.info)
  }
  const linkIndex = section.info.indexOf(accessControlExposeHeadersText)
  if (linkIndex === -1) {
    return getInfoNodesWithText(section.info)
  }
  return getInfoNodesWithLink(section.info)
}

export const getHeaderSectionNodes = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
  const hasInfoMessage = section.isExpanded && section.info !== ''
  const childCount = section.isExpanded ? 2 + Number(hasInfoMessage) : 1
  const infoNodes = getHeadersInfoSectionDom(section)
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
    ...infoNodes,
  ]
}
