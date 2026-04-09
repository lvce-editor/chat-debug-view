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

.ChatDebugViewRefreshButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
  color: inherit;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease;
}

.ChatDebugViewRefreshButton:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.08));
  border-color: rgba(255, 255, 255, 0.24);
}

.ChatDebugViewRefreshButton:active {
  transform: translateY(1px);
}

.ChatDebugViewRefreshButton:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 1px;
}

.ChatDebugViewEventRow:hover {
  background: var(--ListHoverBackground);
  color: var(--ListHoverForeground);
}
`
}
