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
      childCount: 0,
      className: 'ChatDebugViewDetailsClose',
      inputType: 'checkbox',
      name: InputName.CloseDetails,
      onChange: DomEventListenerFunctions.HandleSimpleInput,
      type: VirtualDomElements.Input,
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
