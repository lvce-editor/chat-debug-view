import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter-pills')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const pill0 = pills.nth(0)
  await expect(pill0).toBeVisible()
  await expect(pill0).toContainText('All')
  const pill1 = pills.nth(1)
  await expect(pill1).toBeVisible()
  await expect(pill1).toContainText('Tools')
  const pill2 = pills.nth(2)
  await expect(pill2).toBeVisible()
  await expect(pill2).toContainText('Network')
  const pill3 = pills.nth(3)
  await expect(pill3).toBeVisible()
  await expect(pill3).toContainText('UI')
  const pill4 = pills.nth(4)
  await expect(pill4).toBeVisible()
  await expect(pill4).toContainText('Stream')
}
