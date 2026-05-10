import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { setPreviewTextDeltaY } from '../PreviewVirtualization/PreviewVirtualization.ts'

export const handlePreviewTextWheel = (state: ChatDebugViewState, deltaY: number): ChatDebugViewState => {
  const { previewTextDeltaY } = state
  return setPreviewTextDeltaY(state, previewTextDeltaY + deltaY)
}
