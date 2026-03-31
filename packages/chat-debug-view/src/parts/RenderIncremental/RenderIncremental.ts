import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: ChatDebugViewState, newState: ChatDebugViewState): readonly [string, number, readonly unknown[]] => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  console.log({ newDom, oldDom, patches })
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
