import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewHeaderCell } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'

export const getHeaderCellNode = (
  column: TableColumn.TableColumnName,
  tableColumns: readonly TableColumn.TableColumn[],
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ChatDebugViewHeaderCell,
      name: column,
      onClick: DomEventListenerFunctions.HandleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text(TableColumn.getTableColumnLabel(tableColumns, column)),
  ]
}
