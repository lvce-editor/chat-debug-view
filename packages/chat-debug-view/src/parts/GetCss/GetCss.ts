// cspell:ignore liga calt

import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getDetailsWidth, getMainWidth, sashWidth, viewPadding } from '../SplitLayout/SplitLayout.ts'
import * as TableColumn from '../TableColumn/TableColumn.ts'
import { getTableColumnLayout } from '../TableColumnLayout/TableColumnLayout.ts'
import { devtoolsTableHeaderHeight, devtoolsTableRowHeight } from '../TableMetrics/TableMetrics.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const { largeBreakpoint, mediumBreakpoint, selectedEvent, tableColumns, tableColumnWidths, tableWidth, timelineHoverPercent, timelineInfo, width } =
    state
  const hasSelectedEvent = !!selectedEvent
  const computedTableWidth = hasSelectedEvent ? clampTableWidth(width, tableWidth) : getMainWidth(width)
  const detailsWidth = hasSelectedEvent ? getDetailsWidth(width, tableWidth) : 0
  const topSize = width >= largeBreakpoint ? 30 : width >= mediumBreakpoint ? 60 : 60
  const tableColumnLayout = getTableColumnLayout(computedTableWidth, TableColumn.getVisibleTableColumns(tableColumns), tableColumnWidths)
  const [tableColZeroWidth = 0, tableColOneWidth = 0, tableColTwoWidth = 0] = tableColumnLayout.visibleColumnWidths
  const resizerOneLeft = tableColumnLayout.resizerLefts[0] ?? 0
  const resizerTwoLeft = tableColumnLayout.resizerLefts[1] ?? 0
  const { selectionEndPercent, selectionStartPercent } = timelineInfo
  return `
.ChatDebugView {
  --ChatDebugViewTableHeaderHeight: ${devtoolsTableHeaderHeight}px;
  --ChatDebugViewTableColZeroWidth: ${tableColZeroWidth}px;
  --ChatDebugViewTableColOneWidth: ${tableColOneWidth}px;
  --ChatDebugViewTableColTwoWidth: ${tableColTwoWidth}px;
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewDurationColumnWidth: ${tableColumnWidths.duration}px;
  --ChatDebugViewTableRowHeight: ${devtoolsTableRowHeight}px;
  --ResizerOneLeft: ${resizerOneLeft}px;
  --ResizerTwoLeft: ${resizerTwoLeft}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${computedTableWidth}px;
  --ChatDebugViewTimelineCursorGuideLeft: ${timelineHoverPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionEndLeft: ${selectionEndPercent ?? 0}%;
  --ChatDebugViewTimelineSelectionStartLeft: ${selectionStartPercent ?? 0}%;
  --ChatDebugViewTopSize: ${topSize}px;
  --ChatDebugViewTypeColumnWidth: ${tableColumnWidths.type}px;
  padding: ${viewPadding}px;
}

`
}
