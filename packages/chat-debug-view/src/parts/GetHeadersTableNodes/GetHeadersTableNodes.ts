import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeadersTable } from '../ClassNames/ClassNames.ts'
import { getHeaderRowNodes } from '../GetHeaderRowNodes/GetHeaderRowNodes.ts'

export const getHeadersTableNodes = (headers: readonly (readonly [string, unknown])[]): readonly VirtualDomNode[] => {
  const headerRows: VirtualDomNode[] = []
  for (const [index, [headerName, headerValue]] of headers.entries()) {
    headerRows.push(...getHeaderRowNodes(headerName, headerValue, index))
  }
  return [
    {
      childCount: headers.length,
      className: ChatDebugViewHeadersTable,
      type: VirtualDomElements.Ul,
    },
    ...headerRows,
  ]
}
