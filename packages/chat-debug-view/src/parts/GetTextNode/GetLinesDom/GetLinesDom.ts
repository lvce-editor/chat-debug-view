import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { Rows } from '../../../ClassNames/ClassNames.ts'
import { getLineNodes } from '../../../GetLineNodes/GetLineNodes.ts'
import { type LineData } from '../LineData/LineData.ts'

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
