// cspell:ignore liga calt

import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getDetailsLineNumberWidth } from '../GetDetailsLineNumberWidth/GetDetailsLineNumberWidth.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { getPreviewTextViewportHeight, getPreviewVirtualizationState } from '../PreviewVirtualization/PreviewVirtualization.ts'
import { clampTableWidth, getDetailsWidth, getMainWidth } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getTableColumnLayout } from '../TableColumnLayout/TableColumnLayout.ts'
import { devtoolsTableHeaderHeight, devtoolsTableRowHeight, devtoolsTableScrollBarWidth } from '../TableMetrics/TableMetrics.ts'
import { getMaxDeltaY, getScrollBarHeight, getScrollBarOffset, getTableBodyHeight } from '../VirtualTable/VirtualTable.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const hasSelectedEvent = !!state.selectedEvent
  const tableWidth = hasSelectedEvent ? clampTableWidth(state, state.tableWidth) : getMainWidth(state)
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const scrollBarHeight = getScrollBarHeight(currentEvents.length, tableBodyHeight)
  const maxDeltaY = getMaxDeltaY(currentEvents.length, tableBodyHeight)
  const showScrollBar = scrollBarHeight > 0
  const scrollBarOffset = getScrollBarOffset(state.tableDeltaY, maxDeltaY, tableBodyHeight, scrollBarHeight)
  const tableContentWidth = Math.max(0, tableWidth - (showScrollBar ? devtoolsTableScrollBarWidth : 0))
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(state, state.tableWidth) : 0
  const detailsLineNumberWidth = getDetailsLineNumberWidth(state)
  const previewTextViewportHeight = getPreviewTextViewportHeight(state)
  const previewVirtualization = getPreviewVirtualizationState(state.selectedEvent, previewTextViewportHeight, state.previewTextDeltaY)
  let topSize = 60
  if (state.width >= state.largeBreakpoint) {
    topSize = 30
  }
  const tableColumnLayout = getTableColumnLayout(tableContentWidth, TableColumn.getVisibleTableColumns(state.tableColumns), state.tableColumnWidths)
  const [tableColZeroWidth = 0, tableColOneWidth = 0, tableColTwoWidth = 0, tableColThreeWidth = 0, tableColFourWidth = 0] =
    tableColumnLayout.visibleColumnWidths
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] ?? 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] ?? 0
  const resizerThreeLeft = tableColumnLayout.resizerLefts[2] ?? 0
  const resizerFourLeft = tableColumnLayout.resizerLefts[3] ?? 0
  const { selectionEndPercent, selectionStartPercent } = state.timelineInfo
  return `
.ChatDebugView {
  --ChatDebugViewTableBodyHeight: ${tableBodyHeight}px;
  --ChatDebugViewTableHeaderHeight: ${devtoolsTableHeaderHeight}px;
  --ChatDebugViewTableColZeroWidth: ${tableColZeroWidth}px;
  --ChatDebugViewTableColOneWidth: ${tableColOneWidth}px;
  --ChatDebugViewTableColTwoWidth: ${tableColTwoWidth}px;
  --ChatDebugViewTableColThreeWidth: ${tableColThreeWidth}px;
  --ChatDebugViewTableColFourWidth: ${tableColFourWidth}px;
  --ChatDebugViewDetailsLineNumberWidth: ${detailsLineNumberWidth}px;
  --ChatDebugViewPreviewScrollBarHeight: ${previewVirtualization.scrollBarHeight}px;
  --ChatDebugViewPreviewScrollBarOffset: ${previewVirtualization.scrollBarOffset}px;
  --ChatDebugViewPreviewScrollBarWidth: ${previewVirtualization.showScrollBar ? devtoolsTableScrollBarWidth : 0}px;
  --ChatDebugViewPreviewViewportHeight: ${previewVirtualization.viewportHeight}px;
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewDurationColumnWidth: ${state.tableColumnWidths.duration}px;
  --ChatDebugViewTableRowHeight: ${devtoolsTableRowHeight}px;
  --ChatDebugViewTableScrollBarHeight: ${scrollBarHeight}px;
  --ChatDebugViewTableScrollBarOffset: ${scrollBarOffset}px;
  --ChatDebugViewTableScrollBarWidth: ${showScrollBar ? devtoolsTableScrollBarWidth : 0}px;
  --ResizerOneLeft: ${resizerOneLeft}px;
  --ResizerTwoLeft: ${resizerTwoLeft}px;
  --ResizerThreeLeft: ${resizerThreeLeft}px;
  --ResizerFourLeft: ${resizerFourLeft}px;
  --ChatDebugViewSashWidth: ${state.sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  --ChatDebugViewTimelineHeight: ${state.timelineHeight}px;
  --ChatDebugViewTimelineCursorGuideLeft: ${state.timelineHoverPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionEndLeft: ${selectionEndPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionStartLeft: ${selectionStartPercent ?? 0}%;
  --ChatDebugViewTopSize: ${topSize}px;
  --ChatDebugViewTypeColumnWidth: ${state.tableColumnWidths.type}px;
  padding: ${state.viewPadding}px;
  padding-right: 0;
}

.TableWrapper {
  height: calc(var(--ChatDebugViewTableHeaderHeight) + var(--ChatDebugViewTableBodyHeight));
  overflow: hidden;
  position: relative;
}

.Table {
  width: calc(100% - var(--ChatDebugViewTableScrollBarWidth));
}

.TableColZero {
  width: var(--ChatDebugViewTableColZeroWidth);
}

.TableColOne {
  width: var(--ChatDebugViewTableColOneWidth);
}

.TableColTwo {
  width: var(--ChatDebugViewTableColTwoWidth);
}

.TableColThree {
  width: var(--ChatDebugViewTableColThreeWidth);
}

.TableColFour {
  width: var(--ChatDebugViewTableColFourWidth);
}

.Resizers {
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: var(--ChatDebugViewTableScrollBarWidth);
  top: 0;
}

.Resizer {
  background: transparent;
  border: 0;
  bottom: 0;
  cursor: col-resize;
  margin: 0;
  padding: 0;
  pointer-events: auto;
  position: absolute;
  top: 0;
  transform: translateX(calc(-0.5 * var(--ChatDebugViewSashWidth)));
  width: var(--ChatDebugViewSashWidth);
}

.ResizerOne {
  left: var(--ResizerOneLeft);
}

.ResizerTwo {
  left: var(--ResizerTwoLeft);
}

.ResizerThree {
  left: var(--ResizerThreeLeft);
}

.ResizerFour {
  left: var(--ResizerFourLeft);
}

.ResizerInner {
  background: var(--vscode-panel-border, rgba(255, 255, 255, 0.12));
  bottom: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translateX(-0.5px);
  width: 1px;
}

.ChatDebugViewTimeline {
  contain: strict;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: var(--ChatDebugViewTimelineHeight);
}

.ChatDebugViewTimelineInteractive {
  flex: 1;
  min-height: 0;
  position: relative;
}

.ChatDebugViewDetailsBottom .Gutter {
  flex: 0 0 var(--ChatDebugViewDetailsLineNumberWidth);
  width: var(--ChatDebugViewDetailsLineNumberWidth);
}

.ChatDebugViewHeadersTable {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.ChatDebugViewHeadersSection {
  display: flex;
  flex-direction: column;
}

.ChatDebugViewHeadersSection + .ChatDebugViewHeadersSection {
  margin-top: 16px;
}

.ChatDebugViewHeadersSectionHeading {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--vscode-descriptionForeground, rgba(255, 255, 255, 0.7));
  cursor: pointer;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  justify-content: flex-start;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  padding: 0;
  text-align: left;
  text-transform: uppercase;
}

.ChatDebugViewHeadersSectionHeading:hover {
  color: var(--vscode-editor-foreground);
}

.ChatDebugViewHeadersRow {
  display: grid;
  grid-template-columns: minmax(0, 38%) minmax(0, 1fr);
}

.ChatDebugViewHeadersCell {
  border-bottom: 1px solid var(--vscode-panel-border, rgba(255, 255, 255, 0.12));
  min-width: 0;
  color: var(--vscode-editor-foreground);
  padding: 6px 10px;
  text-align: left;
  word-break: break-word;
}

.ChatDebugViewHeadersRowOdd {
  background: rgba(255, 255, 255, 0.02);
}

.ChatDebugViewHeadersRowEven {
  background: rgba(255, 255, 255, 0.04);
}

.ChatDebugViewHeadersCellName {
  font-weight: 500;
}
.PreviewVirtualizedEditor {
  height: var(--ChatDebugViewPreviewViewportHeight);
  overflow: hidden;
  position: relative;
}

.PreviewVirtualizedEditor .Editor {
  width: calc(100% - var(--ChatDebugViewPreviewScrollBarWidth));
}

.PreviewTextScrollBar {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  height: var(--ChatDebugViewPreviewViewportHeight);
  position: absolute;
  right: 0;
  top: 0;
  width: var(--ChatDebugViewPreviewScrollBarWidth);
}

.PreviewTextScrollBarThumb {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  height: var(--ChatDebugViewPreviewScrollBarHeight);
  left: 2px;
  position: absolute;
  top: var(--ChatDebugViewPreviewScrollBarOffset);
  width: calc(100% - 4px);
}

.TableScrollBar {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  height: var(--ChatDebugViewTableBodyHeight);
  position: absolute;
  right: 0;
  top: var(--ChatDebugViewTableHeaderHeight);
  width: var(--ChatDebugViewTableScrollBarWidth);
}

.TableScrollBarThumb {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  height: var(--ChatDebugViewTableScrollBarHeight);
  left: 2px;
  position: absolute;
  top: var(--ChatDebugViewTableScrollBarOffset);
  width: calc(100% - 4px);
}

.TokenText {
  color: var(--vscode-editor-foreground);
}

.TokenString {
  color: var(--vscode-debugTokenExpression-string, #ce9178);
}

.TokenNumeric {
  color: var(--vscode-debugTokenExpression-number, #b5cea8);
}

.TokenBoolean {
  color: var(--vscode-debugTokenExpression-boolean, #569cd6);
}

.TokenKey,
.TokenAttributeName,
.TokenPropertyName {
  color: var(--vscode-symbolIcon-propertyForeground, #9cdcfe);
}

.TokenKeyword,
.TokenTag,
.TokenSelector {
  color: var(--vscode-symbolIcon-keywordForeground, #569cd6);
}

.TokenComment {
  color: var(--vscode-editorLineNumber-foreground, #6a9955);
}

`
}
