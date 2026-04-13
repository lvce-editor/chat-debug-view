import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getTableWrapperWrapperDom } from '../src/parts/GetTableWrapperWrapperDom/GetTableWrapperWrapperDom.ts'

test('getTableWrapperWrapperDom should wrap the table wrapper and summary nodes', () => {
  const rowNodes = [
    {
      childCount: 0,
      className: 'TableRow',
      type: VirtualDomElements.Tr,
    },
  ]

  const dom = getTableWrapperWrapperDom(rowNodes as readonly any[], 1, undefined, undefined, '2 events, 1s from start to finish') as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly role?: string
    readonly type?: number
  }[]

  expect(dom[0]).toEqual(
    expect.objectContaining({
      childCount: 2,
      className: 'TableWrapperWrapper',
      type: VirtualDomElements.Div,
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'TableWrapper',
    }),
  )
  expect(dom).toContainEqual(
    expect.objectContaining({
      className: 'TableSummary',
      role: 'status',
    }),
  )
})
