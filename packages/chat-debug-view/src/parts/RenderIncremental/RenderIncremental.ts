import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import { renderItems } from '../RenderItems/RenderItems.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

export const renderIncremental = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly [string, number, readonly unknown[]] => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(oldState, oldState)[2]
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
