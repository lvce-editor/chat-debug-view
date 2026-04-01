import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-filter'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-timeline-filter')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-filter',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-filter',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('.ChatDebugViewToggleUseDevtoolsLayout').click()

  // assert timeline visible before filtering
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(Locator('.ChatDebugViewTimeline')).toBeVisible()
  await expect(rows).toHaveCount(2)

  // act + assert narrowed timeline range
  await Locator('.ChatDebugViewTimelineBucket').nth(0).click()
  await expect(Locator('.ChatDebugViewTimelineBucketSelected')).toHaveCount(1)
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
}
