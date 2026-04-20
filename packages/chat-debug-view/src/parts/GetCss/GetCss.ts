// cspell:ignore liga calt

import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'
import { clampTableWidth, getDetailsWidth, getMainWidth, sashWidth, viewPadding } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getTableColumnLayout } from '../TableColumnLayout/TableColumnLayout.ts'
import { devtoolsTableHeaderHeight, devtoolsTableRowHeight, devtoolsTableScrollBarWidth } from '../TableMetrics/TableMetrics.ts'
import { getMaxDeltaY, getScrollBarHeight, getScrollBarOffset, getTableBodyHeight } from '../VirtualTable/VirtualTable.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const hasSelectedEvent = !!state.selectedEvent
  const tableWidth = hasSelectedEvent ? clampTableWidth(state.width, state.tableWidth) : getMainWidth(state.width)
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const scrollBarHeight = getScrollBarHeight(currentEvents.length, tableBodyHeight)
  const maxDeltaY = getMaxDeltaY(currentEvents.length, tableBodyHeight)
  const showScrollBar = scrollBarHeight > 0
  const scrollBarOffset = getScrollBarOffset(state.tableDeltaY, maxDeltaY, tableBodyHeight, scrollBarHeight)
  const tableContentWidth = Math.max(0, tableWidth - (showScrollBar ? devtoolsTableScrollBarWidth : 0))
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(state.width, state.tableWidth) : 0
  const topSize = state.width >= state.largeBreakpoint ? 30 : state.width >= state.mediumBreakpoint ? 60 : 60
  const tableColumnLayout = getTableColumnLayout(tableContentWidth, TableColumn.getVisibleTableColumns(state.tableColumns), state.tableColumnWidths)
  const [tableColZeroWidth = 0, tableColOneWidth = 0, tableColTwoWidth = 0] = tableColumnLayout.visibleColumnWidths
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] ?? 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] ?? 0
  const { selectionEndPercent, selectionStartPercent } = state.timelineInfo
  return `
.ChatDebugView {
  --ChatDebugViewHeadersAccent: color-mix(in srgb, var(--vscode-focusBorder, #0e639c) 72%, transparent);
  --ChatDebugViewHeadersBorder: color-mix(in srgb, var(--vscode-widget-border, rgba(255, 255, 255, 0.14)) 84%, transparent);
  --ChatDebugViewHeadersLabelWidth: 148px;
  --ChatDebugViewHeadersMutedForeground: color-mix(in srgb, var(--vscode-descriptionForeground, rgba(204, 204, 204, 0.72)) 90%, white 10%);
  --ChatDebugViewHeadersPanelBackground: color-mix(in srgb, var(--vscode-editorWidget-background, rgba(30, 30, 30, 0.96)) 94%, black 6%);
  --ChatDebugViewHeadersStrongForeground: color-mix(in srgb, var(--vscode-foreground, rgba(255, 255, 255, 0.94)) 96%, white 4%);
  --ChatDebugViewTableBodyHeight: ${tableBodyHeight}px;
  --ChatDebugViewTableHeaderHeight: ${devtoolsTableHeaderHeight}px;
  --ChatDebugViewTableColZeroWidth: ${tableColZeroWidth}px;
  --ChatDebugViewTableColOneWidth: ${tableColOneWidth}px;
  --ChatDebugViewTableColTwoWidth: ${tableColTwoWidth}px;
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewDurationColumnWidth: ${state.tableColumnWidths.duration}px;
  --ChatDebugViewTableRowHeight: ${devtoolsTableRowHeight}px;
  --ChatDebugViewTableScrollBarHeight: ${scrollBarHeight}px;
  --ChatDebugViewTableScrollBarOffset: ${scrollBarOffset}px;
  --ChatDebugViewTableScrollBarWidth: ${showScrollBar ? devtoolsTableScrollBarWidth : 0}px;
  --ResizerOneLeft: ${resizerOneLeft}px;
  --ResizerTwoLeft: ${resizerTwoLeft}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  --ChatDebugViewTimelineHeight: ${state.timelineHeight}px;
  --ChatDebugViewTimelineCursorGuideLeft: ${state.timelineHoverPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionEndLeft: ${selectionEndPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionStartLeft: ${selectionStartPercent ?? 0}%;
  --ChatDebugViewTopSize: ${topSize}px;
  --ChatDebugViewTypeColumnWidth: ${state.tableColumnWidths.type}px;
  padding: ${viewPadding}px;
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

.ChatDebugViewHeaders {
  gap: 12px;
  padding: 8px 0 16px;
}

.ChatDebugViewHeadersSection {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid var(--ChatDebugViewHeadersBorder);
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), var(--ChatDebugViewHeadersPanelBackground));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.ChatDebugViewHeadersSectionTitle {
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-bottom: 1px solid var(--ChatDebugViewHeadersBorder);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015));
  color: var(--ChatDebugViewHeadersMutedForeground);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  opacity: 1;
  text-transform: uppercase;
}

.ChatDebugViewHeaders .ChatDebugViewTimingRow {
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 30px;
  padding: 8px 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--ChatDebugViewHeadersBorder) 80%, transparent);
  background: transparent;
}

.ChatDebugViewHeaders .ChatDebugViewTimingRow:last-child {
  border-bottom: none;
}

.ChatDebugViewHeaders .ChatDebugViewTimingRow:hover {
  background: linear-gradient(90deg, color-mix(in srgb, var(--ChatDebugViewHeadersAccent) 14%, transparent), transparent 70%);
}

.ChatDebugViewHeaders .ChatDebugViewTimingLabel {
  flex: 0 0 var(--ChatDebugViewHeadersLabelWidth);
  min-width: 120px;
  max-width: 42%;
  color: var(--ChatDebugViewHeadersMutedForeground);
  font-weight: 500;
  opacity: 1;
  overflow-wrap: anywhere;
}

.ChatDebugViewHeaders .ChatDebugViewTimingValue {
  flex: 1;
  min-width: 0;
  color: var(--ChatDebugViewHeadersStrongForeground);
  text-align: left;
  overflow-wrap: anywhere;
  word-break: break-word;
}

`
}
