import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DevtoolsRow } from '../DevtoolsRow/DevtoolsRow.ts'
import { TableRow, TableRowEven, TableRowOdd, TableRowSelected } from '../ClassNames/ClassNames.ts'
import { getRowCellNodes } from '../GetRowCellNodes/GetRowCellNodes.ts'
import { defaultVisibleTableColumns } from '../TableColumn/TableColumn.ts'

export const getDevtoolsRows = (
  rows: readonly DevtoolsRow[],
  visibleTableColumns: readonly string[] = defaultVisibleTableColumns,
): readonly VirtualDomNode[] => {
  return rows.flatMap((row) => {
    const rowClassName = row.isEven ? TableRowEven : TableRowOdd
    const rowCellNodes = getRowCellNodes(row.event, row.isErrorStatus, visibleTableColumns)
    return [
      {
        childCount: visibleTableColumns.length,
        className: mergeClassNames(TableRow, rowClassName, row.isSelected ? TableRowSelected : ''),
        'data-index': `${row.index}`,
        type: VirtualDomElements.Tr,
      },
      ...rowCellNodes,
    ]
  })
}
