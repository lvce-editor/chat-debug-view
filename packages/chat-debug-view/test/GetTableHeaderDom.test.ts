import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetTableHeaderDom from '../src/parts/GetTableHeaderDom/GetTableHeaderDom.ts'

test('getTableHeaderDom should render the table header nodes', () => {
  const dom = GetTableHeaderDom.getTableHeaderDom() as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly scope?: string
  }[]

  expect(dom).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.THead,
    },
    {
      childCount: 3,
      className: 'ChatDebugViewTableHeaderRow',
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      scope: 'col',
      type: VirtualDomElements.Th,
    },
    text('Status'),
  ])
})
