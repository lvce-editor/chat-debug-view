import { expect, test } from '@jest/globals'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { setSelectedEventPreview } from '../src/parts/SelectedEventPreview/SelectedEventPreview.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should expose the timeline height variable and strict containment', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('--ChatDebugViewTimelineHeight: 81px;')
  expect(css).toContain('.ChatDebugViewTimeline {\n  contain: strict;')
  expect(css).toContain('height: var(--ChatDebugViewTimelineHeight);')
})

test('getCss should expose the details line number width variable and apply it to the details gutter', () => {
  const selectedEvent = {
    eventId: 1,
    name: 'read_file',
    result: Array.from({ length: 100 }, (_, index) => `line ${index + 1}`).join('\n'),
    type: 'tool-execution',
  }
  const css = getCss({
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Preview, selectedEvent),
    selectedEvent,
  })

  expect(css).toContain('--ChatDebugViewDetailsLineNumberWidth: 32px;')
  expect(css).toContain('.ChatDebugViewDetailsBottom .Gutter {')
  expect(css).toContain('flex: 0 0 var(--ChatDebugViewDetailsLineNumberWidth);')
  expect(css).toContain('width: var(--ChatDebugViewDetailsLineNumberWidth);')
  expect(css).not.toContain('.ChatDebugViewDetailsBottom .ChatDebugViewEventLineNumber {')
})

test('getCss should expose preview scrollbar variables for virtualized preview text', () => {
  const selectedEvent = setSelectedEventPreview(
    {
      eventId: 1,
      sessionId: 'session-1',
      timestamp: '2026-05-04T10:00:00.000Z',
      type: 'request',
    },
    Array.from({ length: 40 }, (_, index) => `line ${index + 1}`).join('\n'),
  )
  const css = getCss({
    ...createDefaultState(),
    detailTabs: createDetailTabs(InputName.Preview, selectedEvent),
    height: 600,
    previewTextDeltaY: 48,
    selectedEvent,
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  })

  expect(css).toContain('--ChatDebugViewPreviewScrollBarHeight:')
  expect(css).toContain('--ChatDebugViewPreviewScrollBarOffset:')
  expect(css).toContain('--ChatDebugViewPreviewScrollBarWidth: 12px;')
  expect(css).toContain('--ChatDebugViewPreviewViewportHeight: 416px;')
  expect(css).toContain('.PreviewTextScrollBar {')
  expect(css).toContain('.PreviewVirtualizedEditor {')
})

test('getCss should style the ai-request headers table inside the details panel', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('.ChatDebugViewHeadersTable {')
  expect(css).toContain('.ChatDebugViewHeadersCell {')
  expect(css).toContain('.ChatDebugViewHeadersHead .ChatDebugViewHeadersCell {')
})

test('getCss should style the table column resizers and expose their offsets', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('--ResizerOneLeft:')
  expect(css).toContain('--ResizerTwoLeft:')
  expect(css).toContain('--ResizerThreeLeft:')
  expect(css).toContain('.Resizers {')
  expect(css).toContain('.Resizer {')
  expect(css).toContain('.ResizerInner {')
  expect(css).toContain('.ResizerOne {\n  left: var(--ResizerOneLeft);')
  expect(css).toContain('.ResizerTwo {\n  left: var(--ResizerTwoLeft);')
  expect(css).toContain('.ResizerThree {\n  left: var(--ResizerThreeLeft);')
})
