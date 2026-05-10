import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills'

export const skip = 1

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
  const pillsNth0 = pills.nth(0)
  await expect(pillsNth0).toBeVisible()
  await expect(pillsNth0).toContainText('All')
  const pillsNth1 = pills.nth(1)
  await expect(pillsNth1).toBeVisible()
  await expect(pillsNth1).toContainText('Tools')
  const pillsNth2 = pills.nth(2)
  await expect(pillsNth2).toBeVisible()
  await expect(pillsNth2).toContainText('Network')
  const pillsNth3 = pills.nth(3)
  await expect(pillsNth3).toBeVisible()
  await expect(pillsNth3).toContainText('UI')
  const pillsNth4 = pills.nth(4)
  await expect(pillsNth4).toBeVisible()
  await expect(pillsNth4).toContainText('Stream')
}
