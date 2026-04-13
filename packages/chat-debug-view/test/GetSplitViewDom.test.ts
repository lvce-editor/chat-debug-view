import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetSplitViewDom from '../src/parts/GetSplitViewDom/GetSplitViewDom.ts'

test('getSplitViewDom should render only the events pane when details are closed', () => {
  const tableNodes = [
    {
      childCount: 2,
      className: 'TableWrapperWrapper',
      type: VirtualDomElements.Div,
    },
    { childCount: 0, className: 'TableWrapper', type: VirtualDomElements.Div },
    { childCount: 0, className: 'TableSummary', type: VirtualDomElements.Div },
  ]
  const sashNodes = [{ childCount: 0, className: 'Sash', type: VirtualDomElements.Button }]
  const detailsNodes = [{ childCount: 0, className: 'ChatDebugViewDetails', type: VirtualDomElements.Section }]

  const result = GetSplitViewDom.getSplitViewDom(
    1,
    'ChatDebugViewEvents ChatDebugViewEventsFullWidth',
    tableNodes,
    sashNodes,
    detailsNodes,
  )

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewEvents ChatDebugViewEventsFullWidth',
      role: 'application',
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
  ])
})

test('getSplitViewDom should wrap events table and details panes in the split layout', () => {
  const tableNodes = [
    {
      childCount: 2,
      className: 'TableWrapperWrapper',
      type: VirtualDomElements.Div,
    },
    { childCount: 0, className: 'TableWrapper', type: VirtualDomElements.Div },
    { childCount: 0, className: 'TableSummary', type: VirtualDomElements.Div },
  ]
  const sashNodes = [{ childCount: 0, className: 'Sash', type: VirtualDomElements.Button }]
  const detailsNodes = [{ childCount: 0, className: 'ChatDebugViewDetails', type: VirtualDomElements.Section }]

  const result = GetSplitViewDom.getSplitViewDom(3, 'ChatDebugViewEvents', tableNodes, sashNodes, detailsNodes)

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewDevtoolsSplit',
      role: 'none',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewEvents',
      role: 'application',
      type: VirtualDomElements.Div,
    },
    ...tableNodes,
    ...sashNodes,
    ...detailsNodes,
  ])
})
