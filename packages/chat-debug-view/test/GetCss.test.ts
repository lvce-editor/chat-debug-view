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

  expect(css).toContain('.ChatDebugViewEvent')
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
  expect(css).toContain('background: var(--vscode-toolbar-hoverBackground, rgba(255, 255, 255, 0.06));')
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
  expect(css).toContain('--ChatDebugViewResizerOneLeft: 240px;')
  expect(css).toContain('--ChatDebugViewResizerTwoLeft: 336px;')
  expect(css).toContain('.ChatDebugViewResizers')
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
  expect(css).toContain('left: 37.5%;')
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

  expect(css).toContain('.ChatDebugViewTimelineSelectionHandleStart {')
  expect(css).toContain('left: 20%;')
  expect(css).toContain('.ChatDebugViewTimelineSelectionHandleEnd {')
  expect(css).toContain('left: 80%;')
})
