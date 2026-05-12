import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { TableCol } from '../ClassNames/ClassNames.ts'
import { getOrderedVisibleTableColumns } from '../TableColumn/TableColumn.ts'

const tableColClassNames = ['TableColZero', 'TableColOne', 'TableColTwo', 'TableColThree', 'TableColFour'] as const

export const getTableColumnGroupDom = (visibleTableColumns: readonly string[]): readonly VirtualDomNode[] => {
  const orderedVisibleTableColumns = getOrderedVisibleTableColumns(visibleTableColumns)
  return [
    {
      childCount: orderedVisibleTableColumns.length,
      className: 'ColGroup',
      type: VirtualDomElements.ColGroup,
    },
    ...orderedVisibleTableColumns.map((_, index) => {
      const columnClassName = tableColClassNames[index] ?? `TableCol${index}`
      return {
        childCount: 0,
        className: `${TableCol} ${columnClassName}`,
        type: VirtualDomElements.Col,
      }
    }),
  ]
}
