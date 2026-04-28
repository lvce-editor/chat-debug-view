import { expect, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
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
    detailTabs: DetailTab.createDetailTabs(InputName.Preview, selectedEvent),
    selectedEvent,
  })

  expect(css).toContain('--ChatDebugViewDetailsLineNumberWidth: 27px;')
  expect(css).toContain('.ChatDebugViewDetailsBottom .Gutter {')
  expect(css).toContain('width: var(--ChatDebugViewDetailsLineNumberWidth);')
  expect(css).toContain('.ChatDebugViewDetailsBottom .ChatDebugViewEventLineNumber {')
})
