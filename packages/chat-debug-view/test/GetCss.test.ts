import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { getTimelineInfo } from '../src/parts/GetTimelineInfo/GetTimelineInfo.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should wrap preview message lines', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewDetailsBottom')
  expect(css).toContain('overflow: auto;')
  expect(css).toContain('.ChatDebugViewEventLineContent')
  expect(css).toContain('white-space: pre-wrap;')
  expect(css).toContain('overflow-wrap: anywhere;')
})

test('getCss should align the refresh button with the top row and use toolbar styling', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewTop')
  expect(css).toContain('display: flex;')
  expect(css).toContain('.ChatDebugViewRefreshButton')
  expect(css).toContain('margin-left: auto;')
  expect(css).toContain('background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));')
})

test('getCss should size the top row from a css variable based on width breakpoints', () => {
  const largeCss = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })
  const mediumCss = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 720,
  })
  const smallCss = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 480,
  })

  expect(largeCss).toContain('--ChatDebugViewTopSize: 30px;')
  expect(mediumCss).toContain('--ChatDebugViewTopSize: 60px;')
  expect(smallCss).toContain('--ChatDebugViewTopSize: 60px;')
  expect(largeCss).toContain('.ChatDebugViewTop')
  expect(largeCss).toContain('contain: strict;')
  expect(largeCss).toContain('height: var(--ChatDebugViewTopSize);')
})

test('getCss should keep the devtools filter input wider next to quick filters', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewFilterInput--devtools')
  expect(css).toContain('flex: 1 1 220px;')
  expect(css).toContain('min-width: 180px;')
})

test('getCss should lay out devtools timeline and split without a wrapper element', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugView--devtools > .ChatDebugViewTimeline')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit')
  expect(css).toContain('.ChatDebugViewDevtoolsSplit > .ChatDebugViewDetails')
  expect(css).not.toContain('.ChatDebugViewDevtoolsMain')
})

test('getCss should expose table column width and resizer position variables', () => {
  const css = getCss({
    ...createDefaultState(),
    tableColumnWidths: {
      duration: 96,
      status: 124,
      type: 240,
    },
    tableWidth: 460,
    visibleTableColumns: ['type', 'duration', 'status'],
    width: 960,
  })

  expect(css).toContain('--ChatDebugViewTypeColumnWidth: 240px;')
  expect(css).toContain('--ChatDebugViewDurationColumnWidth: 96px;')
  expect(css).toContain('--ResizerOneLeft: 240px;')
  expect(css).toContain('--ResizerTwoLeft: 364px;')
  expect(css).toContain('--ChatDebugViewTableColZeroWidth: 240px;')
  expect(css).toContain('--ChatDebugViewTableColOneWidth: 124px;')
  expect(css).toContain('--ChatDebugViewTableColTwoWidth: 580px;')
  expect(css).toContain('.Resizers')
  expect(css).toContain('.ResizerOne')
  expect(css).toContain('.ResizerTwo')
  expect(css).toContain('.TableColZero')
  expect(css).toContain('width: var(--ChatDebugViewTableColZeroWidth);')
  expect(css).toContain('.TableColOne')
  expect(css).toContain('width: var(--ChatDebugViewTableColOneWidth);')
  expect(css).toContain('.TableColTwo')
  expect(css).toContain('width: var(--ChatDebugViewTableColTwoWidth);')
})

test('getCss should assign widths to visible col elements instead of individual cells', () => {
  const css = getCss({
    ...createDefaultState(),
    tableColumnWidths: {
      duration: 120,
      status: 110,
      type: 180,
    },
    tableWidth: 520,
    visibleTableColumns: ['type', 'status'],
    width: 960,
  })

  expect(css).toContain('.TableColZero')
  expect(css).toContain('--ChatDebugViewTableColZeroWidth: 180px;')
  expect(css).toContain('width: var(--ChatDebugViewTableColZeroWidth);')
  expect(css).toContain('.TableColOne')
  expect(css).toContain('--ChatDebugViewTableColOneWidth: 764px;')
  expect(css).toContain('width: var(--ChatDebugViewTableColOneWidth);')
  expect(css).not.toContain('.ChatDebugViewHeaderCellType.ChatDebugViewColumnFixed')
  expect(css).not.toContain('.ChatDebugViewCellType.ChatDebugViewColumnFixed')
  expect(css).not.toContain('.ChatDebugViewHeaderCellDuration.ChatDebugViewColumnFixed')
  expect(css).not.toContain('.ChatDebugViewCellDuration.ChatDebugViewColumnFixed')
})

test('getCss should keep devtools table rows at a fixed height instead of stretching the table', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('--ChatDebugViewTableRowHeight: 24px;')
  expect(css).toContain('.Table {')
  expect(css).not.toContain('.Table {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n  flex: 1;')
  expect(css).toContain('.TableRow {')
  expect(css).toContain('height: var(--ChatDebugViewTableRowHeight);')
  expect(css).toContain('.TableBody .TableCell {')
  expect(css).toContain('line-height: var(--ChatDebugViewTableRowHeight);')
})

test('getCss should size the table wrapper to the full main width when details are not visible', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('--ChatDebugViewDetailsWidth: 0px;')
  expect(css).toContain('--ChatDebugViewTableWidth: 944px;')
})

test('getCss should scale image previews to the available details pane size', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewImagePreview')
  expect(css).toContain('width: 100%;')
  expect(css).toContain('min-height: 0;')
  expect(css).toContain('.ChatDebugViewImagePreviewImage')
  expect(css).toContain('max-height: 100%;')
  expect(css).toContain('width: auto;')
})

test('getCss should style timeline selection handles like draggable resize grips', () => {
  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    width: 960,
  })

  expect(css).toContain('.ChatDebugViewTimelineSelectionHandle')
  expect(css).toContain('cursor: ew-resize;')
  expect(css).toContain('.ChatDebugViewTimelineSelectionHandle::before')
  expect(css).toContain('.ChatDebugViewTimelineSelectionHandle::after')
})

test('getCss should render timeline cursor guide positions via dedicated classes', () => {
  const state = {
    ...createDefaultState(),
    tableWidth: 420,
    timelineHoverPercent: 37.5,
    width: 960,
  } as ReturnType<typeof createDefaultState> & {
    readonly timelineHoverPercent: number | null
  }
  const css = getCss(state)

  expect(css).toContain('.ChatDebugViewTimelineCursorGuide {')
  expect(css).toContain('pointer-events: none;')
  expect(css).toContain('.ChatDebugViewTimelineCursorGuideVisible {')
  expect(css).toContain('--ChatDebugViewTimelineCursorGuideLeft: 37.5%;')
  expect(css).toContain('left: var(--ChatDebugViewTimelineCursorGuideLeft);')
})

test('getCss should render timeline selection handle positions via dedicated classes', () => {
  const events = [
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      sessionId: 'session-1',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  const css = getCss({
    ...createDefaultState(),
    tableWidth: 420,
    timelineInfo: getTimelineInfo(events, '2', '8'),
    width: 960,
  })

  expect(css).toContain('--ChatDebugViewTimelineSelectionStartLeft: 20%;')
  expect(css).toContain('--ChatDebugViewTimelineSelectionEndLeft: 80%;')
  expect(css).toContain('.ChatDebugViewTimelineSelectionHandleStart,')
  expect(css).toContain('.ChatDebugViewTimelineSelectionHandleEnd,')
  expect(css).toContain('left: var(--ChatDebugViewTimelineSelectionStartLeft);')
  expect(css).toContain('left: var(--ChatDebugViewTimelineSelectionEndLeft);')
})
