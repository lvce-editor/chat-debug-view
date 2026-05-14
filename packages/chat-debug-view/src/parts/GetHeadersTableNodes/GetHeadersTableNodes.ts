import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { HeaderSectionItem } from '../GetVisibleHeaderSections/GetVisibleHeaderSections.ts'
import { ChatDebugViewHeadersTable } from '../ClassNames/ClassNames.ts'
import { getHeaderRowNodes } from '../GetHeaderRowNodes/GetHeaderRowNodes.ts'

export const getHeadersTableNodes = (items: readonly HeaderSectionItem[]): readonly VirtualDomNode[] => {
  const headerRows: VirtualDomNode[] = []
  for (const [index, item] of items.entries()) {
    headerRows.push(...getHeaderRowNodes(item, index))
  }
  return [
    {
      childCount: items.length,
      className: ChatDebugViewHeadersTable,
      type: VirtualDomElements.Ul,
    },
    ...headerRows,
  ]
}
