import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getDetailsWidth, sashWidth, viewPadding } from '../SplitLayout/SplitLayout.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const tableWidth = clampTableWidth(state.width, state.tableWidth)
  const detailsWidth = getDetailsWidth(state.width, state.tableWidth)
  return `
.ChatDebugView {
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  padding: ${viewPadding}px;
}


.ChatDebugViewDetails  {
  contain: strict;
}

.ChatDebugViewDetailsTop {
  height: 33px;
  contain: strict;
}

.ChatDebugViewDetailsBottom {
  display: flex;
  contain: strict;
  flex:1

}
.ChatDebugViewEvent {
  contain: content
}

.row {
  flex-shrink: 0;
}
`
}
