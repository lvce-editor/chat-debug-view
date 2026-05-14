import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeadersSectionInfo, ChatDebugViewHeadersSection, ChatDebugViewHeadersSectionHeading } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import { getHeadersTableNodes } from '../GetHeadersTableNodes/GetHeadersTableNodes.ts'
import * as InputName from '../InputName/InputName.ts'

export const getHeaderSectionNodes = (
  section: HeaderSectionKey,
  label: string,
  headers: readonly (readonly [string, unknown])[],
  collapsedHeaderSections: readonly HeaderSectionKey[],
  infoMessage: string = '',
): readonly VirtualDomNode[] => {
  const isCollapsed = collapsedHeaderSections.includes(section)
  const hasInfoMessage = !isCollapsed && infoMessage !== ''
  const childCount = isCollapsed ? 1 : 2 + Number(hasInfoMessage)
  return [
    {
      childCount,
      className: ChatDebugViewHeadersSection,
      type: VirtualDomElements.Div,
    },
    {
      ariaExpanded: !isCollapsed,
      childCount: 1,
      className: ChatDebugViewHeadersSectionHeading,
      name: InputName.ToggleHeadersSection,
      onChange: DomEventListenerFunctions.HandleFilterInput,
      onClick: DomEventListenerFunctions.HandleFilterInput,
      type: VirtualDomElements.Button,
      value: section,
    },
    text(label),
    ...(isCollapsed ? [] : getHeadersTableNodes(headers)),
    ...(hasInfoMessage
      ? [
          {
            childCount: 1,
            className: ChatDebugViewHeadersSectionInfo,
            type: VirtualDomElements.Div,
          },
          text(infoMessage),
        ]
      : []),
  ]
}
