import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getDetailsWidth, getMainWidth, sashWidth, viewPadding } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getTableColumnLayout } from '../TableColumnLayout/TableColumnLayout.ts'
import { devtoolsTableHeaderHeight, devtoolsTableRowHeight } from '../TableMetrics/TableMetrics.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const hasSelectedEvent = !!state.selectedEvent
  const tableWidth = hasSelectedEvent ? clampTableWidth(state.width, state.tableWidth) : getMainWidth(state.width)
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(state.width, state.tableWidth) : 0
  const topSize = state.width >= state.largeBreakpoint ? 30 : state.width >= state.mediumBreakpoint ? 60 : 60
  const tableColumnLayout = getTableColumnLayout(tableWidth, TableColumn.getVisibleTableColumns(state.tableColumns), state.tableColumnWidths)
  const [tableColZeroWidth = 0, tableColOneWidth = 0, tableColTwoWidth = 0] = tableColumnLayout.visibleColumnWidths
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] ?? 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] ?? 0
  const { selectionEndPercent, selectionStartPercent } = state.timelineInfo
  return `
.ChatDebugView {
  --ChatDebugViewTableHeaderHeight: ${devtoolsTableHeaderHeight}px;
  --ChatDebugViewTableColZeroWidth: ${tableColZeroWidth}px;
  --ChatDebugViewTableColOneWidth: ${tableColOneWidth}px;
  --ChatDebugViewTableColTwoWidth: ${tableColTwoWidth}px;
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewDurationColumnWidth: ${state.tableColumnWidths.duration}px;
  --ChatDebugViewTableRowHeight: ${devtoolsTableRowHeight}px;
  --ResizerOneLeft: ${resizerOneLeft}px;
  --ResizerTwoLeft: ${resizerTwoLeft}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  --ChatDebugViewTimelineCursorGuideLeft: ${state.timelineHoverPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionEndLeft: ${selectionEndPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionStartLeft: ${selectionStartPercent ?? 0}%;
  --ChatDebugViewTopSize: ${topSize}px;
  --ChatDebugViewTypeColumnWidth: ${state.tableColumnWidths.type}px;
  padding: ${viewPadding}px;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  gap: 8px;
  contain: strict;
  flex: 1;
  flex-direction: column;
}

.ChatDebugView--devtools {
  gap: 4px;
}

.ChatDebugView--devtools > .ChatDebugViewTimeline {
  flex: 0 0 auto;
}

.ChatDebugView--devtools .ChatDebugViewEvents {
  border-radius: 6px;
  margin-bottom: 0;
  overflow: hidden;
}

.ChatDebugViewTop {
  display: flex;
  align-items: center;
  flex: 0 0 var(--ChatDebugViewTopSize);
  gap: 8px;
  height: var(--ChatDebugViewTopSize);
  min-height: var(--ChatDebugViewTopSize);
  min-width: 0;
  contain: strict;
}

.ChatDebugViewTop--devtools {
  align-items: stretch;
}

.ChatDebugViewFilterInput {
  flex: 1;
  min-width: 0;
}

.ChatDebugViewFilterInput--devtools {
  flex: 1 1 220px;
  min-width: 180px;
}

.ChatDebugViewDevtoolsSplit {
  display: flex;
  flex: 1;
  align-items: stretch;
  gap: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  contain: strict;
}

.TableWrapper {
  position: relative;
  width: min(100%, var(--ChatDebugViewTableWidth));
  max-width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.TableWrapperWrapper {
  position: relative;
  width: min(100%, var(--ChatDebugViewTableWidth));
  max-width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.FocusOutline {
  outline: 2px solid var(--vscode-focusBorder, rgba(255, 255, 255, 0.45));
  outline-offset: 1px;
}

.Table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.TableRow {
  height: var(--ChatDebugViewTableRowHeight);
}

.TableSummary {
  flex: none;
  min-height: 24px;
  width: min(100%, var(--ChatDebugViewTableWidth));
  max-width: 100%;
  padding: 6px 4px 0;
  color: var(--vscode-descriptionForeground, inherit);
  font-size: 12px;
  line-height: 1.4;
}

.TableCell {
  box-sizing: border-box;
  height: var(--ChatDebugViewTableHeaderHeight);
  max-height: var(--ChatDebugViewTableHeaderHeight);
  padding: 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.TableBody .TableCell {
  height: var(--ChatDebugViewTableRowHeight);
  max-height: var(--ChatDebugViewTableRowHeight);
  line-height: var(--ChatDebugViewTableRowHeight);
}

.ChatDebugViewCellDuration {
  text-align: right;
}

.TableCol {
  width: auto;
}

.TableColZero {
  width: var(--ChatDebugViewTableColZeroWidth);
  max-width: var(--ChatDebugViewTableColZeroWidth);
}

.TableColOne {
  width: var(--ChatDebugViewTableColOneWidth);
  max-width: var(--ChatDebugViewTableColOneWidth);
}

.TableColTwo {
  width: var(--ChatDebugViewTableColTwoWidth);
  max-width: var(--ChatDebugViewTableColTwoWidth);
}

.Resizers {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.Resizer {
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

.ResizerOne {
  left: var(--ResizerOneLeft);
  transform: translateX(-50%);
}

.ResizerTwo {
  left: var(--ResizerTwoLeft);
  transform: translateX(-50%);
}

.ResizerInner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: var(--vscode-widget-border, rgba(255, 255, 255, 0.18));
}


.ChatDebugViewDetails {
  border-radius: 6px;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  contain: strict;
}

.ChatDebugViewDevtoolsSplit > .ChatDebugViewDetails {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 1;
}

.ChatDebugViewDevtoolsSplit > .ChatDebugViewEvents {
  flex: 0 1 var(--ChatDebugViewTableWidth);
  min-width: 0;
}

.ChatDebugViewDevtoolsSplit > .ChatDebugViewEvents.ChatDebugViewEventsFullWidth {
  flex: 1 1 100%;
}

.ChatDebugViewDetailsBottom {
  color: var(--vscode-foreground, inherit);
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.ChatDebugViewEventRawText {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  flex: 1;
}

.ChatDebugViewEventLineContent {
  flex: 1;
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  word-break: break-word;
}

.ChatDebugViewEventLineNumber {
  flex: none;
}

.ChatDebugViewEventText {
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.EditorContainer {
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.Viewlet.Editor {
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.EditorContent {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.EditorInput {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

.EditorLayers {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.Selections {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.EditorSelection {
  position: absolute;
  background: var(--vscode-editor-selectionBackground, rgba(255, 255, 255, 0.2));
}

.EditorRows {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.EditorRow {
  flex-shrink: 0;
  min-width: 0;
  width: 100%;
  white-space: pre;
}

.Gutter {
  display: flex;
  flex-direction: column;
  flex: none;
  align-items: flex-end;
  padding-right: 12px;
}

.Gutter > .ChatDebugViewEventLineNumber {
  display: inline-flex;
  justify-content: flex-end;
}

.Rows {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
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


.ChatDebugViewTiming {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.ChatDebugViewTimingPreview {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.ChatDebugViewTimingPreviewTrack {
  position: relative;
  height: 34px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vscode-widget-border, rgba(255, 255, 255, 0.14)) 86%, transparent);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  contain: strict;
}

.ChatDebugViewTimingPreviewRail {
  position: absolute;
  top: 50%;
  right: 12px;
  left: 12px;
  height: 4px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vscode-foreground, rgba(255, 255, 255, 0.78)) 16%, transparent);
}

.ChatDebugViewTimingPreviewTrackOverlay {
  position: absolute;
  inset: 4px 12px;
  pointer-events: none;
}

.ChatDebugViewTimingPreviewSegment {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  overflow: hidden;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(91, 151, 255, 0.84), rgba(91, 151, 255, 0.56));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  color: var(--vscode-editor-foreground, inherit);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.ChatDebugViewTimingPreviewMarker {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 2px;
  z-index: 1;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vscode-charts-orange, rgba(255, 174, 0, 0.95)) 90%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vscode-editorWidget-background, rgba(30, 30, 30, 0.92)) 65%, transparent);
}

.ChatDebugViewTimingPreviewMarkerStart {
  left: 12px;
}

.ChatDebugViewTimingPreviewMarkerEnd {
  right: 12px;
}

.TableRow:hover {
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
  flex: 1;
}

.ChatDebugViewImagePreviewImageWrapper {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  contain: strict;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
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

.ChatDebugViewTimelineBadges {
  position: absolute;
  inset: 4px 8px auto 8px;
  height: 12px;
  pointer-events: none;
  z-index: 2;
}

.ChatDebugViewTimelineBadge {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  height: 12px;
  padding: 0 5px;
  border: 1px solid color-mix(in srgb, var(--vscode-widget-border, rgba(255, 255, 255, 0.18)) 82%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vscode-editorWidget-background, rgba(30, 30, 30, 0.92)) 90%, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  color: var(--vscode-descriptionForeground, inherit);
  font-size: 9px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.ChatDebugViewTimelineBuckets {
  position: absolute;
  inset: 20px 8px 8px;
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
  z-index: 1;
}

.ChatDebugViewTimelineCursorGuide {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  margin-left: -0.5px;
  pointer-events: none;
  background: color-mix(in srgb, var(--vscode-foreground, rgba(255, 255, 255, 0.88)) 58%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vscode-editorWidget-background, rgba(30, 30, 30, 0.92)) 70%, transparent);
}

.ChatDebugViewTimelineCursorGuideVisible {
  left: var(--ChatDebugViewTimelineCursorGuideLeft);
}

.ChatDebugViewTimelineSelectionRange {
  position: absolute;
  top: 20px;
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

.ChatDebugViewTimelineSelectionHandleStart,
.ChatDebugViewTimelineSelectionMarkerStart {
  left: var(--ChatDebugViewTimelineSelectionStartLeft);
}

.ChatDebugViewTimelineSelectionHandleEnd,
.ChatDebugViewTimelineSelectionMarkerEnd {
  left: var(--ChatDebugViewTimelineSelectionEndLeft);
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

.TokenString {
  white-space: nowrap;
}

.ChatDebug {
    --EditorFontSize: 15px;
    --EditorFontWeight: 400;
    --EditorFontFamily: 'Fira Code';
    --EditorLineHeight: 20px;
    --EditorLetterSpacing: 0.5px;
    --EditorFontFeatureSettings: "liga" 1, "calt" 1;
    --EditorTabSize: 2;

}

.ChatDebug .Editor {
  user-select: text;
}
`
}
