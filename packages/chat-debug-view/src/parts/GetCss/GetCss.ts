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

.ChatDebugViewFilterInput--devtools {
  flex: 1 1 220px;
  min-width: 180px;
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
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.ChatDebugViewEventRawText {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  flex: 1;
}

.ChatDebugViewEventLineContent {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  word-break: break-word;
}

.ChatDebugViewEventLineNumber {
  flex: none;
}

.row {
  flex-shrink: 0;
  min-width: 0;
  width: 100%;
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

.ChatDebugViewDetailsClose {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin-left: auto;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--vscode-descriptionForeground, inherit);
  cursor: pointer;
}

.ChatDebugViewDetailsClose:hover {
  background: var(--vscode-toolbar-hoverBackground, rgba(255, 255, 255, 0.08));
  color: var(--vscode-foreground, inherit);
}

.ChatDebugViewDetailsClose:focus-visible {
  outline: 2px solid var(--vscode-focusBorder, rgba(255, 255, 255, 0.45));
  outline-offset: 1px;
}

.maskIcon {
  display: block;
  width: 16px;
  height: 16px;
  opacity: 0.86;
  contain: strict;
}

.maskIcon.close {
  background:
    linear-gradient(45deg, transparent calc(50% - 1px), currentColor calc(50% - 1px), currentColor calc(50% + 1px), transparent calc(50% + 1px)),
    linear-gradient(-45deg, transparent calc(50% - 1px), currentColor calc(50% - 1px), currentColor calc(50% + 1px), transparent calc(50% + 1px));
}

.ChatDebugViewEventRow:hover {
  background: var(--ListHoverBackground);
  color: var(--ListHoverForeground);
}

.ChatDebugViewImagePreview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  min-height: 0;
}

.ChatDebugViewImagePreviewImage {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 100%;
  align-self: center;
  border: 1px solid var(--vscode-widget-border, rgba(255, 255, 255, 0.14));
  border-radius: 6px;
  object-fit: contain;
}

.ChatDebugViewImagePreviewLabel {
  width: auto;
  height: auto;
  max-height: 100%;
  align-self: center;
}

.ChatDebugViewTimeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ChatDebugViewTimelineTop {
  display: flex;
  align-items: center;
  min-width: 0;
}

.ChatDebugViewTimelineSummary {
  margin: 0;
  color: var(--vscode-descriptionForeground, inherit);
  font-size: 11px;
  font-weight: 600;
}

.ChatDebugViewTimelineInteractive {
  position: relative;
  height: 54px;
  overflow: hidden;
  border: 1px solid var(--vscode-widget-border, rgba(255, 255, 255, 0.14));
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  contain: strict;
  user-select: none;
}

.ChatDebugViewTimelineBuckets {
  position: absolute;
  inset: 18px 8px 8px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

.ChatDebugViewTimelineBucket {
  display: flex;
  flex: 1;
  align-items: flex-end;
  height: 100%;
  min-width: 0;
  cursor: pointer;
}

.ChatDebugViewTimelineBucketBar {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  height: 100%;
}

.ChatDebugViewTimelineBucketUnit {
  flex: none;
  height: 4px;
  border-radius: 999px;
  background: var(--vscode-charts-blue, rgba(91, 151, 255, 0.9));
}

.ChatDebugViewTimelineBucketUnitEmpty {
  opacity: 0.18;
}

.ChatDebugViewTimelineBucketSelected .ChatDebugViewTimelineBucketUnit,
.ChatDebugViewTimelineBucketBarSelected .ChatDebugViewTimelineBucketUnit {
  background: var(--vscode-charts-orange, rgba(255, 174, 0, 0.95));
}

.ChatDebugViewTimelineSelectionOverlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ChatDebugViewTimelineSelectionRange {
  position: absolute;
  top: 18px;
  bottom: 8px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--vscode-charts-orange, rgba(255, 174, 0, 0.95)) 18%, transparent);
  outline: 1px solid color-mix(in srgb, var(--vscode-charts-orange, rgba(255, 174, 0, 0.95)) 55%, transparent);
}

.ChatDebugViewTimelineSelectionMarker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14px;
  margin-left: -7px;
  padding: 0;
  border: 0;
  background: linear-gradient(
    90deg,
    transparent calc(50% - 1px),
    var(--vscode-charts-orange, rgba(255, 174, 0, 0.95)) calc(50% - 1px),
    var(--vscode-charts-orange, rgba(255, 174, 0, 0.95)) calc(50% + 1px),
    transparent calc(50% + 1px)
  );
}

.ChatDebugViewTimelineSelectionHandle {
  pointer-events: auto;
  cursor: ew-resize;
}

.ChatDebugViewTimelineSelectionHandle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 14px;
  height: 16px;
  transform: translateX(-50%);
  border: 1px solid var(--vscode-widget-border, rgba(255, 255, 255, 0.22));
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.ChatDebugViewTimelineSelectionHandle::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  width: 7px;
  height: 6px;
  transform: translateX(-50%);
  background: linear-gradient(
    90deg,
    transparent 0,
    transparent 1px,
    var(--vscode-foreground, rgba(255, 255, 255, 0.88)) 1px,
    var(--vscode-foreground, rgba(255, 255, 255, 0.88)) 2px,
    transparent 2px,
    transparent 4px,
    var(--vscode-foreground, rgba(255, 255, 255, 0.88)) 4px,
    var(--vscode-foreground, rgba(255, 255, 255, 0.88)) 5px,
    transparent 5px,
    transparent 100%
  );
  opacity: 0.8;
}

.ChatDebugViewTimelineSelectionHandle:hover::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.12));
}

.ChatDebugViewTimelineSelectionHandle:focus-visible {
  outline: 2px solid var(--vscode-focusBorder, rgba(255, 255, 255, 0.45));
  outline-offset: 1px;
}
`
}
