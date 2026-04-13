import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../LineData/LineData.ts'
import { Rows } from '../../ClassNames/ClassNames.ts'
import { getLineNodes } from '../../GetLineNodes/GetLineNodes.ts'

export const getLinesDom = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
  const rowNodes = getLineNodes(lineData, false)
  return [
    {
      childCount: lineData.length,
      className: Rows,
      type: VirtualDomElements.Div,
    },
    ...rowNodes,
  ]
}
