import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { setPreviewTextDeltaY } from '../PreviewVirtualization/PreviewVirtualization.ts'

export const handlePreviewTextWheel = (state: ChatDebugViewState, deltaY: number): ChatDebugViewState => {
  return setPreviewTextDeltaY(state, state.previewTextDeltaY + deltaY)
}
