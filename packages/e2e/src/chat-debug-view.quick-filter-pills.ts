import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter-pills')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-quick-filter-pills',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const pills = Locator('.ChatDebugViewQuickFilterPill')
  await expect(pills).toHaveCount(5)
  await expect(pills.nth(0)).toBeVisible()
  await expect(pills.nth(0)).toContainText('All')
  await expect(pills.nth(1)).toBeVisible()
  await expect(pills.nth(1)).toContainText('Tools')
  await expect(pills.nth(2)).toBeVisible()
  await expect(pills.nth(2)).toContainText('Network')
  await expect(pills.nth(3)).toBeVisible()
  await expect(pills.nth(3)).toContainText('UI')
  await expect(pills.nth(4)).toBeVisible()
  await expect(pills.nth(4)).toContainText('Stream')
}
