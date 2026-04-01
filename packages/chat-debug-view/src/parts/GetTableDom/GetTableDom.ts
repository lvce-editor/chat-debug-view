import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getTableDom = (rowNodes: readonly VirtualDomNode[], eventCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewTable',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 5,
      className: 'ChatDebugViewTableHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellType',
      type: VirtualDomElements.Div,
    },
    text('Type'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Started'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellTime',
      type: VirtualDomElements.Div,
    },
    text('Ended'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellDuration',
      type: VirtualDomElements.Div,
    },
    text('Duration'),
    {
      childCount: 1,
      className: 'ChatDebugViewHeaderCell ChatDebugViewCellStatus',
      type: VirtualDomElements.Div,
    },
    text('Status'),
    {
      childCount: eventCount === 0 ? 1 : eventCount,
      className: 'ChatDebugViewTableBody',
      onClick: DomEventListenerFunctions.HandleEventRowClick,
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
  ]
}