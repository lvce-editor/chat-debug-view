import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetHeaderCellNodes from '../src/parts/GetHeaderCellNodes/GetHeaderCellNodes.ts'
import * as TableColumn from '../src/parts/TableColumn/TableColumn.ts'

test('getHeaderCellNodes should render the visible header cells', () => {
  const dom = GetHeaderCellNodes.getHeaderCellNodes([TableColumn.Type, TableColumn.Status]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellType ChatDebugViewColumnFixed',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewHeaderCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
  ])
})
