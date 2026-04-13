import { type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

export type LineData = {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}
