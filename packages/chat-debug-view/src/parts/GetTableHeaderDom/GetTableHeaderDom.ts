import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'

export const getTableHeaderDom = (): readonly VirtualDomNode[] => {
  return [
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
  ]
}
