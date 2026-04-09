import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-section-tag'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timeline-section-tag')

  const events = [
    {
      sessionId: 'e2e-session-timeline-section-tag',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-section-tag',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const timeline = Locator('.ChatDebugViewTimeline')

  // assert
  await expect(timeline).toBeVisible()
  await expect(timeline).toHaveJSProperty('tagName', 'SECTION')
}
