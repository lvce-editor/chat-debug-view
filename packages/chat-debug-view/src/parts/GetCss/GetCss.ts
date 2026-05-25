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
  const {
    largeBreakpoint,
    previewTextDeltaY,
    sashWidth,
    selectedEvent,
    tableColumns,
    tableDeltaY,
    tableWidth: tableWithRaw,
    timelineHeight,
    timelineHoverPercent,
    timelineInfo,
    viewPadding,
    width,
  } = state
  const hasSelectedEvent = !!selectedEvent
  const tableWidth = hasSelectedEvent ? clampTableWidth(state, tableWithRaw) : getMainWidth(state)
  const currentEvents = getCurrentEvents(state)
  const tableBodyHeight = getTableBodyHeight(state, currentEvents.length)
  const scrollBarHeight = getScrollBarHeight(currentEvents.length, tableBodyHeight)
  const maxDeltaY = getMaxDeltaY(currentEvents.length, tableBodyHeight)
  const showScrollBar = scrollBarHeight > 0
  const scrollBarOffset = getScrollBarOffset(tableDeltaY, maxDeltaY, tableBodyHeight, scrollBarHeight)
  const tableContentWidth = Math.max(0, tableWidth - (showScrollBar ? devtoolsTableScrollBarWidth : 0))
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(state, tableWidth) : 0
  const detailsLineNumberWidth = getDetailsLineNumberWidth(state)
  const previewTextViewportHeight = getPreviewTextViewportHeight(state)
  const previewVirtualization = getPreviewVirtualizationState(selectedEvent, previewTextViewportHeight, previewTextDeltaY)
  let topSize = 60
  if (width >= largeBreakpoint) {
    topSize = 30
  }
  const tableColumnLayout = getTableColumnLayout(tableContentWidth, TableColumn.getVisibleTableColumns(tableColumns), tableColumns)
  const [tableColZeroWidth = 0, tableColOneWidth = 0, tableColTwoWidth = 0, tableColThreeWidth = 0, tableColFourWidth = 0] =
    tableColumnLayout.visibleColumnWidths
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] ?? 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] ?? 0
  const resizerThreeLeft = tableColumnLayout.resizerLefts[2] ?? 0
  const resizerFourLeft = tableColumnLayout.resizerLefts[3] ?? 0
  const { selectionEndPercent, selectionStartPercent } = timelineInfo

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
  --ChatDebugViewDurationColumnWidth: ${TableColumn.getTableColumnWidth(tableColumns, TableColumn.Duration)}px;
  --ChatDebugViewTableRowHeight: ${devtoolsTableRowHeight}px;
  --ChatDebugViewTableScrollBarHeight: ${scrollBarHeight}px;
  --ChatDebugViewTableScrollBarOffset: ${scrollBarOffset}px;
  --ChatDebugViewTableScrollBarWidth: ${showScrollBar ? devtoolsTableScrollBarWidth : 0}px;
  --ResizerOneLeft: ${resizerOneLeft}px;
  --ResizerTwoLeft: ${resizerTwoLeft}px;
  --ResizerThreeLeft: ${resizerThreeLeft}px;
  --ResizerFourLeft: ${resizerFourLeft}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  --ChatDebugViewTimelineHeight: ${timelineHeight}px;
  --ChatDebugViewTimelineCursorGuideLeft: ${timelineHoverPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionEndLeft: ${selectionEndPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionStartLeft: ${selectionStartPercent ?? 0}%;
  --ChatDebugViewTopSize: ${topSize}px;
  --ChatDebugViewTypeColumnWidth: ${TableColumn.getTableColumnWidth(tableColumns, TableColumn.Type)}px;
  padding: ${viewPadding}px;
  padding-right: 0;
}

.ChatDebugViewTop .IconButton {
  align-self: center;



}









  .ExternalLink{
  color: #52bdf2;
}





/* TODO improve this with virtual scrolling */

.ChatDebugView .EditorLayers {
  contain: unset;
  height: auto;
}

.ChatDebugView .Gutter {
  contain: unset;
  height: auto;
}

.ChatDebugView .EditorContent {
  contain: unset;
  height: auto;
}

.ChatDebugView .EditorRows {
  overflow-y: visible;
  contain: unset;
  height: auto;
}

.ChatDebugView .Editor {
    overflow-y: auto;
}


`
}
