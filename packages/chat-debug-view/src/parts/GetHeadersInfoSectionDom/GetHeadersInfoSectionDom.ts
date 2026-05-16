import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleHeaderSection } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import { getInfoNodesWithLink, accessControlExposeHeadersText } from '../GetInfoNodesWithLink/GetInfoNodesWithLink.ts'
import { getInfoNodesWithText } from '../GetInfoNodesWithText/GetInfoNodesWithText.ts'
import * as HeaderSectionKey from '../HeaderSectionKey/HeaderSectionKey.ts'

export const getHeadersInfoSectionDom = (section: VisibleHeaderSection): readonly VirtualDomNode[] => {
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
