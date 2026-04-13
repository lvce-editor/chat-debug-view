import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { Resizer, ResizerInner, ResizerOne, ResizerTwo, Resizers } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getOrderedVisibleTableColumns } from '../TableColumn/TableColumn.ts'

const resizerNames = ['ResizerOne', 'ResizerTwo'] as const
const resizerClassNames = [ResizerOne, ResizerTwo] as const

export const getTableResizersDom = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const visibleColumnCount = getOrderedVisibleTableColumns(visibleTableColumns).length
  const resizerCount = Math.max(0, visibleColumnCount - 1)
  if (resizerCount === 0) {
    return []
  }
  const visibleResizerClassNames = resizerClassNames.slice(0, resizerCount)
  const resizerNodes = visibleResizerClassNames.flatMap((resizerClassName, index) => [
    {
      childCount: 1,
      className: mergeClassNames(Resizer, resizerClassName),
      name: resizerNames[index],
      onPointerDown: DomEventListenerFunctions.HandleTableResizerPointerDown,
      role: AriaRoles.None,
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: ResizerInner,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ])
  return [
    {
      childCount: resizerCount,
      className: Resizers,
      type: VirtualDomElements.Div,
    },
    ...resizerNodes,
  ]
}
