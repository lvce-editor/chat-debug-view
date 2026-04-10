import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewResizer,
  ChatDebugViewResizerInner,
  ChatDebugViewResizerOne,
  ChatDebugViewResizerTwo,
  ChatDebugViewResizers,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getOrderedVisibleTableColumns } from '../TableColumn/TableColumn.ts'

const resizerNames = ['ResizerOne', 'ResizerTwo'] as const
const resizerClassNames = [ChatDebugViewResizerOne, ChatDebugViewResizerTwo] as const

export const getTableResizersDom = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const visibleColumnCount = getOrderedVisibleTableColumns(visibleTableColumns).length
  const resizerCount = Math.max(0, visibleColumnCount - 1)
  if (resizerCount === 0) {
    return []
  }
  const resizerNodes = [] as VirtualDomNode[]
  for (let index = 0; index < resizerCount; index++) {
    resizerNodes.push(
      {
        childCount: 1,
        className: `${ChatDebugViewResizer} ${resizerClassNames[index]}`,
        name: resizerNames[index],
        onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
        role: 'none',
        type: VirtualDomElements.Button,
      },
      {
        childCount: 0,
        className: ChatDebugViewResizerInner,
        type: VirtualDomElements.Div,
      },
    )
  }
  return [
    {
      childCount: resizerCount * 2,
      className: ChatDebugViewResizers,
      type: VirtualDomElements.Div,
    },
    ...resizerNodes,
  ]
}
