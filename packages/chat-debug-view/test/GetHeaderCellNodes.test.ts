import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetHeaderCellNodes from '../src/parts/GetHeaderCellNodes/GetHeaderCellNodes.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

const handleTableHeaderClick = (DomEventListenerFunctions as Record<string, number>).HandleTableHeaderClick

const createTableColumn = (name: TableColumn.TableColumnName, label: string): TableColumn.TableColumn => {
  return {
    defaultWidth: 100,
    isVisible: true,
    label,
    minimumWidth: 56,
    name,
    width: 100,
  }
}

test('getHeaderCellNodes should render the visible header cells', () => {
  const tableColumns: readonly TableColumn.TableColumn[] = [
    createTableColumn(TableColumn.Type, 'Request Type'),
    createTableColumn(TableColumn.Method, 'Method'),
    createTableColumn(TableColumn.Status, 'Outcome'),
    createTableColumn(TableColumn.Duration, 'Elapsed'),
  ]
  const dom = GetHeaderCellNodes.getHeaderCellNodes([TableColumn.Type, TableColumn.Method, TableColumn.Status], tableColumns) as readonly {
    readonly childCount?: number
    readonly className?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Type,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Request Type'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Method,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Method'),
    {
      childCount: 1,
      className: 'TableCell',
      name: TableColumn.Status,
      onClick: handleTableHeaderClick,
      type: VirtualDomElements.Th,
    },
    text('Outcome'),
  ])
})
