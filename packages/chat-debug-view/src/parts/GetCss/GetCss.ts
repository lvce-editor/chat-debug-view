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

`
}
