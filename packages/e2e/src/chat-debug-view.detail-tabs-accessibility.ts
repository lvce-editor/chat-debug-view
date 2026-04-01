import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.detail-tabs-accessibility'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-detail-tabs-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-detail-tabs-accessibility',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)
  await Locator('.ChatDebugViewEventRow').nth(0).click()

  const tablist = Locator('[role="tablist"]')
  const tabs = Locator('[role="tab"]')
  const responseTab = Locator('[role="tab"][value="response"]')
  const timingTab = Locator('[role="tab"][value="timing"]')
  const panel = Locator('[role="tabpanel"]')

  // assert
  await expect(tablist).toBeVisible()
  await expect(tablist).toHaveAttribute('aria-label', 'Detail sections')
  await expect(tabs).toHaveCount(2)
  await expect(responseTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-response')
  await expect(responseTab).toHaveAttribute('aria-selected', 'true')
  await expect(timingTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-timing')
  await expect(timingTab).toHaveAttribute('aria-selected', 'false')
  await expect(panel).toHaveAttribute('aria-labelledby', 'ChatDebugViewDetailsTab-response')
}
