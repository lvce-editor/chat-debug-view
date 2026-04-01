import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-events'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-quick-filter')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-quick-filter',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-quick-filter',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'handle-click',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('.ChatDebugViewToggleUseDevtoolsLayout').click()
  await Locator('.ChatDebugViewQuickFilterPill').nth(2).click()

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  const selectedPill = Locator('.ChatDebugViewQuickFilterPillSelected')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
  await expect(selectedPill).toContainText('Network')
}
