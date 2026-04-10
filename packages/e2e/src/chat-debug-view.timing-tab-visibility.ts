import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timing-tab-visibility'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-timing-tab-visibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-timing-tab-visibility',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      message: 'hello',
      sessionId: 'e2e-session-timing-tab-visibility',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'chat-message-added',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const timingTab = Locator('#ChatDebugViewDetailsTab-timing')

  // assert
  await expect(timingTab).toHaveCount(1)
  await expect(Locator('.ChatDebugViewEvent')).toContainText('"path": "/chat"')

  // act
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'timing', false)

  // assert
  await expect(Locator('.ChatDebugViewTiming')).toBeVisible()
  await expect(Locator('.ChatDebugViewTiming')).toContainText('Duration')

  // act
  await ChatDebug.selectEventRow(1)

  // assert
  await expect(Locator('#ChatDebugViewDetailsTab-timing')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewTiming')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEvent')).toContainText('"type": "chat-message-added"')
}
