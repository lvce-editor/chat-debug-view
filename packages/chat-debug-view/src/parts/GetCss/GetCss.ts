import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getDetailsWidth, getMainWidth, sashWidth, viewPadding } from '../SplitLayout/SplitLayout.ts'
import { getTableColumnLayout } from '../TableColumnLayout/TableColumnLayout.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const hasSelectedEvent = !!state.selectedEvent
  const tableWidth = hasSelectedEvent ? clampTableWidth(state.width, state.tableWidth) : getMainWidth(state.width)
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(state.width, state.tableWidth) : 0
  const tableColumnLayout = getTableColumnLayout(tableWidth, state.visibleTableColumns, state.tableColumnWidths)
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] || 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] || 0
  return `
.ChatDebugView {
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewDurationColumnWidth: ${state.tableColumnWidths.duration}px;
  --ChatDebugViewResizerOneLeft: ${resizerOneLeft}px;
  --ChatDebugViewResizerTwoLeft: ${resizerTwoLeft}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  --ChatDebugViewTypeColumnWidth: ${state.tableColumnWidths.type}px;
  padding: ${viewPadding}px;
}

.ChatDebugViewTop {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.ChatDebugViewFilterInput {
  flex: 1;
  min-width: 0;
}

.ChatDebugViewTableWrapper {
  position: relative;
  width: min(100%, var(--ChatDebugViewTableWidth));
  max-width: 100%;
  flex:1;
  display:flex
}

.ChatDebugViewTable {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  flex: 1;
}

.ChatDebugViewHeaderCell,
.ChatDebugViewCell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ChatDebugViewHeaderCellType.ChatDebugViewColumnFixed,
.ChatDebugViewCellType.ChatDebugViewColumnFixed {
  width: var(--ChatDebugViewTypeColumnWidth);
  max-width: var(--ChatDebugViewTypeColumnWidth);
}

.ChatDebugViewHeaderCellDuration.ChatDebugViewColumnFixed,
.ChatDebugViewCellDuration.ChatDebugViewColumnFixed {
  width: var(--ChatDebugViewDurationColumnWidth);
  max-width: var(--ChatDebugViewDurationColumnWidth);
}

.ChatDebugViewResizers {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ChatDebugViewResizer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  pointer-events: auto;
  cursor: col-resize;
}

.ChatDebugViewResizerOne {
  left: var(--ChatDebugViewResizerOneLeft);
  transform: translateX(-50%);
}

.ChatDebugViewResizerTwo {
  left: var(--ChatDebugViewResizerTwoLeft);
  transform: translateX(-50%);
}

.ChatDebugViewResizerInner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: var(--vscode-widget-border, rgba(255, 255, 255, 0.18));
}


.ChatDebugViewDetails  {
  margin-left: auto;
  min-height: 26px;
}
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--vscode-descriptionForeground, inherit);
}
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  contain: strict;
  flex:1;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, transform 120ms ease;

}
.ChatDebugViewEvent {
  border-color: var(--vscode-widget-border, rgba(255, 255, 255, 0.14));
  background: var(--vscode-toolbar-hoverBackground, rgba(255, 255, 255, 0.06));
  color: var(--vscode-foreground, inherit);

.ChatDebugViewEventLineContent {
  flex: 1;
  background: var(--vscode-toolbar-activeBackground, rgba(255, 255, 255, 0.1));
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  word-break: break-word;
  outline: 1px solid var(--vscode-focusBorder, rgba(255, 255, 255, 0.4));

.ChatDebugViewEventLineNumber {
  flex: none;
}

.row {
  flex-shrink: 0;
  min-width: 0;
}

.ChatDebugViewRefreshButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin-left: auto;
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
