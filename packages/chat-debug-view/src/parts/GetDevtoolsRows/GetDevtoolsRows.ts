import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { ChatDebugViewEventRowSelected, TableRow, TableRowEven, TableRowOdd } from '../ClassNames/ClassNames.ts'
import { getRowCellNodes } from '../GetRowCellNodes/GetRowCellNodes.ts'
import { hasErrorStatus } from '../HasErrorStatus/HasErrorStatus.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const getDevtoolsRows = (
  events: readonly ChatViewEvent[],
  selectedEventIndex: number | null,
  visibleTableColumns: readonly string[] = defaultVisibleTableColumns,
): readonly VirtualDomNode[] => {
  return events.flatMap((event, i) => {
    const isEvenRow = i % 2 === 1
    const rowClassName = isEvenRow ? TableRowEven : TableRowOdd
    const isSelected = selectedEventIndex === i
    const isErrorStatus = hasErrorStatus(event)
    const rowCellNodes = getRowCellNodes(event, isErrorStatus, visibleTableColumns)
    return [
      {
        childCount: visibleTableColumns.length,
        className: mergeClassNames(TableRow, rowClassName, isSelected ? ChatDebugViewEventRowSelected : ''),
        type: VirtualDomElements.Tr,
      },
      ...rowCellNodes,
    ]
  })
}
