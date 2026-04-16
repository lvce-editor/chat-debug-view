import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getCss should expose the timeline height variable and strict containment', () => {
  const css = getCss(createDefaultState())

  expect(css).toContain('--ChatDebugViewTimelineHeight: 81px;')
  expect(css).toContain('.ChatDebugViewTimeline {\n  contain: strict;')
  expect(css).toContain('height: var(--ChatDebugViewTimelineHeight);')
})
