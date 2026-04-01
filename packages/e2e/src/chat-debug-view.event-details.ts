import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.event-details'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-event-details')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-event-details',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  const row = Locator('.ChatDebugViewEventRow').nth(0)
  await row.click()

  const responseTab = Locator('[role="tab"][value="response"]')
  const timingTab = Locator('[role="tab"][value="timing"]')

  // assert
  await expect(Locator('.ChatDebugViewEventRowSelected')).toHaveCount(1)
  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(Locator('.ChatDebugViewDetailsTitle')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewDetailsTop [role="tablist"]')).toBeVisible()
  await expect(responseTab).toHaveAttribute('aria-selected', 'true')
  await expect(timingTab).toHaveAttribute('aria-selected', 'false')
  await expect(Locator('.ChatDebugViewEvent')).toContainText('"path": "/chat"')

  // act
  await timingTab.click()

  // assert
  await expect(timingTab).toHaveAttribute('aria-selected', 'true')
  await expect(responseTab).toHaveAttribute('aria-selected', 'false')
  await expect(Locator('.ChatDebugViewTiming')).toBeVisible()
  await expect(Locator('.ChatDebugViewTiming')).toContainText('Duration')
  await expect(Locator('.ChatDebugViewTiming')).toContainText('250ms')
  await expect(Locator('.ChatDebugViewEvent')).toHaveCount(0)

  // act
  await responseTab.click()

  // assert
  await expect(responseTab).toHaveAttribute('aria-selected', 'true')
  await expect(Locator('.ChatDebugViewEvent')).toContainText('"path": "/chat"')
  await expect(Locator('.ChatDebugViewTiming')).toHaveCount(0)
}
