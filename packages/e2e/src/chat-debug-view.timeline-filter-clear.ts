import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter-clear'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-timeline-clear')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-clear',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-clear',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // act
  await Command.execute('ChatDebug.handleInput', 'timelineRangePreset', '0:0.833', false)
  await expect(Locator('.ChatDebugViewEventRow')).toHaveCount(1)
  await Command.execute('ChatDebug.handleInput', 'timelineRangePreset', '', false)

  // assert
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEventRow')).toHaveCount(2)
}
