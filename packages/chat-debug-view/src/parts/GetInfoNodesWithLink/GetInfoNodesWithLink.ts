import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeadersSectionInfo, ExternalLink } from '../ClassNames/ClassNames.ts'

export const accessControlExposeHeadersText = 'Access-Control-Expose-Headers'

const accessControlExposeHeadersUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers'

export const getInfoNodesWithLink = (info: string): readonly VirtualDomNode[] => {
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
      className: ExternalLink,
      href: accessControlExposeHeadersUrl,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text(accessControlExposeHeadersText),
    text(suffix),
  ]
}
