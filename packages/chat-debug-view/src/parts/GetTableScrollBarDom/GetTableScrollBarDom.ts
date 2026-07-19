import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableScrollBar, TableScrollBarThumb } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const tableScrollBarNode: VirtualDomNode = {
  childCount: 1,
  className: TableScrollBar,
  onPointerDown: DomEventListenerFunctions.HandleTableScrollBarPointerDown,
  type: VirtualDomElements.Div,
}

const tableScrollBarThumbNode: VirtualDomNode = {
  childCount: 0,
  className: TableScrollBarThumb,
  type: VirtualDomElements.Div,
}

export const getTableScrollBarDom = (visible: boolean): readonly VirtualDomNode[] => {
  if (!visible) {
    return []
  }
  return [tableScrollBarNode, tableScrollBarThumbNode]
}
