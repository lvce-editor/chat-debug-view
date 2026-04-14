import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { FocusOutline, TableWrapper } from '../ClassNames/ClassNames.ts'
import { getTableDom } from '../GetTableDom/GetTableDom.ts'
import { getTableResizersDom } from '../GetTableResizersDom/GetTableResizersDom.ts'
import { getTableScrollBarDom } from '../GetTableScrollBarDom/GetTableScrollBarDom.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { FocusChatDebugTable } from '../WhenExpression/WhenExpression.ts'

export const getTableWrapperDom = (
  rowNodes: readonly VirtualDomNode[],
  eventCount: number,
  visibleTableColumns: readonly string[] = TableColumn.defaultVisibleTableColumns,
  tableColumns: readonly TableColumn.TableColumn[] = TableColumn.createTableColumns(),
  summary = '',
  focus = 0,
  className = '',
  role = '',
  showScrollBar = false,
): readonly VirtualDomNode[] => {
  const tableWrapperClassName = mergeClassNames(TableWrapper, focus === FocusChatDebugTable ? FocusOutline : '', className)
  const scrollBarNodes = getTableScrollBarDom(showScrollBar)
  const tableWrapperNode = {
    childCount: showScrollBar ? 3 : 2,
    className: tableWrapperClassName,
    type: VirtualDomElements.Div,
    ...(role ? { role } : {}),
  }
  return [
    tableWrapperNode,
    ...getTableDom(rowNodes, eventCount, visibleTableColumns, tableColumns, summary, focus),
    ...getTableResizersDom(visibleTableColumns),
    ...scrollBarNodes,
  ]
}
