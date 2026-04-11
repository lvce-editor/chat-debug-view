import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { FocusOutline, TableWrapper } from '../ClassNames/ClassNames.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { FocusChatDebugTable } from '../WhenExpression/WhenExpression.ts'
import { getTableResizersDom } from '../GetTableResizersDom/GetTableResizersDom.ts'

export const getTableWrapperDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  summary = '',
  focus = 0,
): readonly VirtualDomNode[] => {
  const tableWrapperClassName = mergeClassNames(TableWrapper, focus === FocusChatDebugTable ? FocusOutline : '')
  return [
    {
      childCount: 2,
      className: tableWrapperClassName,
      type: VirtualDomElements.Div,
    },
    ...getTableDom(rowNodes, eventCount, visibleTableColumns, tableColumns, summary, focus),
    ...getTableResizersDom(visibleTableColumns),
  ]
}
