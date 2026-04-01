import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getDetailsDom = (selectedEventNodes: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  if (selectedEventNodes.length === 0) {
    return []
  }
  return [
    {
      childCount: 2,
      className: 'ChatDebugViewDetails',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewDetailsTop',
      type: VirtualDomElements.Div,
    },
    {
      'aria-label': 'Close details',
      childCount: 0,
      className: 'ChatDebugViewDetailsClose',
      name: InputName.CloseDetails,
      onClick: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Button,
      value: 'close',
    },
    {
      childCount: 1,
      className: 'ChatDebugViewDetailsTitle',
      type: VirtualDomElements.Div,
    },
    text('Details'),
    {
      childCount: selectedEventNodes.length,
      className: 'ChatDebugViewDetailsBody',
      type: VirtualDomElements.Div,
    },
    ...selectedEventNodes,
  ]
}
