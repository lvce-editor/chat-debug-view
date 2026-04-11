import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetHeaderCellNodes from '../src/parts/GetHeaderCellNodes/GetHeaderCellNodes.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getHeaderCellNodes should render the visible header cells', () => {
  const tableColumns: readonly TableColumn.TableColumn[] = [
    {
      label: 'Request Type',
      name: TableColumn.Type,
    },
    {
      label: 'Elapsed',
      name: TableColumn.Duration,
    },
    {
      label: 'Outcome',
      name: TableColumn.Status,
    },
  ]
  const dom = GetHeaderCellNodes.getHeaderCellNodes([TableColumn.Type, TableColumn.Status], tableColumns) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      name: TableColumn.Type,
      onClick: DomEventListenerFunctions.HandleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Request Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellStatus',
      name: TableColumn.Status,
      onClick: DomEventListenerFunctions.HandleTableHeaderClick,
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Outcome'),
  ])
})
