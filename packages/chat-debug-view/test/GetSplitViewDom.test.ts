import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetSplitViewDom from '../src/parts/GetSplitViewDom/GetSplitViewDom.ts'

test('getSplitViewDom should wrap events table and details panes in the split layout', () => {
  const tableNodes = [{ childCount: 0, className: 'Table', type: VirtualDomElements.Table }]
  const sashNodes = [{ childCount: 0, className: 'Sash', type: VirtualDomElements.Button }]
  const detailsNodes = [{ childCount: 0, className: 'ChatDebugViewDetails', type: VirtualDomElements.Section }]

  const result = GetSplitViewDom.getSplitViewDom(3, 2, 'ChatDebugViewEvents', tableNodes, sashNodes, detailsNodes)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewDevtoolsSplit',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewEvents',
      role: 'application',
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ])
})
