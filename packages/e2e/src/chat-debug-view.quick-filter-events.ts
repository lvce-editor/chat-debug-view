import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-events'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter')
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
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEventCategoryFilter('network')

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  const selectedPill = Locator('.ChatDebugViewQuickFilterPillSelected')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
  await expect(selectedPill).toContainText('Network')
}
